import React from 'react'
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classes from './viewquizcardpage.module.css'

class PureCreateQuiz extends React.Component{
    constructor(props){
        super(props)
        this.state={
            questionType: 'multipleChoice',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
            questionTime: "",
        }
    }
    displayQuestion(e, i){
        e.preventDefault()
        this.setState({
            questionType: this.props.questions[i].questionType,
            questionBody: this.props.questions[i].questionBody,
            multipleChoiceAnswer: this.props.questions[i].multipleChoiceAnswer,
            trueFalseAnswer: this.props.questions[i].trueFalseAnswer,
            a: this.props.questions[i].a,
            b: this.props.questions[i].b,
            c: this.props.questions[i].c,
            d: this.props.questions[i].d,
            questionTime:this.props.questions[i].questionTime,
        })
    }
    mcToggle(){
        this.setState({
            questionType: 'multipleChoice',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
            questionTime: "00:00",
        })
    }
    tfToggle(){
        this.setState({
            questionType: 'trueFalse',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
            questionTime: "00:00",
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
                questionBody: e.currentTarget.value
            })
        }
    }
    selectAns(e){
        if(this.state.questionType === "multipleChoice"){
            this.setState({
                multipleChoiceAnswer: e.target.attributes["id"].value
            })
        } else {
            this.setState({
                trueFalseAnswer: e.target.attributes["id"].value
            })
        }
    }
    getTime(){
        this.setState({
            questionTime: Math.floor(document.getElementById("preview").currentTime)
        })
    }
    clear(){
        this.setState({            
            questionBody: "",
            a: "",
            b: "",
            c: "",
            d: "",
        })
    }
    render(){
        return (
            <>
            <div className={classes.scrollicon}>
                {this.props.questions && this.props.questions.length > 0 ? this.props.questions.map((question, i)=>{
                    return (
                        <div key={i}>
                            <span key={i} onClick={(e) => this.displayQuestion(e, i)}>{i + 1}</span>
                        </div>
                    )
                }) : null}
                <span onClick={(e)=>{this.props.submit(e,this.state) ; this.clear()}}>+</span>
            </div>
            <div className={classes.viewquizcardquestion}></div>
            <Form>
                <div className="row">
                    <div className="col col-8">
                        <p>Question 1</p>
                        <p>{this.state.time}</p>
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
                    <textarea id="question" value={this.state.questionBody} className="input" onChange={(e)=> this.changeOpt(e)} style={{width: "100%", height: "20vh", margin:"1px", resize:"none"}}/>
                </div>
                {this.state.questionType === "multipleChoice" ? 
                <div>
                    <p>Choose a correct answer:</p>
                    <div className="row">
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="a"><Button id="a" className="input" onClick={(e)=>this.selectAns(e)}>A</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="a" id="a" value={this.state.a} />
                            </FormGroup>
                        </div>
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="b"><Button id="b" className="input" onClick={(e)=>this.selectAns(e)}>B</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="b" id="b" value={this.state.b} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="c"><Button id="c" className="input" onClick={(e)=>this.selectAns(e)}>C</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="c" id="c" value={this.state.c} />
                            </FormGroup>
                        </div>
                        <div className="col col-6">
                            <FormGroup>
                                <Label for="d"><Button id="d" className="input" onClick={(e)=>this.selectAns(e)}>D</Button></Label>
                                <Input onChange={(e) => this.changeOpt(e)} type="text" name="d" id="d" value={this.state.d} />
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
