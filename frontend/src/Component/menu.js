import React from 'react'
import { connect } from 'react-redux'
// import {createClassThunk } from '../Redux/getdata/action'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getdataThunk } from '../Redux/getdata/action'
import "./menu.css"


class PureMenu extends React.Component {

    render() {
        return (
            <div id="menu">
            <ListGroup variant="flush" >
                <ListGroupItem tag="a" href="#" action><strong><i class="fas fa-archive"></i> Classroom</strong></ListGroupItem>
                {this.props.classrooms.map((classroom, i) => {
                    console.log(">>>>>>>>", classroom);
                    return (
                <ListGroupItem tag="a" href="#" action>{classroom.title}</ListGroupItem>
                    )
                })}
                <ListGroupItem tag="a" href="#" action><strong><i class="fas fa-layer-group"></i> Set</strong></ListGroupItem>
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



export const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu)