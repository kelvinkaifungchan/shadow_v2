import React from 'react'
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PureCreateQuiz extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type: 'mc',
            question: "",
            answer: "",
            a: "",
            b: "",
            c: "",
            d: "",
        }
    }
    mcToggle(){
        console.log('mc')
        this.setState({
            type: "mc",
            question: "",
            answer: "",
            a: "",
            b: "",
            c: "",
            d: "",
        })
    }
    tfToggle(){
        console.log('tf')
        this.setState({
            type: "tf",
            question: "",
            answer: "",
            a: "",
            b: "",
            c: "",
            d: "",
        })
    }
    changeOpt(e){
        if(e.target.attributes["id"].value === "a"){
            this.setState({
                a: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "b"){
            this.setState({
                b: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "c"){
            this.setState({
                c: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "d"){
            this.setState({
                d: e.currentTarget.value
            })
        } else if(e.target.attributes["id"].value === "question"){
            this.setState({
                question: e.currentTarget.value
            })
        }
    }
    selectAns(e){
        this.setState({
            answer: e.target.attributes["id"].value
        })
    }
    render(){
        console.log("create quizcard question state", this.state)
        return (
            <>
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
                            <DropdownItem onClick={()=>this.mcToggle()}>Multiple Choice</DropdownItem>
                            <DropdownItem onClick={()=>this.tfToggle()}>True or False</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <div className="row">
                    <textarea id="question" onChange={(e)=> this.changeOpt(e)} style={{width: "100%", height: "20vh", margin:"1px", resize:"none"}}/>
                </div>
                {this.state.type === "mc" ? 
                <div>
                    <p>Choose a correct answer:</p>
                    <div className="row">
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="a"><Button id="a" onClick={(e)=>this.selectAns(e)}>A</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="a" id="a" placeholder="input an option here" />
                            </FormGroup>
                        </div>
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="b"><Button id="b" onClick={(e)=>this.selectAns(e)}>B</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="b" id="b" placeholder="input an option here" />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="c"><Button id="c" onClick={(e)=>this.selectAns(e)}>C</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="c" id="c" placeholder="input an option here" />
                            </FormGroup>
                        </div>
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="d"><Button id="d" onClick={(e)=>this.selectAns(e)}>D</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="d" id="d" placeholder="input an option here" />
                            </FormGroup>
                        </div>
                    </div> 
                </div> : 
                <div>
                    <p>Select the correct answer:</p>
                    <div className="row">
                        <Button color="primary" onClick={(e)=>this.selectAns(e)} id="true"> True </Button>
                    </div>
                    <div className="row">
                        <Button color="primary" onClick={(e)=>this.selectAns(e)} id="false"> False </Button>
                    </div>
                </div>}
            </Form>
            </>
        )
    }
}

export const CreatequizcardQuestion = connect(null, null)(PureCreateQuiz)
