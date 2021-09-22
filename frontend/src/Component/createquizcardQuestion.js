import React from 'react'
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classes from './createquizcardQuestion.module.css'

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
            <div className={classes.questionframe}>
                <div className="row">
                    <div className="col col-8">
                        <p>Question {this.props.questions.questions}</p>
                        <p>{this.state.time}</p>
                    </div>
                    <div className="col col-4">
                        <div className={classes.questiontype}>
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
                </div>

                <div className="row">
                    <div className="col col-12">
                    <textarea id="question" value={this.state.questionBody} className={classes.question} onChange={(e)=> this.changeOpt(e)} />
                    </div>
                </div>

                {this.state.questionType === "multipleChoice" ? 
                <div>
                    <div className="row">
                    <table>
                        <div className="col col-12">
                        <tr className={classes.questionrow}>
                                {/* <FormGroup> */}
                                        <th className={classes.opt}>
                                            <Label for="a">
                                                <Button id="a" className="input" onClick={(e)=>this.selectAns(e)}
                                                style={{
                                                    background: 
                                                    this.state.multipleChoiceAnswer === "a" 
                                                            ? "#3b3d2f" : null, 
                                                    border: this.state.multipleChoiceAnswer === "a" 
                                                    ? "1px solid #3b3d2f" : null}} >A</Button>
                                            </Label>
                                        </th>

                                        <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="a" id="a" value={this.state.a} />
                                        </td>
                                    {/* </FormGroup> */}

                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="b">
                                            <Button id="b" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                    background: 
                                                    this.state.multipleChoiceAnswer === "b" 
                                                            ? "#3b3d2f" : null, 
                                                    border: this.state.multipleChoiceAnswer === "b" 
                                                    ? "1px solid #3b3d2f" : null}} >B</Button></Label>
                                    </th>

                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="b" id="b" value={this.state.b} />
                                    </td>
                                    {/* </FormGroup> */}
                        </tr>
                        </div>

                        <div className="col col-12">
                        <tr className={classes.questionrow}>
                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="c">
                                            <Button id="c" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                background: 
                                                this.state.multipleChoiceAnswer === "c" 
                                                        ? "#3b3d2f" : null, 
                                                border: this.state.multipleChoiceAnswer === "c" 
                                                ? "1px solid #3b3d2f" : null}} >C</Button></Label>
                                    </th>

                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="c" id="c" value={this.state.c} />
                                    </td>
                                    {/* </FormGroup> */}

                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="d">
                                            <Button id="d" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                background: 
                                                this.state.multipleChoiceAnswer === "d" 
                                                        ? "#3b3d2f" : null, 
                                                border: this.state.multipleChoiceAnswer === "d" 
                                                ? "1px solid #3b3d2f" : null}} >D</Button></Label>
                                    </th>
                                        
                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="d" id="d" value={this.state.d} />
                                    </td>

                                    {/* </FormGroup> */}
                        </tr>
                        </div>

                    </table>
                    </div>
                </div> : 
                <div>
                    <div className="row">
                    <table>
                        <div className="col col-12">
                        <tr className={classes.questionrow}>
                                    <th className={classes.tfopt}>
                                        <Button onClick={(e)=>this.selectAns(e)} id="true"
                                        style={{
                                            background: 
                                            this.state.trueFalseAnswer === "true" 
                                                    ? "#3b3d2f" : null, 
                                            border: this.state.trueFalseAnswer === "true" 
                                            ? "1px solid #3b3d2f" : null}}
                                            > True </Button>
                                    </th>

                                    <th className={classes.tfopt}>
                                        <Button onClick={(e)=>this.selectAns(e)} id="false"
                                        style={{
                                            background: 
                                            this.state.trueFalseAnswer === "false" 
                                                    ? "#3b3d2f" : null, 
                                            border: this.state.trueFalseAnswer === "false" 
                                            ? "1px solid #3b3d2f" : null}}
                                            > False </Button>
                                    </th>
                                        
                        </tr>
                        </div>
                    </table>
                    </div>
                </div>
            }
            </div>
            </Form>

            <div className={classes.scrollicon}>
                <span onClick={(e)=>{this.props.submit(e,this.state) ; this.clear()}}>+</span>
                {this.props.questions && this.props.questions.length > 0 ? this.props.questions.map((question, i)=>{
                    return (
                            <span onClick={(e) => this.displayQuestion(e, i)} key={i}>{i + 1}</span>

                    )
                }) : null}
            </div>
            </>
        )
    }
}

export const CreatequizcardQuestion = connect(null, null)(PureCreateQuiz)
