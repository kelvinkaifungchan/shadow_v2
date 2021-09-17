import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardfeedback.module.css'

class PureDisplayFlashcardFeedbackModule extends React.Component {
    

    render() {
        console.log("THE PORPS IS HEREEEEEE", this.props.feedback)

        return (
            <>
                {this.props.feedback &&
                    this.props.feedback.length > 0 ?
                    this.props.feedback.map((feedback, j) => {
                        console.log("feedback",feedback);
                            return (
                                <div key={j} data-key={j} className={classes.scrollfeedbackcard}>
                                    <div>
                                        <td data-key={j}>{feedback.flashcardFeedbackTime}</td>
                                        <td data-key={j}>{feedback.flashcardFeedbackBody}</td>
                                        <td className={classes.commentinguser}><img src={feedback.picture} alt="Avatar"></img></td>
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
    console.log("state in dashboard", state);

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayFlashcardFeedback = connect(mapStateToProps, null)(PureDisplayFlashcardFeedbackModule)
