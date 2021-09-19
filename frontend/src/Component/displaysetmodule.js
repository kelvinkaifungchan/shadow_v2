import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
// Require Css
import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {

    addSetConnect(e){
        console.log('addSetConnect')
        this.props.addBridge({
            type: "classroom_set",
            classroomId: this.props.match.params.id,
            setId: parseInt(e.target.attributes["data-key"].value),
        })
      }
    render() {
        console.log("props in display set module", this.props);
        return (
            <>
                { this.props.display === "3" && this.props.correctClass && this.props.correctClass.length > 0 && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    console.log('display first set moduel')
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.addSetConnect(e); this.props.toggle()}}>
                            <h4 data-key={set.id}>{set.title} Exist Modal</h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                }) : this.props.correctSets && this.props.correctSets.length > 0 && this.props.correctSets[0] !== undefined ? this.props.correctSets.map(set => {
                    console.log('correct sets', set)
                        return (
                            <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                                <h4 data-key={set.id}>{set.title} View Class</h4>
                                <p data-key={set.id}>{set.description} </p>
                            </div>
                        )
                }) 
                : this.props.dash === "dashSet" && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}>{set.title} Dashboard</h4>
                            <p data-key={set.id}>{set.description} </p>
                        </div>
                    )
                })
                : null}
            </>
        )

    }
}

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