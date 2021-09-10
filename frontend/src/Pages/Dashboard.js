import React from 'react';
import { connect } from 'react-redux'

// import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/getdata/action'
import '../Component/main.css'
import { NavBar } from '../Component/navbar'

import { CreateClassBtn } from '../Component/createclassbtn'
import { CreateSetBtn } from '../Component/createsetbtn'

// import { CreateClassPopUp } from '../Component/createclassmodal'
// import { CreateSetPopUp } from '../Component/createsetmodal'

import { DisplayClassModule } from '../Component/displayclassmodule'
import { DisplaySetModule } from '../Component/displaysetmodule'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classModal: false,
            setModal: false,
        };
    }
    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }

    handleshow = () => {
        this.child.current.toggle()
    }


    render() {
        return (
            <div>
                <NavBar user={this.props.user} />

                <div className="p-3">
                    <div className="row d-flex p-4">
                        <h2>My Classroom</h2>
                    <CreateClassBtn />
                    </div>
                    <DisplayClassModule classrooms={this.props.classrooms} />
                    
                    <div className="row d-flex p-4">
                        <h2>My Set</h2>
                    <CreateSetBtn />
                    </div>
                    <DisplaySetModule sets={this.props.sets} />
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
        loading: state.dataStore.loading,
        error: state.dataStore.error,
        user: state.dataStore.user,
        classrooms: state.dataStore.classrooms,
        sets: state.dataStore.sets,
        cards: state.dataStore.cards,
        tags: state.dataStore.tags,


    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }

    }
}


const connectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export { connectedDashboard as Dashboard };