import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'

// Require Component
import { NavBar } from '../Component/navbar'
import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'

// Require Modal Component
import { CreatePopUp } from '../Component/createmodal'

// Require Css
import classes from './Dashboard.module.css'
import '../Component/main.css'


class PureDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: "",
            classroomId: "",
            dashSet: "dashSet",
        };
    }

    componentDidMount() {
        this.props.getdata({ email: localStorage.getItem('email') })
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
    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }



    navigateClass(e) {
        console.log(e)
        if (e.target.attributes["data-key"].value === "delete") {
            return
        } else {
            this.props.history.push({
                pathname: `/viewclassroom/${e.target.attributes["data-key"].value}`,
            })
        }
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

    render() {
        console.log('props in dashboard', this.props)
        return (
            <div className="page">
                {/* <NavBar  user={this.props.user} history={this.props.history}/> */}
                <CreatePopUp create={this.state} toggle={() => this.toggle()}/>
                
                <div className={classes.dashboard}>

                    <div className="row d-flex p-2">
                        <h1>My Classroom</h1>
                        <span className={classes.createclassroombtn}>
                            <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className={classes.addbtn}><i className="fas fa-plus"></i></div>
                        </span>
                    </div>

                    <div className="row d-flex pl-2">
                        <DisplayClassModule classrooms={this.props.classrooms} navigate={(e, classId) => { this.navigateClass(e, classId) }} />
                    </div>

                    <div className="row d-flex p-2">
                        <CreatePopUp create={this.state} dash={this.state.dashSet} toggle={() => this.toggle()} history={this.props.history} />
                        <h1>My Set</h1>
                        <span className={classes.createsetbtn}>
                            <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.addbtn}><i className="fas fa-plus"></i></div>
                        </span>
                    </div>

                    <div className="row d-flex pl-2">
                        <DisplaySetModule sets={this.props.sets} dash={this.state.dashSet} navigate={(e) => { this.navigateSet(e) }} />
                    </div>

                    {this.props.loading && <div> Loading...</div>}
                    {this.props.error && <div> Oops! Something Wrong with Our Server</div>}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard?", state);

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


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(PureDashboard)
