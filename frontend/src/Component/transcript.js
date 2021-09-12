import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { Form } from 'reactstrap'

import classes from './transcript.module.css'

class PureTranscript extends React.Component {
    render(){
        return (
        <div className="col">
        <div className={classes.transcriptframe}>
            <h5> Transcript </h5>
        <form>
        <textarea onChange={(e)=>this.props.handleTranscript(e.currentTarget.value)}
          placeholder="Insert a transcript here"
          className={classes.transcript}
          name={this.props.title.title}
        />
      </form>
      </div>
      </div>

        )
    }
}


const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const Transcript = connect (null, mapDispatchToProps)(PureTranscript)