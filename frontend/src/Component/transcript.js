import React from 'react';
import { connect } from 'react-redux'
import {getdataThunk} from '../Redux/getdata/action'

class PureTranscript extends React.Component {
    render(){
        return (
            <div>
                <input>
                </input>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state in dashboard",state);

    return {
        dataMSP: state.dataStore.data
    }
}
const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const Transcript = connect (mapStateToProps, mapDispatchToProps)(PureTranscript)