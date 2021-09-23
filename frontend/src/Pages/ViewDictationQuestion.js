import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'

import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive'

// import QuestionProgress from '../Component/questionProgress';
// import AudioPlayer from '../Component/audioPlayer';
import { Canvas } from '../Component/canvas'


//CSS
import classes from './ViewDictationQuestion.module.css'

class ViewDictationQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }
    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });
    }

    render() {

        return (

            <div className={classes.ViewDictationQuestion} >
                <MediaQuery minWidth={1050}>
                    <div className="row" style={this.bg}>
                        <div className="col col-8">
                        </div>

                    </div>
                    <div className="row">
                        <div className="col col-12">
                            {/* <HeadingInput/> */}
                            <p>HeadingInput</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-12">
                            {/* <QuestionProgress/> */}
                            <p>QuestionProgress</p>
                            {/* <AudioPlayer/> */}

                            <p>AudioPlayer</p>
                        </div>
                    </div>
                </MediaQuery>
                <div >
                    <div className={classes.scrollicon} >
                        <div className="row" >
                            <span>1</span>
                            {/* {this.props.question.question &&
                                this.props.question.question.length > 0 ?
                                this.props.question.question.map(

                                    (question, i) => {
                                        if (i === 0) {
                                            return (
                                                <span key={i} onClick={() => this.onClickShowQuestionViewer(i)}>{i + 1}</span>
                                            )
                                        } else {
                                            return (
                                                <span key={i} onClick={() => { this.onClickShowQuestionViewer(i) }}>{i + 1}</span>
                                            )
                                        }
                                    }
                                )
                                : null} */}
                        </div>
                    </div>
                </div>
                <div className={classes.canvas}>
                    <Canvas user={this.props.user} canvasId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticatedMSP: state.authStore.isAuthenticated,
        user: state.userStore.user,
        sets: state.setStore.sets,
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