import auth from './auth'
import _ from 'lodash'
import moment from 'moment'
let locale = require('moment/locale/pt-br');

// This file handles data manipulation
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20)

var store = {
    notes : {}
}

export default window.store = {
    getPublicNotes : () => {
        moment.locale('pt-BR')
        const params = { q: 'PUBLIC_NOTES', uid:auth.getUser().id, user:auth.getUser().username };
        const urlParams = new URLSearchParams(Object.entries(params));
        fetch('http://localhost:8080/swogger/notes?' + urlParams, {
            method: 'GET'
            }).then((response) => {
                let data = response.json().then((data) => {
                    data.forEach((note) => {
                        store.notes[note.id] = note
                    })
                emitter.emit('notes_update',store.notes)
                })
            })
    },

    getStore : () => {
        return store
    },

    subscribe : (storeName,callback) => {
        emitter.addListener( `${storeName}_update`, callback )
    },

    unsubscribe : (storeName,callback) => {
        emitter.removeListener( `${storeName}_update`, callback )
    },

    Note : (title,content,color,isPrivate) => {
        return {
            color : color,
            content : content,
            isPrivate : isPrivate,
            userId : auth.getUser().id,
            title : title
        }
    },

    addNote : (note) => {
        fetch('http://localhost:8080/swogger/notes', {
            method: 'POST',
            body : JSON.stringify({
                action : 'ADD_NOTE',
                payload : note
            })
        }).then((response) => {
            var data = response.json().then((newNote) => {
                store.notes[newNote.id] = newNote
                emitter.emit('notes_update',store.notes)
            })
        })
    },

    uploadImage : (image,callback) => {
        // console.log('TRYING TO SEND BLOB:',blob)
        // let content = blob.slice(blob.indexOf(',') + 1,blob.length)
        console.log(image)
        let header = new Headers()
        let fd = new FormData()
        fd.append("image",image)
        header.append("Authorization","Client-ID c617d0edea36c6f")
        fetch('https://api.imgur.com/3/image.json',{
            method : 'POST',
            headers: header,
            body : fd,
            mode : 'cors'
        }).then(response => {
            let res = response.json().then((value) => callback(value))
        })
    },

    updateNote : (note,callback) => {
        console.log(note)
        fetch('http://localhost:8080/swogger/update', {
            method: 'POST',
            body : JSON.stringify({
                action : 'UPDATE_NOTE',
                payload : note
            })
        }).then((response) => {
            var data = response.json().then((status) => {
                store.notes[note.id] = note
                store.notes[note.id].updatedAt = moment().valueOf()
                console.log('Note id:' + note.id + ' updated successfully')
                emitter.emit('notes_update',store.notes)
            })
        })

    },

    removeNote : (noteId) => {
        const params = { q: 'REMOVE_NOTE', note_id : noteId };
        const urlParams = new URLSearchParams(Object.entries(params));
        fetch('http://localhost:8080/swogger/remove?' + urlParams, {
            method: 'GET'
            }).then((response) => {
                let data = response.text().then((status) => {
                    console.log( 'removing note ID:',noteId,status)
                    delete store.notes[noteId]
                    emitter.emit('notes_update',store.notes)
                })
            })
    }

}