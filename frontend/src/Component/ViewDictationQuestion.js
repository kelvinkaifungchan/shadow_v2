import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive'

// import QuestionProgress from '../Component/questionProgress';
import { AudioPlayer } from './audioplayer';
import { Canvas } from './canvas'


//CSS
import classes from './ViewDictationQuestion.module.css'

class ViewDictationQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tracking: [],
            target: "",
        }
    }
    onClickShowQuestionViewer(id) {
        
        this.setState({
            questionId: id,
            target: this.props.question.questions.filter(realQuestion => realQuestion.id === id)[0]
        })
        if (this.props.questionId === undefined) {
            this.room = id + "-" + this.props.dictation[0].id + "-" + 1
        } else {
            this.room = id + "-" + this.props.dictation[0].id + "-" + this.props.user.id.toString()
        }
        console.log("ROOM ID", this.room)
    }
    render() {
        console.log("props in VDQQQQ", this.props);
        console.log("state in VDQQQQ", this.state);

        return (

            <div className={classes.ViewDictationQuestion} >
                {/* <MediaQuery minWidth={1050}>
   
                </MediaQuery> */}
                <div >
                    <div className={classes.scrollicon} >
                        <div className="row" >

                            {this.props.question.questions &&
                                this.props.question.questions.length > 0 ?
                                this.props.question.questions.map(

                                    (question, i) => {
                                        if (i === 0) {
                                            return (
                                                <span key={i} onClick={() => this.onClickShowQuestionViewer(question.id)}>{i + 1}</span>
                                            )
                                        } else {
                                            return (
                                                <span key={i} onClick={() => { this.onClickShowQuestionViewer(question.id) }}>{i + 1}</span>
                                            )
                                        }
                                    }
                                )
                                : null}
                                <AudioPlayer src={this.state.target.dictationRecording} test={this.state}/>
                        </div>
                    </div>
                </div>
                <div className={classes.canvas}>
                    <Canvas questionId={this.state.questionId} dictationId={this.props.dictation[0].id} userId={this.props.user.id.toString()} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userStore.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
    }
}


const connectedViewDictationQuestion = connect(mapStateToProps, mapDispatchToProps)(ViewDictationQuestion)
export { connectedViewDictationQuestion as ViewDictationQuestion };