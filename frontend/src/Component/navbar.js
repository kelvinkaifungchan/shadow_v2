import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import "./menu.css"
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'
import { Menu } from '../Component/menu'

class PureNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        console.log('t')
        this.setState({
            modal: !this.state.modal,
        });
    }

    componentDidMount() {
        this.props.getdata({ email: "test@test.com" })
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }
    render() {
        console.log("this.props in navbar >>>>>>>>>>>",)
        const { modal } = this.state
        return (
            <div>

                <div className=" p-3 d-flex  justify-content-between" id="navbar">

                    <div className=" p-3 d-inline-flex">
                        <h2>shadow</h2>
                    </div>
                    <div className=" p-3 d-inline-flex">
                        <span onClick={() => { this.toggle() }}><i className="fas fa-bars"></i></span>
                    </div>
                    <div className=" p-3 d-inline-flex">
                        <span><i className="m-2 fas fa-search"></i></span>
                        <span ><img id="picture" src={this.props.user.picture} alt="Avatar" className="avatar-sm"></img></span>
                        <Link onClick={this.logout} to="/login">Logout</Link>
                    </div>

                </div>
                <div  className="d-flex justify-content-center ">
                    {modal ? <Menu /> : null}
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    console.log("state in dashboard", state);

    return {
       
  
        user: state.userStore.user,
        classrooms: state.classroomStore.classroom,
        sets: state.setStore.set,
        cards: state.cardStore.card,
        tags: state.tagStore.tags,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        },
        logout: () => {
            dispatch(logoutNowThunk())
        }
    }
}



export const NavBar = connect(mapStateToProps, mapDispatchToProps)(PureNavBar)