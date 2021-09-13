import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('heading input propssssss', this.props)
    return (
      <>
        <form className={classes.headingframe}>
          <input onChange={(e) => this.props.handleHeading(e.currentTarget.value)}
            type="text"
            placeholder={this.props.heading.title}
            className={classes.title}
          />
        {
          this.props.card ? null : <input
            type="text"
            placeholder={this.props.heading.description}
            className={classes.description}
          />
        }

        </form>
      </>
    )
  }
}


export const HeadingInput = connect(null, null)(PureHeadingInput)