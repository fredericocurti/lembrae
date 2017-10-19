import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import store from './helpers/store';

let data = [];

class WordCloud extends Component {

    constructor(props){
        super(props)
        //this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.state = {
            ...this.props.info,
            drawer : null,
            show : false
        }
    }

    componentWillMount() {
    }



    componentDidMount() {
      console.log("Requesting words");
      console.log(store.getStore());
      console.log(store.getStore().notes);
      console.log(Object.keys(store.getStore().notes));
      let noteList = store.getStore().notes;

      console.log(noteList);
      Object.keys(noteList).map( note => {
          console.log(note);
          console.log ("It worked");
        }


      )

      for(var [key, value] of Object.entries(noteList)){
        //data.push({title : noteList[i].title, value : noteList[i].content})
        console.log("EETA");
      }
      console.log(data);
      console.log(store.getStore()["10"]);
      //for (var i)

    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default WordCloud;
