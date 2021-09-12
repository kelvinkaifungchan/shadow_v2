import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
  render(){
      console.log('PureHeadingInputPureHeadingInput', this.props)
        return (
            <>
      <form className={classes.headingframe}>
        <input
          type="text" 
          placeholder={this.props.heading.title}
          className={classes.title}
        />
        {
          this.props.card.type ==="flashcard" ? null : this.props.card === "undefined" || "" ? <input
            type="text"
            placeholder="Insert a description"
            className={classes.description}
          />: null
        }
        {/* <input
          type="text" 
          placeholder={this.props.heading.description}
          className={classes.description}
        /> */}
      </form>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
  return {
    getdata: (email) => {
      dispatch(getdataThunk(email))
    }
  }
}

export const HeadingInput = connect(null, mapDispatchToProps)(PureHeadingInput)