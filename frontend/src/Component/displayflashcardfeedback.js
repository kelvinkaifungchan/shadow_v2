import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardfeedback.module.css'

class PureDisplayFlashcardFeedbackModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flashcardid: "1",
            flashcard: this.props.cards.flashcard.filter(flashcard => flashcard.id === 1)
        }
    }

    render() {
        console.log("THE PORPS IS HEREEEEEE", this.props)

        return (
            <>
                {this.props.feedback &&
                    this.props.feedback.length > 0 ?
                    this.props.feedback.map((feedback, j) => {
                        console.log("feedback",feedback);
                            return (
                                <div data-key={j} className={classes.scrollfeedbackcard}>
                                    <table>
                                        <th data-key={j}>{feedback.flashcardFeedbackTime}</th>
                                        <td data-key={j}>{feedback.flashcardFeedbackBody}</td>
                                        <td className={classes.commentinguser}><img src={feedback.picture} alt="Avatar"></img></td>
                                    </table>
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
