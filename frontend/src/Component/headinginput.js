import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/getdata/action'

import { Form } from 'react-bootstrap'
import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
    render(){
        return (
            <>
      <form className={classes.headingframe}>
        <input
          type="text" 
          placeholder="Untitled Flashcard"
          className={classes.title}
          disabled= {this.props.title.read !=null ? true : false}
        />
        <input
          type="text" 
          placeholder="Insert a description"
          className={classes.description}
          disabled= {this.props.title.read !=null ? true : false}
        />
      </form>
            </>
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

export const HeadingInput = connect (mapStateToProps, mapDispatchToProps)(PureHeadingInput)