import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'

import classes from './headinginput.module.css'

class PureHeadingInput extends React.Component {
<<<<<<< HEAD
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
=======
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
        {/* {
          this.props.card.type ==="flashcard" ? null : this.props.card === "undefined" || "" ? <input
            type="text"
            placeholder="Insert a description"
            className={classes.description}
          />: null
        } */}
        <input
          type="text" 
          placeholder={this.props.heading.description}
          className={classes.description}
        />
      </form>
            </>
        )
    }
>>>>>>> 918aa782342e89c4784c81df7e6a540770da19ab
}


export const HeadingInput = connect(null, null)(PureHeadingInput)