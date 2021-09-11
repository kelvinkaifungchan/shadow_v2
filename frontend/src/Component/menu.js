import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/actions/classroomAction'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getdataThunk } from '../Redux/actions/action'
import "./menu.css"


class PureMenu extends React.Component {

    render() {
        return (
            <div id="menu">
            <ListGroup variant="flush" >
                <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-archive"></i> Classroom</strong></ListGroupItem>
                {this.props.classrooms.map((classroom, i) => {
                    console.log(">>>>>>>>", classroom);
                    return (
                <ListGroupItem tag="a" href="#" action>{classroom.title}</ListGroupItem>
                    )
                })}
                <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-layer-group"></i> Set</strong></ListGroupItem>
                {this.props.sets.map((sets, i) => {
                    return (
                <ListGroupItem tag="a" href="#" action>{sets.title}</ListGroupItem>
                    )
                })}
            </ListGroup>
            </div>
        )
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
        }
    }
}



export const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu)