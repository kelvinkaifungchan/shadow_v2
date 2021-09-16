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
            correctShare: []
        };
    }

    async componentDidMount() {
        await this.props.getdata({ email: localStorage.getItem("email") });
        this.getclassroom()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "nextProps<><><><><><><>");
        const correctProps = nextProps.classrooms.filter(filter => filter.id === this.props.location.state.classroom[0].id)
        console.log("correctProps", correctProps);
        let nextlmao = correctProps[0].bridge.map((changed) => {
            const newestState = nextProps.sets.filter(changedSet => changedSet.id === changed.set_id)
            return newestState[0]
        });
        this.setState({
            correctSet: nextlmao,
            correctTag: correctProps[0].tags,
            correctShare: correctProps[0].shared
        });

    }

    getclassroom() {
        if (this.props.location.state.classroom[0].bridge != null) {
            const lmao = this.props.location.state.classroom[0].bridge.map((setId) => {
                const newestState = this.props.sets.filter(set => set.id === setId.set_id)
                return newestState[0]
            });
            this.setState({
                correctSet: lmao,
                correctTag: this.props.location.state.classroom[0].tags,
                correctShare: this.props.location.state.classroom[0].shared
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
    navigateClass(e) {
        this.props.history.push({
            pathname: `/viewclassroom`,
            state: {
                classroom: this.props.classrooms.filter((classroom) => {
                    if (classroom.id === parseInt(e.target.attributes["data-key"].value)) {
                        console.log('in if')
                        return classroom
                    }
                })
            }
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
        console.log("props in view classroom", this.props);
        console.log("state of view classroom", this.state);

        return (
            <div>
          
                <NavBar  classroom={() => this.getclassroom()} user={this.props.user} history={this.props.history}/>
                

                <div className={classes.viewclassroom}>
                    <div className="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.props.location.state.classroom[0].title}</h1>
                            <h6>{this.props.location.state.classroom[0].description}</h6>
                        </div>
                    </div>

                    <div className="row d-flex pl-4 pr-4 m-2">

                        {/* Share User */}
                        <DisplayShareUser shared={this.state.correctShare} />


                        {/* share user add button */}
                        <NewSharePopUp share={this.state} location={this.props.location.state.classroom[0]} toggle={() => this.shareToggle()} />
                        <span className={classes.sharingusericon}>
                            <button onClick={() => this.shareToggle()} className={classes.addusericon}><i className="fas fa-plus"></i></button>
                        </span>
                    </div>
                    {/* diaplay Tags */}
                    <div className="row d-flex pl-4 pr-4 m-2">
                        <DisplayClassroomTag tags={this.state.correctTag} />
                        <NewTagPopUp addTag={this.state} location={this.props.location.state.classroom[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex ">
                            <button onClick={() => { this.tagToggle(); this.changeTypeClass(); }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                        </span>
                    </div>


                    {/* Add button */}
                    <div className="row d-flex m-3">
                        <AddnewPopUp location={this.props.location} create={this.state} toggle={() => { this.changeTypeClass(); this.toggle() }} navigate={(e) => this.navigateSet(e)} />
                        <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.set}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div>

                        <DisplaySetModule location={this.props.location} classroom={this.props.classrooms} sets={this.state.correctSet} navigate={(e) => this.navigateSet(e)} />

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("store in ViewClassroom", state);

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

