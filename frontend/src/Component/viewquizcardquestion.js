import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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

  handleAnswerOptionClick(questionId ,submission){
        this.props.handleSubmission(questionId ,submission)
    }

    render() {
        return (
            <>

                <div className={classes.scrollicon}>
                    {this.props.question.question &&
                        this.props.question.question.length > 0 ?
                        this.props.question.question.map(

                            (question, i) => {
                                if( i === 0){
                                    return (
                                        <span key={i} onClick={() => this.onClickShowQuestionViewer(i)}>{i + 1}</span>
                                    )
                                }else{
                                    return (
                                        <span key={i} onClick={() => {this.onClickShowQuestionViewer(i) ; this.props.addAnswer()} }>{i + 1}</span>
                                    )
                                }
                            }
                        )

                        : null}
                </div>

                <div className={classes.viewquizcardquestion}>

                    {/* List of words & recording */}
                    <div className={classes.listframe}>
                        <div className="row d-flex p-4">


                            <div className="col col-12">
                                <Form>
                                    <div className="row">
                                        <div className="col col-8">
                                            <p>Question {this.state.questionNumId ?this.state.questionNumId + 1 : null}</p>
                                        </div>

                                    </div>


                                    {this.props.question.question &&
                                        this.props.question.question.length > 0 ?
                                        this.props.question.question.map((question, i) => {

                                            if (question.questionType === "multipleChoice" && i === this.state.questionNumId) {

                                                return (
                                                    <div  key={i}>
                                                        
                                                        <div key={i} className="row">
                                                            <input  readOnly style={{ width: "100%", margin: "20px" }} value={question.questionBody} />
                                                        </div>
                                                        <div className="row">
                                                        <div  className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="A">A</Label>
                                                                    <Input onClick={() => this.handleAnswerOptionClick(question.id,"a")} readOnly type="text" name="A" id="A" value={question.multipleChoiceA} />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="B">B</Label>
                                                                    <Input onClick={() => this.handleAnswerOptionClick(question.id,"b")} readOnly type="text" name="B" id="B" value={question.multipleChoiceB} />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="C">C</Label>
                                                                    <Input onClick={() => this.handleAnswerOptionClick(question.id,"c")} readOnly type="text" name="C" id="C" value={question.multipleChoiceC} />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="D">D</Label>
                                                                    <Input onClick={() => this.handleAnswerOptionClick(question.id,"d")} readOnly type="text" name="D" id="D" value={question.multipleChoiceD} />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (question.questionType === "trueFalse" && i === this.state.questionNumId) {

                                                return (
                                                    <div key={i}>
                                                        <p>Select the correct answer:</p>
                                                        <div className="row">
                                                            <Button  onClick={() => this.handleAnswerOptionClick(question.id,"true")} color="primary"> True </Button>
                                                        </div>
                                                        <div className="row">
                                                            <Button  onClick={() => this.handleAnswerOptionClick(question.id,"false")} color="primary"> False </Button>
                                                        </div>
                                                    </div>
                                                )

                                            }
                                            return false
                                        }
                                        )
                                        : null
                                    }



                                </Form>
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
