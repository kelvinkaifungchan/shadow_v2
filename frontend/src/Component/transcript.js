import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/getdata/action'
import { Form } from 'reactstrap';


class PureTranscript extends React.Component {
    render(){
        return (
            <>
                <Form  className="p-3 w-100 h-100" as="textarea" placeholder="lmao wat?" name={this.props.title.title} >
                </Form>
            </>
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