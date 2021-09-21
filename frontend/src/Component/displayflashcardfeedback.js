import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardfeedback.module.css'

class PureDisplayFlashcardFeedbackModule extends React.Component {
    

    render() {

        return (
            <>
                {this.props.feedback[0].feedback &&
                    this.props.feedback[0].feedback.length > 0 ?
                    this.props.feedback[0].feedback.map((fb, j) => {
                            return (
                                <div key={j} data-key={j} className={classes.scrollfeedbackcard}>
                                    <div>
                                        <table>
                                        <tr className={classes.scrollfeedbackrow}>
                                             <td className={classes.commentinguser}><img src={fb.picture} alt="Avatar"></img></td>

                                            <td className={classes.feedback}>{fb.flashcardFeedbackBody}</td>
                                            
                                            <th className={classes.feedbacktime}>{fb.flashcardFeedbackTime}</th>
                                            
                                            <td className={classes.removingfeedback}><span className={classes.removingfeedbackbtn}><i className="fa fa-trash" aria-hidden="true"></i></span></td>
                                           
                                        </tr>
                                        </table>
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

    return {
        cards: state.cardStore.card,
    }
}

export const DisplayFlashcardFeedback = connect(mapStateToProps, null)(PureDisplayFlashcardFeedbackModule)
