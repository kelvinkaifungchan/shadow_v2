import React from "react";
import { connect } from "react-redux";

import { logoutNowThunk } from '../Redux/actions/loginboxAction'

import { getdataThunk } from '../Redux/actions/action'

import { NavBar } from '../Component/navbar';

// import Tags from '../Component/tags';
import { NewSharePopUp } from "../Component/sharemodal";
import { NewTagPopUp } from "../Component/newtagmodal";
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
            correctSet: [],
        };
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem("email") });
        this.getclassroom()
    }

    getclassroom() {
        if (this.props.location.state.classroom[0].bridge != null) {
            const lmao = this.props.location.state.classroom[0].bridge.map((setId) => {
                const newestState = this.props.sets.filter(set => set.id === setId.set_id)
                return newestState[0]
            });
            this.setState({
                correctSet: lmao
            })
        } else {
            return null
        }
    }


    handleHeading(title) {
        this.setState({
            classroomTitle: title
        })
    }

    handleTranscript(desc) {
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

    tagToggle() {
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle() {
        console.log('share tog')
        this.setState({
            shareModal: !this.state.shareModal
        })
    }

    navigateSet(e) {
        this.props.history.push({
            pathname: `/viewset`,
            state: {
                set: this.props.sets.filter((set) => {
                    if (set.id === parseInt(e.target.attributes["data-key"].value)) {
                        console.log('in if')
                        return set
                    }
                })
            }
        })
    }


    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {
        console.log("THIS PROPS IN VC", this.props);
        console.log("state of view classroom", this.state);

        return (
            <div>
                <NavBar />

                <div className={classes.viewclassroom}>
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.props.location.state.classroom[0].title}</h1>
                            <h6>{this.props.location.state.classroom[0].description}</h6>
                        </div>
                    </div>


                    <div className="row d-flex pl-4 pr-4 m-2">

                        {/* Share User */}
                        {this.props.location.state.classroom[0].shared &&
                            this.props.location.state.classroom[0].shared.length > 0
                            ? this.props.location.state.classroom[0].shared.map(
                                (shared, j) => {
                                    return (
                                        <div key={j}>
                                            {/* //     <div className={classes.sharingusericon}> */}
                                            {/* //     <img src={this.props.user.picture} alt="Avatar"></img> */}
                                            <p >{shared.displayName}</p>

                                            {/* // </div> */}
                                        </div>
                                    )
                                }
                            ) : null
                        }


                        {/* share user add button */}
                        <NewSharePopUp share={this.state} location={this.props.location.state.classroom[0]} toggle={() => this.shareToggle()} />
                        <span className={classes.sharingusericon}>
                            <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button>
                        </span>
                    </div>

                    <div className="row d-flex pl-4 pr-4 m-2">
                        {this.props.location.state.classroom[0].tags &&
                            this.props.location.state.classroom[0].tags.length > 0
                            ? this.props.location.state.classroom[0].tags.map(
                                (tag, j) => {
                                    return (
                                        <span
                                            key={j}
                                            className={classes.tagbutton}
                                        >
                                            #{tag.body}
                                        </span>
                                    );
                                }
                            )
                            : null}
                        {/* <DisplayClassroomTag classrooms={this.props.classrooms} /> */}
                        <NewTagPopUp addTag={this.state} location={this.props.location.state.classroom[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex ">
                            <button onClick={() => { this.tagToggle(); this.changeTypeClass(); }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                        </span>
                    </div>


                    {/* Add button */}
                    <div className="row d-flex m-3">
                        <AddnewPopUp location={this.props.location} create={this.state} toggle={() => this.toggle()} navigate={(e) => this.navigateSet(e)} />
                        <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.set}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div>

                        <DisplaySetModule parent={this.props} sets={this.state.correctSet} navigate={(e) => this.navigateSet(e)} />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        email: state.authStore.email,
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

const connectedViewClassroom = connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };

