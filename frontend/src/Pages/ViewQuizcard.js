import React from 'react';
import {connect} from 'react-redux'

//Component
import {NavBar} from '../Component/navbar';
import {ViewQuizcardQuestionModule} from '../Component/viewquizcardquestion';

import { getdataThunk } from '../Redux/actions/action'


//CSS
import classes from './ViewQuizcard.module.css'

class ViewQuizcard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            type: "quizcard",
            correctQuizcard:[]
        }
    }
    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.cards.quizcard.length > 0 ){
            this.setState({
                correctQuizcard: this.props.cards.quizcard.filter(quiz => quiz.id === parseInt(this.props.match.params.id))
            })
            const correctProps = nextProps.cards.quizcard.filter(filter => filter.id === parseInt(this.props.match.params.id))
            console.log("correctProps VIEW QUIZCARD",correctProps);
            // this.setState({
            //     correctQuestion: correctProps[0].submission,
            // });
        }
    }

    render() {
        console.log("PROPS IN VIEW QUIZCARD", this.props)
        console.log("STATE IN VIEW QUIZCARD", this.state)

        return (
            <div>
                <NavBar user={this.props.user} history={this.props.history}/>

            <div className={classes.viewquizcard}>
                {/* 1st row: Header */}
                <div className="row d-flex p-4">
                    <div className="col-8">
                        <h1>{this.state.correctQuizcard.length > 0 ? this.state.correctQuizcard[0].quizcardTitle : null}</h1>
                    </div>
                </div>

                <div className="row d-flex p-4">
                    <div className="col col-12 d-flex justify-content-center align-items-center">
                    <div className={classes.startbtncontainer}>
                    <span className={classes.startbtn}> Start Quiz</span>
                    </div>
                </div>
                </div>

                <div className="row d-flex p-4">
                    <div className="col col-12 justify-content-center align-items-center">
                    <button cards={this.props.cards} onClick={(e)=>{this.navigateSubmission(e)}}>View Submission</button>
                </div>
                </div>

                <ViewQuizcardQuestionModule question={this.state.correctQuestion} />
            </div>

            </div>
        );
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
      
    }
}


const connectedViewQuizcard= connect(mapStateToProps, mapDispatchToProps)(ViewQuizcard)
export { connectedViewQuizcard as ViewQuizcard };