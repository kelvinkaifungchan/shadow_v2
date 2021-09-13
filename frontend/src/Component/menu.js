import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/actions/action'
import "./menu.css"


class PureMenu extends React.Component {

    navigateClass(e){
        console.log("this is data key",e.target.attributes["data-key"].value)
        if (this.props.history.location.pathname === "/viewclassroom") {
            this.props.history.replace({
                pathname:`/viewclassroom`,
                state:{ classroom: e.target.attributes["data-key"].value }
            })
        } else {
            this.props.history.push({
                pathname:`/viewclassroom`,
                state:{ classroom: e.target.attributes["data-key"].value }
            })
        }
    }

    render() {
        return (
            <div id="menu">
            <ListGroup variant="flush" >
                <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-archive"></i> Classroom</strong></ListGroupItem>
                {this.props.classrooms.map((classroom, i) => {
                    return (
                <ListGroupItem data-key={classroom.id} onClick={(e)=>{this.navigateClass(e)}} tag="a" action>{classroom.title}</ListGroupItem>
                    )
                })}
                <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-layer-group"></i> Set</strong></ListGroupItem>
                {this.props.sets.map((sets, i) => {
                    return (
                <ListGroupItem tag="a" href="#" onClick={(e)=>{this.navigateSet(e)}} action>{sets.title}</ListGroupItem>
                    )
                })}
            </ListGroup>
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return {

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



export const Menu = connect(mapStateToProps, mapDispatchToProps)(PureMenu)