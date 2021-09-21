import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';

// Require Action
import { getdataThunk } from '../Redux/actions/action'
// Require Css
import classes from './menu.module.css'


class PureMenu extends React.Component {

    
    async navigateClass(e){
        await this.props.history.push({
            pathname:`/viewclassroom/${e.target.attributes["data-key"].value}`,
        })
        this.props.classroom ? this.props.classroom() : console.log("hi")
    
    }

    async navigateSet(e){
        console.log("FUCK ME DADDY SET")
        await this.props.history.push({
            pathname:`/viewset/${e.target.attributes["data-key"].value}`,
        })
        console.log("CLASSSS", this.props.class)
        console.log("SETTT", this.props.set)
       
        this.props.set ? this.props.set() : console.log("hehe")
        
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