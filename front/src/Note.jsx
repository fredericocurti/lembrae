import React, { Component } from 'react';
import ContentEditable from "react-contenteditable";
import auth from './helpers/auth.js'
import _ from 'lodash'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment'
import ReactMarkdown from'react-markdown';
import YouTube from 'react-youtube';

const debounce = require('lodash/debounce');
const omit = require('lodash/omit')

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.info,
            open: false,
            anchorEl: null,
            showEditableContent: false,
            youtubeArray: []
        }

        this.exists = true
        this.delayedUpdate = debounce(this.update, 3000)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.info)
    }

    parseYoutubeIds(){
        
        
        let patt = new RegExp('(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})')

        let findId = patt.exec(this.state.content)

        console.log(findId,this.state)

        if(findId != null){
            let newYoutubeArray = this.state.youtubeArray
            newYoutubeArray.push(findId[1])
            this.setState({youtubeArray : newYoutubeArray})
        }
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
            this.setState({lastUser: auth.getUser().username})
            this.delayedUpdate()
            
        }
    }

    handleLockPress = () => {
        this.setState({ isPrivate: !this.state.isPrivate })
        this.delayedUpdate()
    }

    update = () => {
        if (this.exists) {
            this.setState({ showEditableContent: false })
            let updatedState = omit(this.state, ['open', 'anchorEl'])
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

                    </Menu>
                </Popover>
            )
        }
        return (
            <div className='grid-item col s6 m4 l3'>
                <div className='card multiline'
                    style={{ backgroundColor: this.state.color, padding: 10 }}
                >
                    <div className='card-content'>
                        <div className="card-title">
                            <ContentEditable
                                id="title"
                                html={this.state.title}
                                disabled={this.state.isPrivate}
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

                        {this.state.showEditableContent ?
                            <ContentEditable
                                id="content"
                                html={this.state.content}
                                disabled={this.state.isPrivate}
                                onChange={this.handleChange}
                                className='note-content'
                            />
                            :
                            <div onClick={() => this.setState({ showEditableContent: true })}>
                                <ReactMarkdown source={this.state.content} />
                            </div>
                        }
                        {this.state.youtubeArray.map((url) => <YouTube videoId={url} opts={opts}/>)}




                        <div className='divider' />
                        <div className='card-footer'>
                            {moment(this.state.updatedAt).isSame(moment(this.state.createdAt))
                                ? <span> Criado por <b>{this.state.ownerUsername} </b> {moment(this.state.createdAt).fromNow()} </span>
                                : <span> Atualizado por <b>{this.state.lastUser}</b> {moment(this.state.updatedAt).fromNow()} </span>
                            }
                            <div style={{ textAlign: 'right' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;