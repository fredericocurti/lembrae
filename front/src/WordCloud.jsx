import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import store from './helpers/store';

let data = [];

class WordCloud extends Component {

    constructor(props){
        super(props)

        this.data = [];
        //this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.state = {
            wordCount: [],
        }
    }

    upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    componentWillMount() {
        store.subscribe('notes',(notes) => {
          //console.log("And now we hope:");
          //console.log(notes);

          var words = [];

          Object.entries(notes).forEach(([k,v]) => {
            // console.log(k,v)
             //console.log("😁");
             v.title.split(" ").forEach((t) =>{
               words.push(this.upperFirstLetter(t));
             })
             v.content.split(" ").forEach((t) =>{
               words.push(this.upperFirstLetter(t));
             })
          })

          //console.log(words);
          this.data = [];
          words.forEach((word) => {
            var exist = false;
            var index =0;
            for(index; index < this.data.length; index++){
              if(this.data[index].value === word){
                exist = true;
                this.data[index].count ++;
                break;
              }

            }
            if(!exist && word != ""){
              this.data.push({value : word, count : 1});
            }
          });

          //console.log("done");
          //console.log(this.data);
           this.setState({ wordCount : this.data})
        })
    }


    componentDidMount() {

    }

    render() {

        const options = {
          luminosity: 'dark',
          hue: 'blue'
        };
        return (
            <div className = "word-cloud">
            <TagCloud minSize={12}
                  maxSize={40}
                  tags={this.state.wordCount.sort((w1,w2) => {
                    return w2.count - w1.count
                  }
                    ).slice(0,26)}
                  style={{textAlign: 'center', width: '400px'}}
                  className="simple-cloud"
                  colorOptions = {options}
                  onClick={() => {console.log("Se alguem fizer a busca, da pra implementar por aki!")}} />
            </div>
        );
    }
}

export default WordCloud;
