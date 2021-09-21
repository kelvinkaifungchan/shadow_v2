import React from "react";
import { connect } from "react-redux";
// Require Action
import { getdataThunk } from '../Redux/actions/action'

// Require Component
import { NavBar } from '../Component/navbar';
import { DisplayShareUser } from '../Component/displayshareduser'
import { DisplaySetModule } from '../Component/displaysetmodule'
import { DisplayClassroomTag } from '../Component/displayclassroomtag';

// Require Modal Component
import { NewSharePopUp } from "../Component/sharemodal";
import { NewTagPopUp } from "../Component/newtagmodal";
import { AddnewPopUp } from '../Component/addnewmodal'

// Require Css
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
            classroomTitle: "",
            classroomDesc: "",
            correctSet: [],
            correctTag: [],
            correctShare: [],
            correctClass: [],
        };
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });
    }

    async componentWillReceiveProps(nextProps) {
        await this.setState({
            correctClass: this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.match.params.id))
        })
        if(this.state.correctClass[0] !== undefined){
            const correctProps = nextProps.classrooms.filter(filter => filter.id === parseInt(this.state.correctClass[0].id))
            if(correctProps[0]!== undefined){
                if(correctProps[0].bridge.length >= 0){
                    let correctSets = correctProps[0].bridge.map((changed) => {
                        const newestState = nextProps.sets.filter(changedSet => changedSet.id === changed.set_id)
                        return newestState[0]
                    });
                    this.setState({
                        correctSet: correctSets,
                        correctTag: correctProps[0].tags,
                        correctShare: correctProps[0].shared
                    });
                }
            }
        }
    }

    getclassroom() {
        if (this.state.correctClass[0].bridge != null) {
            const lmao = this.state.correctClass[0].bridge.map((setId) => {
                const newestState = this.props.sets.filter(set => set.id === setId.set_id)
                return newestState[0]
            });
            this.setState({
                correctSet: lmao,
                correctTag: this.state.correctClass[0].tags,
                correctShare: this.state.correctClass[0].shared
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
            trigger: !this.state.trigger
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
        if (e.target.attributes["data-key"].value === "delete") {
            return
        } else {
            this.props.history.push({
                pathname: `/viewset/${e.target.attributes["data-key"].value}`,
            })
        }
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {
        console.log("props in view classroom", this.props);
        console.log("state of view classroom", this.state);

        return (
            <div>
                <NavBar  classroom={() => this.getclassroom()} user={this.props.user} history={this.props.history}/>
            
                <div className={classes.viewclassroom}>
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.state.correctClass.length > 0 ? this.state.correctClass[0].title : null}</h1>
                            <h6>{this.state.correctClass.length > 0 ? this.state.correctClass[0].description : null}</h6>
                        </div>
                    </div>

                    <div className="row d-flex pl-4 pr-4 m-2">

                        {/* Share User */}
                        <DisplayShareUser shared={this.state.correctShare} />


                        {/* share user add button */}
                        <NewSharePopUp share={this.state} location={this.state.correctClass[0]} toggle={() => this.shareToggle()} />
                        <span className={classes.sharingusericon}>
                            {this.props.user.role === "teacher" ? <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button> : null}
                        </span>
                    </div>
                    {/* diaplay Tags */}
                    <div className="row d-flex pl-4 pr-4 m-2">
                        <DisplayClassroomTag tags={this.state.correctTag} />
                        <NewTagPopUp addTag={this.state} location={this.state.correctClass[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex ">
                            {this.props.user.role === "teacher" ? <button onClick={() => { this.tagToggle(); this.changeTypeClass(); }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button> : null}
                        </span>
                    </div>


                    {/* Add button */}
                    <div className="row d-flex m-3">
                        <AddnewPopUp match={this.props.match} correctClass={this.state.correctClass} create={this.state} toggle={() => { this.changeTypeClass(); this.toggle() }} navigate={(e) => this.navigateSet(e)} />
{                        this.props.user.role === "teacher" ? <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.set}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div> : null}

                    <DisplaySetModule match={this.props.match} sets={this.props.sets} classroom={this.props.classrooms} correctClass={this.state.correctClass} correctSets={this.state.correctSet} navigate={(e) => this.navigateSet(e)} />

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

