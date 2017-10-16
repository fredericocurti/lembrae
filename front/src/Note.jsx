import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentEditable from "react-contenteditable";
import TextField from 'material-ui/TextField'
import auth from './helpers/auth.js'
import _ from 'lodash'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment'

const debounce = require('lodash/debounce');
const omit = require('lodash/omit')

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.info,
            open: false,
            showComments: false,
            anchorEl: null
        }

        this.exists = true
        this.delayedUpdate = debounce(this.update, 3000)
        this.typedCommentary = '';
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.info)
    }

    handleOptionsOpen = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleOptionsClose = () => {
        this.setState({ open: false })
    }


    handleChange = (e) => {
        e.preventDefault()
        if (this.state[e.currentTarget.id] != e.target.value) {
            this.setState({ [e.currentTarget.id]: e.target.value });
            this.delayedUpdate()
        }
    }

    handleLockPress = () => {
        this.setState({ isPrivate: !this.state.isPrivate })
        this.delayedUpdate()
    }

    handleConclusion = () => {
        this.setState({ isConcluded: !this.state.isConcluded })
        this.delayedUpdate()
    }

    handleShowComments = () => {
        this.setState({ showComments: !this.state.showComments })
    }

    handleCommentaryChange = (event) => {
        this.setState({ 
            commentary : event.target.value,
            errorText : this.state.commentary.length > 40 ? "Você atingiu o tamanho máximo para o título" : null 
        })
    }

    update = () => {
        if (this.exists) {
            let updatedState = omit(this.state,['open','anchorEl'])
            this.props.update(updatedState)
        }
    }

    handleRemove = () => {
        this.exists = false
        this.props.remove(this.props.info.id)
    }

    render() {
        const popOver = () => {
            return (
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleOptionsClose}
                >
                    <Menu>
                        <MenuItem
                            leftIcon={<FontIcon className="material-icons" > delete_forever </FontIcon>}
                            primaryText="Remover nota"
                            onClick={this.handleRemove} />

                        <MenuItem
                            onClick={this.handleLockPress}
                            leftIcon={
                                <FontIcon className="material-icons" >
                                    {this.state.isPrivate ? 'lock' : 'lock_open'}
                                </FontIcon>
                            }
                            primaryText={this.state.isPrivate ? "Tornar pública" : "Tornar privada"}
                        />

                        <MenuItem
                            leftIcon={<FontIcon className="material-icons" > check </FontIcon>}
                            primaryText={this.state.isConcluded ? "Resumir Nota" : "Concluir Nota"}
                            onClick={this.handleConclusion} />
                        
                        <MenuItem
                            leftIcon={<FontIcon className="material-icons" > commentary </FontIcon>}
                            primaryText={this.state.showComments ? "Esconder Comentários" : "Mostrar Comentários"}
                            onClick={this.handleShowComments} />

                    </Menu>
                </Popover>
            )
        }

        if (this.state.isConcluded === true) {
            var checked = <FontIcon className="material-icons" color="green" > check </FontIcon>;
        } else {
            var checked = '';
        }

        return (
            <div className='grid-item col s6 m4 l3'>
                <div className='card multiline'
                    style={{ backgroundColor: this.state.color, padding: 10 }}
                >
                    <div className='card-content'>
                        <div className="card-title">
                            {checked}
                            <ContentEditable
                                id="title"
                                html={this.state.title}
                                disabled={auth.getUser().id === this.state.userId ? false : true}
                                onChange={this.handleChange}
                                style={{ wordWrap: 'break-word' }}
                            />
                            {auth.getUser().id === this.state.userId
                                ?
                                <IconButton onClick={this.handleOptionsOpen}>
                                    <FontIcon className="material-icons" > more_vert </FontIcon>
                                </IconButton>
                                : null
                            }
                            {popOver()}
                        </div>

                        <ContentEditable
                            id="content"
                            html={this.state.content}
                            disabled={ auth.getUser().id === this.state.userId ? false : true }
                            onChange={this.handleChange}
                            className='note-content'
                        />

                        <div className='divider' />
                        <div className='card-footer'>
                            {moment(this.state.updatedAt).isSame(moment(this.state.createdAt))
                                ? <span> Criado por <b>{this.state.ownerUsername} </b> {moment(this.state.createdAt).fromNow()} </span>
                                : <span> Atualizado por <b>{this.state.ownerUsername}</b> {moment(this.state.updatedAt).fromNow()} </span>
                            }
                            <div style={{ textAlign: 'right' }}>
                            </div>
                        </div>
                        {this.state.showComments ? <div className='divider' /> : null }
                        {this.state.showComments ?
                        <List>
                            <ListItem
                                primaryText={this.state.ownerUsername}
                                secondaryText={this.state.commentary}
                                disabled='true'
                            />
                            <TextField
                                multiline
                                id="text-field-controlled"
                                value={this.state.commentary}
                                onChange={this.handleCommentaryChange}
                                className='note-input-commentary' //fazer no css
                                hintText='Insira um comentário...'
                                underlineStyle={{width:70+'%',color:'#808080'}}
                                underlineFocusStyle={{width:70+'%',borderColor:'#808080'}}
                            />
                            <IconButton style={{position: "absolute", bottom: 0, right: 0}} onClick={this.handleCommentarySubmit}>
                                <FontIcon className="material-icons" >add</FontIcon>
                            </IconButton>
                        </List> : null }

                    </div>
                </div>
            </div>
        );
    }
}

export default Note;