import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/getdata/action'
import { Form } from 'react-bootstrap'

import classes from './transcript.module.css'

class PureTranscript extends React.Component {
    render(){
        return (
        <div className="col">
        <div className={classes.transcriptframe}>
            <h5> Transcript </h5>
        <form>
        <textarea
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

const mapStateToProps = (state) => {
    console.log("state in dashboard",state);

    return {
        dataMSP: state.dataStore.data
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const Transcript = connect (mapStateToProps, mapDispatchToProps)(PureTranscript)