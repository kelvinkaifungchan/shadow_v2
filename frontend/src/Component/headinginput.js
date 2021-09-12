import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("this is this.state in heading ip", this.state);
    console.log("this is this.state in heading ip", this.props);

    return (
      <>
        <form className={classes.headingframe}>
          <input onChange={(e) => this.props.handleHeading(e.currentTarget.value)}
            type="text"
            placeholder="Untitled Flashcard"
            className={classes.title}
          />
        {
          this.props.card.type ==="flashcard" ? null : this.props.card === "undefined"? <input
            type="text"
            placeholder="Insert a description"
            className={classes.description}
          />: null
        }

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