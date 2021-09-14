import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'

import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {
    addSetConnect(e){
        this.props.addBridge({
            type: "classroom_set",
            classroomId: this.props.correctClass.id,
            setId: e.target.attributes["data-key"].value,
        })
      }
    render() {
        console.log("THISSSSS ISSSS SUCKSSSS", this.props);
        return (
            <>
                {this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className={classes.set} onClick={(e)=>{this.addSetConnect(e);this.props.toggle(e)}}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                }) : null}

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