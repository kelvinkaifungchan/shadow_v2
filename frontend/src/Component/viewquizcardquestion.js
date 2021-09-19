import React from 'react';
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import classes from './viewquizcardpage.module.css'

class PureVIewQuizcardQuestionModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'mc'
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

    render() {
        return (
            <>

                <div className={classes.scrollicon}>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <div className={classes.viewquizcardquestion}>

                    {/* List of words & recording */}
                    <div className={classes.listframe}>
                        <div className="row d-flex p-4">


                            <div className="col col-12">
                                <Form>
                                    <div className="row">
                                        <div className="col col-8">
                                            <p>Question 1</p>
                                        </div>
                                        <div className="col col-4">
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    Question type
                            </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem onClick={() => this.mcToggle()}>Multiple Choice</DropdownItem>
                                                    <DropdownItem onClick={() => this.tfToggle()}>True or False</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <textarea style={{ width: "100%", height: "20vh", margin: "1px", resize: "none" }} />
                                    </div>
                                    {this.state.type === "mc" ?
                                        <div>
                                            <div className="row">
                                                <div className="col col-6">
                                                    <FormGroup>
                                                        <Label for="A">A</Label>
                                                        <Input type="text" name="A" id="A" placeholder="input an option here" />
                                                    </FormGroup>
                                                </div>
                                                <div className="col col-6">
                                                    <FormGroup>
                                                        <Label for="B">B</Label>
                                                        <Input type="text" name="B" id="B" placeholder="input an option here" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col col-6">
                                                    <FormGroup>
                                                        <Label for="C">C</Label>
                                                        <Input type="text" name="C" id="C" placeholder="input an option here" />
                                                    </FormGroup>
                                                </div>
                                                <div className="col col-6">
                                                    <FormGroup>
                                                        <Label for="D">D</Label>
                                                        <Input type="text" name="D" id="D" placeholder="input an option here" />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div> :
                                        <div>
                                            <p>Select the correct answer:</p>
                                            <div className="row">
                                                <Button color="primary"> True </Button>
                                            </div>
                                            <div className="row">
                                                <Button color="primary"> False </Button>
                                            </div>
                                        </div>}
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


export const VIewQuizcardQuestionModule = connect(null, null)(PureVIewQuizcardQuestionModule)
