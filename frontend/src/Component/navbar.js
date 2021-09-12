import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import "./menu.css"
import classes from './navbar.module.css'
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
            <div className={classes.header}>
                    <div className="col-2">
                        <Link to='/' className={classes.logo}>shadow</Link>
                    </div>

                    <div className="col-8">
                        <button onClick={() => { this.toggle() }}><i className="fas fa-bars"></i></button>
                    </div>

                    <div className={classes.right}>
                        <button><i className="fas fa-search"></i></button>
                        <Link to="/account" className={classes.icon}><img src={this.props.user.picture} alt="Avatar"></img></Link>
                    </div>
                    <div className="d-flex justify-content-center ">
                        {modal ? <Menu /> : null}
                    </div>
                </div>

        );
    }
}


const mapStateToProps = (state) => {
                    // console.log("state in dashboard", state);

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