import React from 'react';
import { connect } from 'react-redux'

import { deleteClassroom } from '../Redux/actions/classroomAction';
import classes from './displayclassmodule.module.css'

class PureDisplayClassModule extends React.Component {

    deleteClassroom(classroomId) {
        this.props.deleteClassroom({
            id: classroomId,
        })
    }
    
    render() {

        return (
            <>
                {this.props.classrooms.map((classroom, i) => {
                    console.log("classroomclassroomclassroomclassroom", classroom);
                    return (
                        <div key={i} data-key={classroom.id} className={classes.classroom} onClick={(e) => { this.props.navigate(e, classroom.id) }}>
                            <h4 data-key={classroom.id} className={classes.title}>{classroom.title}</h4>
                            <span data-key="delete" className={classes.deletebtn}><i onClick={()=>this.deleteClassroom(classroom.id)} data-key="delete" className="fas fa-times"></i></span>
                            <p data-key={classroom.id}>{classroom.description}</p>
                            <div data-key={classroom.id}>
                                {classroom.tag && classroom.tag.length > 0 ? classroom.tags.map((tag, j) => {
                                    return (
                                        <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                    )
                                }) : null}
                            </div>

                        </div>
                    )
                })}
            </>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("STATE IN DISPLAY CLASS", state);
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
        deleteClassroom: (classroom) => {
            dispatch(deleteClassroom(classroom))
        }
    }
}

export const DisplayClassModule = connect(mapStateToProps, mapDispatchToProps)(PureDisplayClassModule)