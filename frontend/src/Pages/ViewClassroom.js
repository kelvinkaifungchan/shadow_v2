import React from 'react';
import { connect } from 'react-redux'

import { logoutNowThunk } from '../Redux/actions/loginboxAction'
import { getdataThunk } from '../Redux/actions/action'

import { NavBar } from '../Component/navbar';

// import Tags from '../Component/tags';
import { NewSharePopUp } from '../Component/sharemodal';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayClassroomTag } from '../Component/displayclassroomtag';
import { AddnewPopUp } from '../Component/addnewmodal'

import classes from './ViewClassroom.module.css'

class ViewClassroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            // classroom: this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.location.state.classroom)),
            classroomTitle: "",
            classroomDesc: "",
        };
    }

    componentDidMount (){
        this.props.getdata({ email: localStorage.getItem('email') }) 
    }

    handleHeading(title){
        this.setState({
            classroomTitle: title
        })
    }
    
    handleTranscript(desc){
        this.setState({
            classroomDesc: desc
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    tagToggle(){
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle(){
        console.log('share tog')
        this.setState({
            shareModal: !this.state.shareModal
        })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {
        console.log("props of view classroom", this.props)
        console.log("state of view classroom", this.state)
        // if(this.props.classrooms == []){
        //     console.log("I AM HEREEEEEE");
        //     this.props.getdata({ email: JSON.parse(localStorage.getItem('email')) }) 
        // }
 
        return (
            <div>
                <NavBar />

            <div className={classes.viewclassroom}>
                <div className="row d-flex p-4">
                    <div className="col-8">
                    <h1>Sample Classroom Title</h1>
                    {/* <h1>{this.props.classrooms[0].title}</h1> */}
                    <h6>Sample Classroom Description</h6>
                        {/* <h6>{this.props.classrooms[0].description}</h6> */}
                    </div>
                    </div>

            <div className="row d-flex pl-4 pr-4 m-2">
            <div className={classes.sharingusericon}> 
                <img src={this.props.user.picture} alt="Avatar"></img>
            </div>

            <div className={classes.sharingusericon}> 
                <img src={this.props.user.picture} alt="Avatar"></img>
            </div>

                {/* <p>{this.props.classrooms[0].shared.displayName}</p> */}
                        {/* <Tags/> */}
                        <NewSharePopUp share={this.state} toggle={() => this.shareToggle()}/>
                        <span className={classes.sharingusericon}>
                        <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button>
                        </span>
            </div>

            <div className="row d-flex pl-4 pr-4 m-2">
            <button className={classes.tagbutton}>#sampletag</button>
                {/* <DisplayClassroomTag classrooms={this.props.classrooms} /> */}
                        <NewTagPopUp addTag={this.state} toggle={() => this.tagToggle()}/>
                        <span className="d-inline-flex ">
                        <button onClick={() => this.tagToggle()} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                        </span>
                        </div>

                    {/* Add button */}
                    <div className="row d-flex justify-content-between m-3">
                        <AddnewPopUp create={this.state} toggle={() => this.toggle()} />
                        <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className="col m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                            <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div>
                        

                        <DisplaySetModule sets={this.props.sets} />

                    </div>
                </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {

    console.log("state in VIEW CLASSROOM", state);
    return {
        tags:state.setStore.tags,
        sets: state.setStore.sets,
        classrooms: state.classroomStore.classrooms,
        user:state.userStore.user
    }
}

const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
    }
}

const connectedViewClassroom = connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };

    // componentDidMount(){
    //     console.log('cmpn did muntmuntmuntmuntmuntmuntmuntmuntmunt')
    //     this.props.getdata({ email: "test@test.com" })
    //     this.setState({
    //         classroom: this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.match.params.id))
    //     })
    // }
    // componentWillReceiveProps (nextProps){
    //     console.log('CWRP', nextProps)
    //     this.setState({
    //         classroom: nextProps.classrooms.filter(classroom => classroom.id === parseInt(nextProps.match.params.id))
    //     })
    // }
    // static getDerivedStateFromProps (nextProps, prevState) {
    //     console.log('next props', nextProps)
    //     console.log('prev state', prevState)
    //     // nextProps.classrooms = prevState
    //     const classroom = nextProps.classrooms
    //     console.log(classroom)
    //     // update your internal state that depends on the props
    //     // const internalState = nextProps.something
    //     // this.setState({internalState}
    //   }

