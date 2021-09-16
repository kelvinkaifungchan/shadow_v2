import React from 'react';
import { connect } from 'react-redux'

import classes from './displayflashcardsubmission.module.css'

class PureDisplayFlashcardSubmissionModule extends React.Component {

    // onClickShowSubmissionViewer(id){
    //     this.setState({
    //         showRecorder: false,
    //         showSubmissionViewer: true,
    //         submissionid: id,
    //     })
    // }

    render() {
        return (
            <>
                                        {this.props.submission && 
                                        this.props.submission.length > 0
                                            ? this.props.submission.map(
                                                (submission, j) => {
                                                    return (
                                                    <div onClick={() => {this.props.subId(submission.id)}} data-key={j} className={classes.scrollicon}>
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
