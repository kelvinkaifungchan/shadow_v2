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
    return (
      <>
      <li key={item.key}>{item.dictationBody}<AudioRecorder handleRecording={(fileName) => this.props.handleRecording(item.key, fileName)}/><span><i className="fas fa-times" onClick={(e)=>{this.props.delete(e)}}></i></span></li>
      </>
    )
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
