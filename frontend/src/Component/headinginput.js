import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <>
        <form className={classes.headingframe}>
          <input onChange={(e) => this.props.handleHeading(e.currentTarget.value)}
            type="text"
            placeholder="Untitled Flashcard"
            className={classes.title}
          />
        {
          this.props.card ? null : <input
            type="text"
            placeholder="Insert a description"
            className={classes.description}
          />
        }

        </form>
      </>
    )
  }
}


export const HeadingInput = connect(null, null)(PureHeadingInput)