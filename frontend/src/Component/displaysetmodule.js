import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'

import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state={
    //         store: this.props.store
    //     }
    // }
    // componentDidMount(){
    //     this.getclassroom()
    // }
    // getclassroom() {
    //     if (this.props.location.state.classroom[0].bridge != null) {
    //         const lmao = this.props.location.state.classroom[0].bridge.map((setId) => {
    //             const newestState = this.props.sets.filter(set => set.id === setId.set_id)
    //             return newestState[0]
    //         });
    //         this.setState({
    //             correctSet: lmao
    //         })
    //     } else {
    //         return null
    //     }
    // }
    addSetConnect(e){
        this.props.addBridge({
            type: "set",
            classroomId: this.props.location.state.classroom[0].id,
            setId: parseInt(e.target.attributes["data-key"].value),
        })
      }
    render() {
        console.log("props in display set module", this.props);
        console.log("props in display set module", this.props);
        return (
            <>
                { this.props.location && this.props.location.pathname === "/viewclassroom" && this.props.correctClass && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.addSetConnect(e);this.props.toggle(e)}}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                }) : this.props.location && this.props.location.pathname === "/viewclassroom" && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description} </p>
                        </div>
                    )
                }) : this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description} </p>
                        </div>
                    )
                }): <p>no set yet</p>}

            </>
        )

    }
}
// const mapStateToProps = (state) => {
//     console.log("state in ViewClassroom", state);

//     return {
//         email: state.authStore.email,
//         user: state.userStore.user,
//         classrooms: state.classroomStore.classrooms,
//         sets: state.setStore.sets,
//         cards: state.cardStore.card,
//         tags: state.tagStore.tags,
//     }
// }
const mapDispatchToProps = dispatch => {
    return {
        addBridge: (bridge) => {
            dispatch(addBridgeThunk(bridge))
        },
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}
export const DisplaySetModule = connect(null, mapDispatchToProps)(PureDisplaySetModule)