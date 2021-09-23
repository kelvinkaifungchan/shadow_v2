import React from "react";
import { connect } from 'react-redux' 

import { AudioRecorder } from '../Component/audiorecorder';
import classes from './displayentries.module.css'

class PureDisplayEntries extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
    this.createEntries = this.createEntries.bind(this);
  }
  createEntries(item) {
    // i deleted this from the li element --> onClick={() => this.delete(item.key)}
    return <li  key={item.key}>{item.text} <AudioRecorder yek={item.key} handleRecording={(fileName) => this.props.handleRecording(item.key, fileName)}/></li>
  }
 
  delete(key) {
    this.props.delete(key);
  }

  render() {
    var displayEntries = this.props.entries;
    var listItems = displayEntries.map(this.createEntries);
 
    return (
      <ol className={classes.theList}>
          {listItems}
      </ol>
    );
  }
};
 
const mapStateToProps = (state) => {

  return {
      cards: state.cardStore.card,
  }
}

export const DisplayEntries = connect(mapStateToProps, null)(PureDisplayEntries)
