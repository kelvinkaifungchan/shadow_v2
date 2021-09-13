import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/actions/action'
import '../Component/main.css'
import { NavBar } from '../Component/navbar'
import { CreatePopUp } from '../Component/createmodal'

// import { CreateClassBtn } from '../Component/createclassbtn'
// import { CreateSetBtn } from '../Component/createsetbtn'

import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'


class PureDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: "",
            classroomId: "",
        };
    }

    componentDidMount() {
        this.props.getdata({ email: JSON.parse(localStorage.getItem('email')) })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass(){
        this.setState({
            type: "class"
        })
    }
    changeTypeSet(){
        this.setState({
            type: "set"
        })
    }

    navigateClass(e){
        // data = this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.location.state.classroom)),
        this.props.history.push({
            pathname:`/viewclassroom`,
            state: { classroom: this.props.classrooms.filter ((classroom) => {
                if(classroom.id === parseInt(e.target.attributes["data-key"].value)){
                    console.log('in if')
                    return classroom
                }
            }) 
        }
    })}
    navigateSet(e){
        console.log()
        this.props.history.push({
            pathname:`/viewset`,
            state: { set: this.props.sets.filter ((set) => {
                if(set.id === parseInt(e.target.attributes["data-key"].value)){
                    console.log('in if')
                    return set
                }
            }) 
        }
        })
    }
    render() {
        console.log('props in dashboard', this.props)
        return (
            <div>
                <NavBar user={this.props.user} />
                <CreatePopUp create={this.state} toggle={() => this.toggle()}/>
                <div className="p-3">
                    <div className="row d-flex p-4">
                        <div className="col ">
                            <span className="d-inline-flex"><h2 className="p-2 m-0">My Classroom</h2><span onClick={() => { this.changeTypeClass(); this.toggle(); }} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        </div>
                        {/* <h2>My Classroom</h2>
                    <CreateClassBtn  /> */}

                    </div>
                    <DisplayClassModule classrooms={this.props.classrooms} navigate={(e)=>{this.navigateClass(e)}}/>
                    
                    <div className="row d-flex p-4">
                        <div className="col ">
                            <CreatePopUp create={this.state} toggle={() => this.toggle() } history={this.props.history}/>
                            <span className="d-inline-flex "><h2 className="p-2 m-0">My Set</h2><span onClick={() => { this.changeTypeSet(); this.toggle(); }} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        </div>
                        {/* <h2>My Set</h2>
                    <CreateSetBtn /> */}
                    </div>
                    <DisplaySetModule sets={this.props.sets} navigate={(e)=>{this.navigateSet(e)}}/>
                    {this.props.loading && <div> Loading...</div>}
                    {this.props.error && <div> Oops! Something Wrong with Our Server</div>}

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

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
        }
    }
}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(PureDashboard)
