import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardsubmission.module.css'

class PureDisplayFlashcardSubmissionModule extends React.Component {

    render() {
        return (
            <>
                                        {this.props.location.state.card[0].submission && 
                                        this.props.location.state.card[0].submission.length > 0
                                            ? this.props.location.state.card[0].submission.map(
                                                (submission, j) => {
                                                    return (
                                                    <div onClick={() => {this.onClickShowSubmissionViewer(submission.id)}} data-key={j} className={classes.scrollicon}>
                                                        <img src={submission.picture} alt="Avatar"></img>
                                                    </div>
                                                    )
                                                }
                                            )
                                    : null}
            </>
        )

    }
}


export const DisplayFlashcardSubmissionModule = connect(null, null)(PureDisplayFlashcardSubmissionModule)
