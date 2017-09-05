import React, { Component } from 'react';
import ContentEditable from "react-contenteditable";
import auth from './helpers/auth.js'
import _ from 'lodash'
import store from './helpers/store.js'
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
            open : false,
            anchorEl : null
        }

        this.show = true
        this.delayedUpdate = debounce(this.update,2000)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.info)
    }
    

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
    handleRequestClose = () => {
    this.setState({
        open: false,
        })
    };


    handleChange = (e) => {
        e.preventDefault()
        if ( this.state[e.currentTarget.id] != e.target.value ){
            this.setState({[e.currentTarget.id]: e.target.value});
            this.delayedUpdate()
        }
        
    }

    handleLockPress = () => {
        this.setState({ isPrivate : !this.state.isPrivate })
        this.delayedUpdate()
    }

    update = () => {
        let newState = omit(this.state,['open','anchorEl'])
        this.props.update(newState)
    }

    render() {
        const popOver = () => {
            return (
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem 
                            leftIcon={<FontIcon className="material-icons" > delete_forever </FontIcon>} 
                            primaryText="Remover nota" 
                            onClick={() => { this.props.remove(this.props.info.id) } }/>
                            
                        <MenuItem 
                            onClick={this.handleLockPress}
                            leftIcon={
                                <FontIcon className="material-icons" > 
                                    {this.state.isPrivate ? 'lock' : 'lock_open'} 
                                </FontIcon>
                            }
                            primaryText={this.state.isPrivate ? "Tornar pública" : "Tornar privada"}
                            left
                            />

                    </Menu>
                </Popover>
            )
        }


        return (
            <div className='grid-item col s6 m4 l3'>
                <div className='card multiline'
                    style={{ backgroundColor: this.state.color, padding: 10}}
                >
                    <div className='card-content'>
                        <span className="card-title"> 
                            <ContentEditable
                                id="title"
                                html={this.state.title}
                                disabled={ auth.getUser().id === this.state.userId ? false : true }
                                onChange={this.handleChange}
                                style={{wordWrap: 'break-word'}}
                            />
                            { auth.getUser().id === this.state.userId 
                            ? 
                            <IconButton onClick={this.handleTouchTap}>
                                <FontIcon className="material-icons" > more_vert </FontIcon>
                            </IconButton>
                            : null 
                            } 
                            { popOver() }
                        </span>
                        <ContentEditable
                            id="content"
                            html={this.state.content}
                            disabled={ auth.getUser().id === this.state.userId ? false : true }
                            onChange={this.handleChange}
                            className='note-content'
                        />
                        <div className='divider'/>
                        <div className='card-footer'>
                            { moment(this.state.updatedAt).isSame(moment(this.state.createdAt)) 
                            ? <span> Criado por <b>{ this.state.ownerUsername } </b> { moment(this.state.createdAt).fromNow() } </span>
                            : <span> Atualizado por <b>{ this.state.ownerUsername }</b> { moment(this.state.updatedAt).fromNow() } </span>
                            }
                            <div style={{textAlign : 'right'}}> 
                            </div>
                        </div>
                    </div>                
            </div>
        </div>
        );
    }
}

export default Note;