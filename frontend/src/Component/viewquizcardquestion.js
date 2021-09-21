import React from 'react';
import { connect } from 'react-redux'
import classes from './viewquizcardpage.module.css'

class PureViewQuizcardQuestionModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'mc',
        }
    }


    onClickShowQuestionViewer(id) {
        this.setState({
            showQuestionViewer: true,
            questionNumId: id,
        })

    }

    handleAnswerOptionClick(questionId, submission) {
        this.props.handleSubmission(questionId, submission)
    }




    render() {
        return (
            <>

                <div className={classes.scrollicon} >
                    <div className="row" >

                        {this.props.question.question &&
                            this.props.question.question.length > 0 ?
                            this.props.question.question.map(

                                (question, i) => {
                                    if (i === 0) {
                                        return (
                                            <span key={i} onClick={() => this.onClickShowQuestionViewer(i)}>{i + 1}</span>
                                        )
                                    } else {
                                        return (
                                            <span key={i} onClick={() => { this.onClickShowQuestionViewer(i); this.props.addAnswer() }}>{i + 1}</span>
                                        )
                                    }
                                }
                            )

                            : null}
                    </div>
                    <div className="col col-4 ">
                        <button className={classes.viewsubmit} cards={this.props.cards} onClick={(e) => { this.props.navigate(e) }}>View Submission</button>
                    </div>
                </div>
                <div className={classes.viewquizcardquestion}>

                    {/* List of words & recording */}
                    <div className={classes.listframe}>
                        <div className="row d-flex ">


                            <div className="col col-12">

                                <div className="row">
                                    <div className="col col-8">
                                        <p>Question {this.state.questionNumId ? this.state.questionNumId + 1 : null}</p>
                                    </div>

                                </div>


                                {this.props.question.question &&
                                    this.props.question.question.length > 0 ?
                                    this.props.question.question.map((question, i) => {

                                        if (question.questionType === "multipleChoice" && i === this.state.questionNumId) {

                                            return (
                                                <div key={i} className={classes.viewquizcardanswer}>

                                                    <div key={i} className="row">
                                                        <div>{question.questionBody}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-6">
                                                            <label for="A">Choice A</label>
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "a")} readOnly type="text" name="A" id="A" >{question.multipleChoiceA}</button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <label for="A">Choice B</label>
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "b")} readOnly type="text" name="B" id="B" >{question.multipleChoiceB}</button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-6">
                                                            <label for="A">Choice C</label>
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "c")} readOnly type="text" name="C" id="C" >{question.multipleChoiceC}</button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <label for="A">Choice D</label>
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "d")} readOnly type="text" name="D" id="D" >{question.multipleChoiceD}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else if (question.questionType === "trueFalse" && i === this.state.questionNumId) {

                                            return (
                                                <div key={i} className={classes.viewquizcardanswer}>
                                                    <div key={i} className="row">
                                                        <div style={{ width: "100%", margin: "20px" }} >{question.questionBody}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-6">
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "true")} color="primary"> True </button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <button onClick={() => this.handleAnswerOptionClick(question.id, "false")} color="primary"> False </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                            }
                                            return false
                                        }
                                    
                                    )
                                    : null
                                }




                            </div>

                            <div className="col col-12">
                            </div>

                        </div>
                    </div>

                </div>

            </>
        )

    }
}




export const ViewQuizcardQuestionModule = connect(null, null)(PureViewQuizcardQuestionModule)
