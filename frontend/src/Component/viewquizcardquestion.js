import React from 'react';
import { connect } from 'react-redux'
import classes from './viewquizcardquestion.module.css'

class PureViewQuizcardQuestionModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        //    trackingId:[],
        //    trackingAns:[],
           viewing: 0,
           showQuestionViewer: true,
           questionId: 0,
        //    multipleChoiceAnswer: "",
        //    trueFalseAnswer: "",
           answer: ""
        }
    }


    onClickShowQuestionViewer(id) {
        this.setState({
            showQuestionViewer: true,
            questionId: id,
        })

    }


    selectAns(e){
      
            this.setState({
                answer: e.target.attributes["id"].value
            })
       
    }


    // displayQuestion(e, i){
    //     // e.preventDefault()
    //     this.setState({
    //         viewing: i,
    //         questionType: this.props.questions[i].questionType,
    //         questionBody: this.props.questions[i].questionBody,
    //         multipleChoiceAnswer: this.props.questions[i].multipleChoiceAnswer,
    //         trueFalseAnswer: this.props.questions[i].trueFalseAnswer,
    //         a: this.props.questions[i].a,
    //         b: this.props.questions[i].b,
    //         c: this.props.questions[i].c,
    //         d: this.props.questions[i].d,
    //         questionTime:this.props.questions[i].questionTime,
    //     })
    // }

    displayQuestion(e, i){
        // e.preventDefault()
        console.log(">>>>>>",this.props.parent.quizcardQuestionSubmission.findIndex((each) => each.questionId === i))
        if (this.props.parent.quizcardQuestionSubmission.findIndex((each) => each.questionId === i) !== -1){
            this.setState({
                viewing: i,
                showQuestionViewer: true,
                answer: this.props.parent.quizcardQuestionSubmission[i].answer,
                questionId: i,
                // answer: 
            })
        } else {
            this.setState({
                viewing: i,
                showQuestionViewer: true,
                answer: "",
                questionId: i,
                // answer: 
            })
        }

    }

    switchQuestion(i){
        // e.preventDefault()
        console.log("!!!!!",this.props.parent.quizcardQuestionSubmission.findIndex((each) => each.questionId === i ))
        if (this.props.parent.quizcardQuestionSubmission.findIndex((each) => each.questionId === i ) !== -1){
            this.setState({
            viewing: this.state.viewing + 1,
            showQuestionViewer: true,
            questionId: this.state.questionId + 1,
            answer: this.props.parent.quizcardQuestionSubmission[i].answer
            })
        } else {
        this.setState({
            viewing: this.state.viewing + 1,
            showQuestionViewer: true,
            questionId: this.state.questionId + 1,
            answer: ""
        })
    }
}

    handleAnswer(questionId, submission) {
            this.props.addAnswer(questionId, submission)
            this.setState({
            })
        }    

    // addAnswer(questionId, submission, marking){
    //     this.props.addAnswer(questionId, submission, marking)
    // }

    viewing(e, i){
        this.setState({
            viewing: i,
        })
    }

    render() {
        console.log("states IN VIEW QUIZCARD Q", this.state)
        console.log("PROPS IN VIEW QUIZCARD Q", this.props)
        console.log(">>>>>>", this.props.question.question && this.state.viewing + 1 === this.props.question.question.length )
        return (
            <>
            
            <div className={classes.questionframe}>
                <div className="row">
                    <div className="col col-8">
                    <h4>Question {this.state.viewing !== "" ? this.state.viewing + 1  : null}</h4>
                    </div>
                </div>

            <div className="row">

            </div>
            {this.props.question.question &&
                                    this.props.question.question.length > 0 ?
                                    this.props.question.question.map((question, i) => {

                                        if (question.questionType === "multipleChoice" && i === this.state.questionId) {
                                            return (
                                                <div key={i} className={classes.viewquizcardanswer}>

                                                    <div key={i} className="row">
                                                        <div className="col mt-2">
                                                        <div style={{ width: "100%"}} >{question.questionBody}</div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-3">
                                                        <div className="col col-6">
                                                            <label htmlFor="A">Choice A</label>
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)} 
                                                            type="text" name="A" id="A" 
                                                            style={{
                                                                background: 
                                                                this.state.answer === "A" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "A" 
                                                                ? "2px solid #3b3d2f" : null}}
                                                                >{question.multipleChoiceA}</button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <label htmlFor="A">Choice B</label>
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)}
                                                            type="text" name="B" id="B" 
                                                            style={{
                                                                background: 
                                                                this.state.answer === "B" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "B" 
                                                                ? "2px solid #3b3d2f" : null}}>{question.multipleChoiceB}</button>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-5">
                                                        <div className="col col-6">
                                                            <label htmlFor="A">Choice C</label>
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)}
                                                            type="text" name="C" id="C" 
                                                            style={{
                                                                background: 
                                                                this.state.answer === "C" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "C" 
                                                                ? "2px solid #3b3d2f" : null}}>{question.multipleChoiceC}</button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <label htmlFor="A">Choice D</label>
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)}
                                                            type="text" name="D" id="D" 
                                                            style={{
                                                                background: 
                                                                this.state.answer === "D" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "D" 
                                                                ? "2px solid #3b3d2f" : null}}>
                                                                {question.multipleChoiceD}</button>
                                                        </div>
                                                    </div>

                                                    <div className="row pt-5">
                                                    <div className="col-12">
                                                        <button className={classes.savebtn} onClick={() =>  {this.switchQuestion(question.id) ; this.handleAnswer(question.id, this.state)}} >Save & Next</button>
                                                    </div>
                                                    </div>

                                                </div>
                                            )
                                        } else if (question.questionType === "trueFalse" && i === this.state.questionId) {
                                            return (
                                                <div key={i} className={classes.viewquizcardanswer}>
                                                    <div key={i} className="row">
                                                        <div className="col mt-2">
                                                        <div style={{ width: "100%"}} >{question.questionBody}</div>
                                                        </div>
                                                    </div>
                                                    <div className="row pt-4">
                                                        <div className="col col-6">
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)}
                                                            name="True" id="True" 
                                                            style={{
                                                                background: 
                                                                this.state.answer === "True" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "True" 
                                                                ? "2px solid #3b3d2f" : null}}> True </button>
                                                        </div>
                                                        <div className="col col-6">
                                                            <button 
                                                            className={classes.quizcardoptbtn}
                                                            onClick={(e) => this.selectAns(e)}
                                                            name="False" id="False"
                                                            style={{
                                                                background: 
                                                                this.state.answer === "False" 
                                                                        ? "#F4FFB4" : null, 
                                                                border: this.state.answer === "False" 
                                                                ? "2px solid #3b3d2f" : null}}> False </button>
                                                        </div>
                                                    </div>

                                                    <div className="row pt-3">
                                                    <div className="col-12">
                                                    {this.props.question.question && this.state.viewing + 1 === this.props.question.question.length ? 
                                                        <button className={classes.savebtn} onClick={(e) =>  {this.handleAnswer(question.id, this.state)}}>Save</button> : 
                                                        <button className={classes.savebtn} onClick={() =>  {this.switchQuestion(question.id) ; this.handleAnswer(question.id, this.state)}}>Save & Next</button>}
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


                <div className={classes.scrollicon} >
                    <div className="row" >

                        {this.props.question.question &&
                            this.props.question.question.length > 0 ?
                            this.props.question.question.map(

                                (question, i) => {
                                    if (i === 0) {
                                        return (
                                            <span key={i} onClick={(e) => {this.displayQuestion(e, i) ; this.viewing(e,i)}}
                                            style={{ 
                                                background: this.state.viewing === i ? "#F6CA4E" : null, 
                                                color: this.state.viewing === i ? "#FFFFFF" : null}}>{i + 1}</span>
                                        )
                                    } else {
                                        return (
                                            <span key={i} onClick={(e) => { this.displayQuestion(e,i) ; this.viewing(e,i) }}
                                            style={{ 
                                                
                                                background: this.state.viewing === i ? "#F6CA4E" : null, 
                                                color: this.state.viewing === i ? "#FFFFFF" : null}}
                                                >{i + 1}</span>
                                        )
                                    }
                                }
                            )
                            : null}
                    </div>
                </div>

            </>
        )

    }
}




export const ViewQuizcardQuestionModule = connect(null, null)(PureViewQuizcardQuestionModule)
