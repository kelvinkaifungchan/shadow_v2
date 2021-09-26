import React from 'react';
import { connect } from 'react-redux'



//Component
import { ViewQuizcardQuestionModule } from '../Component/viewquizcardquestion';
import { VideoPlayer } from '../Component/videoplayer';

//Actions
import { getdataThunk } from '../Redux/actions/action'
import { addSubmissionThunk } from '../Redux/actions/submissionAction';


//CSS
import classes from './ViewQuizcard.module.css'


class ViewQuizcard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            type: "quizcard",
            correctQuizcard: [],
            correctQuestion: [],
            quizcardQuestionSubmission: [],
        }
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cards.quizcard.length > 0) {
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(quiz => quiz.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            this.setState({
                correctQuestion: correctProps[0]
            })

        }
    }
    onClickViewQuizcardQuestion() {
        this.setState({
            showQuizcardQuestion: true,
        })
    }

    // addAnswer(questionId, submission) {
        // this.props.submitAnswer({
        //     email: localStorage.getItem('email'),
        //     type: this.state.type,
        //     quizcardQuestionSubmission: { questionId: questionId, submission: submission },
        //     // quizcardQuestionMarking: marking,
        //     quizcardId: parseInt(this.props.match.params.id)
        // })
    // }

    // addAnswer(questionId, submission){
    //     // e.preventDefault()
    //     console.log("what is submission", submission)
    //     // const index = this.state.quizcardQuestionSubmission.indexOf(e => (e.questionId === submission.questionId))
    //     // console.log("INDEX", index)
    //     console.log("INCLUDES???", this.state.quizcardQuestionSubmission.filter(x => (x.questionId === submission.questionId)))
    //     if (this.state.quizcardQuestionSubmission.filter(x => (x.questionId === submission.questionId)).length > 0) {
    //                 this.setState({
    //                     quizcardQuestionSubmission: this.state.quizcardQuestionSubmission.map(each =>each.questionId === submission.questionId) || submission
    //         })
    //     } else 
    //         this.setState({
    //             quizcardQuestionSubmission: this.state.quizcardQuestionSubmission.concat(submission)
    //     })
    //     }
            
    
    addAnswer(questionId, submission){
        const index = this.state.quizcardQuestionSubmission.findIndex(
            (each) => each.questionId === submission.questionId
            ) 
            
            let newCopy = this.state.quizcardQuestionSubmission.slice();
            newCopy[index] = submission;
            
        if (index !== -1){
            this.setState({
                quizcardQuestionSubmission: newCopy
            }) 
        } else {
            this.setState({
                quizcardQuestionSubmission: this.state.quizcardQuestionSubmission.concat(submission)
            })
        }

    }

    submitAnswer(){
        console.log('this.submit state', this.state)
        this.props.submitAnswer({
            email: localStorage.getItem('email'),
            type: this.state.type,
            quizcardQuestionSubmission: this.state.quizcardQuestionSubmission,
            // quizcardQuestionMarking: marking,
            quizcardId: parseInt(this.props.match.params.id)
        })
    }

    async navigateSubmission(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: `/viewquizcardSubmission/${this.props.match.params.id}`,
        })
    }

    render() {
        // console.log("props in View Quizcard PAGE", this.props)
        // console.log("state in View Quizcard PAGE", this.state)
        return (
            <div>
                <div className={classes.viewquizcard}>
                    {/* 1st row: Header */}
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.state.correctQuizcard.length > 0 ? this.state.correctQuizcard[0].quizcardTitle : null}</h1>
                            </div>
                            {this.state.showQuizcardQuestion &&
                            <div className="col-4 ">
                                {this.state.quizcardQuestionSubmission.length === this.state.correctQuestion.question.length 
                                ? <button className={classes.viewsubmit} cards={this.props.cards} onClick={(e) => {this.submitAnswer() ; this.navigateSubmission(e) }}>Finish & Submit</button>
                                : <button className={classes.remainingbox}> {this.state.correctQuestion.question.length - this.state.quizcardQuestionSubmission.length} Remaining</button>}
                            </div>}
                            </div>

                            <div className="row d-flex p-4">
                        {this.state.showQuizcardQuestion &&
                                <div className="col col-6">
                                    <VideoPlayer src={this.state.correctQuestion.quizcardRecording} />
                                </div>
                            }

                        {this.state.showQuizcardQuestion &&
                            <div className="col col-6">
                                <ViewQuizcardQuestionModule question={this.state.correctQuestion} parent={this.state} addAnswer={(questionId, submission) => this.addAnswer(questionId, submission)} navigate={(e) => this.navigateSubmission(e)} />
                            </div>
                        }
                    </div>

                    <div className="row d-flex p-4">
                        {!this.state.showQuizcardQuestion &&
                            <div className="col col-12 d-flex justify-content-center align-items-center">
                                <div onClick={() => { this.onClickViewQuizcardQuestion() }} className={classes.startbtncontainer}>
                                    <span className={classes.startbtn}> Start Quiz</span>
                                </div>
                            </div>}
                    </div>


                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userStore.user,
        classrooms: state.classroomStore.classrooms,
        sets: state.setStore.sets,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        submitAnswer: (submission) => {
            dispatch(addSubmissionThunk(submission))
        },
    }
}


const connectedViewQuizcard = connect(mapStateToProps, mapDispatchToProps)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };