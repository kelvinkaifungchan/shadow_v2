import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

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
        />
        <input
          type="text" 
          placeholder="Insert a description"
          className={classes.description}
        />
      </form>
            </>
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

export const HeadingInput = connect (null, mapDispatchToProps)(PureHeadingInput)