import React from 'react';
import { connect } from 'react-redux'

// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { addBridgeThunk } from '../Redux/actions/bridgeAction'
import { deleteSet } from '../Redux/actions/setAction';
import { deleteBridgeThunk } from '../Redux/actions/bridgeAction';

// Require Css
import classes from './displaysetmodule.module.css'

class PureDisplaySetModule extends React.Component {

    addSetConnect(e) {
        this.props.addBridge({
            type: "classroom_set",
            classroomId: this.props.match.params.id,
            setId: parseInt(e.target.attributes["data-key"].value),
        })
    }

    deleteSet(setId) {
        this.props.deleteSet({
            id: setId,
        })
        this.deleteBridge(setId)
    }
    deleteBridge(setId) {
        if (this.props.dash === "dashSet") {
            this.props.deleteBridge({
                type: "classroom_set",
                setId: setId
            })
        } else {
            this.props.deleteBridge({
                type: "classroom_set",
                setId: setId,
                classroomId: this.props.match.params.id
            })
        }
    }
    render() {
        return (
            <>  
                    {/* add Exist */}
                { this.props.display === "3" && this.props.correctClass && this.props.correctClass.length > 0 && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                    return (
                        <div key={i} data-key={set.id} className={classes.set} onClick={(e) => { this.addSetConnect(e); this.props.toggle() }}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                    // view set
                }) : this.props.correctSets && this.props.correctSets.length > 0 && this.props.correctSets[0] !== undefined ? this.props.correctSets.map((set, i) => {
                    return (
                        <div key={i} data-key={set.id} className={classes.set} onClick={(e) => { this.props.navigate(e) }}>
                            <h4 data-key={set.id}>{set.title}</h4>
                            <span data-key="delete" className={classes.deletebtn}><i data-key="delete" onClick={()=>this.deleteBridge(set.id)} className="fas fa-times"></i></span>
                            <p data-key={set.id}>{set.description} </p>
                        </div>
                    )
                })
                    // dashboard
                    : this.props.dash === "dashSet" && this.props.sets && this.props.sets.length > 0 ? this.props.sets.map((set, i) => {
                        return (
                            <div key={i} data-key={set.id} className={classes.set} onClick={(e) => { this.props.navigate(e) }}>
                                <h4 data-key={set.id}>{set.title}</h4>

                                <span data-key="delete" className={classes.deletebtn}><i onClick={()=>this.deleteSet(set.id)} data-key="delete" className="fas fa-times"></i></span>

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
        },
        deleteSet: (set) => {
            dispatch(deleteSet(set))
        },
        deleteBridge: (link) => {
            dispatch(deleteBridgeThunk(link))
        }
    }
}
export const DisplaySetModule = connect(null, mapDispatchToProps)(PureDisplaySetModule)