import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardfeedback.module.css'

class PureDisplayFlashcardFeedbackModule extends React.Component {
    

    render() {
        console.log("THE PORPS IS HEREEEEEE", this.props.feedback[0])

        return (
            <>
                {this.props.feedback[0].feedback &&
                    this.props.feedback[0].feedback.length > 0 ?
                    this.props.feedback[0].feedback.map((fb, j) => {
                            return (
                                <div key={j} data-key={j} className={classes.scrollfeedbackcard}>
                                    <div>
                                        <td >{fb.flashcardFeedbackTime}</td>
                                        <td >{fb.flashcardFeedbackBody}</td>
                                        <td className={classes.commentinguser}><img src={fb.picture} alt="Avatar"></img></td>
                                    </div>
                                </div>
                            )
                    }
                    )
                    : null
                }
            </>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("state in display flashcardfeedback", state);

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayFlashcardFeedback = connect(mapStateToProps, null)(PureDisplayFlashcardFeedbackModule)
