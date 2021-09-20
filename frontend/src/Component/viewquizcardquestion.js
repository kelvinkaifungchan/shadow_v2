import React from 'react';
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import classes from './viewquizcardpage.module.css'

class PureViewQuizcardQuestionModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'mc',
        }
    }


    mcToggle() {
        console.log('mc')
        this.setState({
            type: "mc"
        })
    }
    tfToggle() {
        console.log('tf')
        this.setState({
            type: "tf"
        })
    }

    onClickShowQuestionViewer(id) {
        this.setState({
            showQuestionViewer: true,
            questionNumId: id,

        })
        console.log("this.state.questionNumId", this.state.questionNumId);
    }

    render() {
        console.log(this.props.question.question, "PROPS IN VQQ");
        return (
            <>

                <div className={classes.scrollicon}>
                    {this.props.question.question &&
                        this.props.question.question.length > 0 ?
                        this.props.question.question.map(

                            (question, i) => {

                                return (
                                    <span onClick={() => this.onClickShowQuestionViewer(i)}>{i + 1}</span>
                                )
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
                                            <p>Question {this.state.questionNumId + 1}</p>
                                        </div>

                                    </div>


                                    {this.props.question.question &&
                                        this.props.question.question.length > 0 ?
                                        this.props.question.question.map((question, i) => {

                                            if (question.questionType === "multipleChoice" && i === this.state.questionNumId) {
                                                console.log("question inside the map", question)

                                                return (
                                                    <div>
                                                        <div className="row">
                                                            <input readOnly style={{ width: "100%", margin: "20px" }} value={question.questionBody} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="A">A</Label>
                                                                    <Input readOnly type="text" name="A" id="A" value={question.multipleChoiceA} />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="B">B</Label>
                                                                    <Input readOnly type="text" name="B" id="B" value={question.multipleChoiceB} />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="C">C</Label>
                                                                    <Input readOnly type="text" name="C" id="C" value={question.multipleChoiceC} />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col col-6">
                                                                <FormGroup>
                                                                    <Label for="D">D</Label>
                                                                    <Input readOnly type="text" name="D" id="D" value={question.multipleChoiceD} />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (question.questionType === "trueFalse" && i === this.state.questionNumId) {

                                                return (
                                                    <div>
                                                        <p>Select the correct answer:</p>
                                                        <div className="row">
                                                            <Button color="primary"> True </Button>
                                                        </div>
                                                        <div className="row">
                                                            <Button color="primary"> False </Button>
                                                        </div>
                                                    </div>
                                                )

                                            }
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
