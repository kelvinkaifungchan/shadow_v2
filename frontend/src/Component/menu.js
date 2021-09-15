import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getdataThunk } from '../Redux/actions/action'

import classes from './menu.module.css'


class PureMenu extends React.Component {

    // navigateClass(e){
    //     console.log("this is data key",e.target.attributes["data-key"].value)
    //     if (this.props.history.location.pathname === "/viewclassroom") {
    //         this.props.history.replace({
    //             pathname:`/viewclassroom`,
    //             state:{ classroom: e.target.attributes["data-key"].value }
    //         })
    //     } else {
    //         this.props.history.push({
    //             pathname:`/viewclassroom`,
    //             state:{ classroom: e.target.attributes["data-key"].value }
    //         })
    //     }
    // }
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

    // navigateSet(e){
    //     console.log("this is data key",e.target.attributes["data-key"].value)
    //     if (this.props.history.location.pathname === "/viewset") {
    //         this.props.history.replace({
    //             pathname:`/viewset`,
    //             state:{ set: e.target.attributes["data-key"].value }
    //         })
    //     } else {
    //         this.props.history.push({
    //             pathname:`/viewset`,
    //             state:{ set: e.target.attributes["data-key"].value }
    //         })
    //     }
    // }

    navigateSet(e){
        console.log("FUCK ME DADDY SET")
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
        return (
            <div className={classes.dropdown}>
                <ListGroup variant="flush" className={classes.dropdowncontent}>
                    <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-archive"></i> Classroom</strong></ListGroupItem>
                    {this.props.classrooms.map((classroom, i) => {
                        return (
                    <ListGroupItem data-key={classroom.id} onClick={(e)=>{this.navigateClass(e)}} tag="a" action>{classroom.title}</ListGroupItem>
                        )
                    })}
                    <ListGroupItem tag="a" href="#" action><strong><i className="fas fa-layer-group"></i> Set</strong></ListGroupItem>
                    {this.props.sets.map((set, i) => {
                        return (
                    <ListGroupItem data-key={set.id} tag="a" onClick={(e)=>{this.navigateSet(e)}} action>{set.title}</ListGroupItem>
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