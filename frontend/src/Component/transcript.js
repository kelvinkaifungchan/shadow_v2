import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk } from '../Redux/actions/action'
import { Form } from 'reactstrap'

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


const mapDispatchToProps  = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}

export const Transcript = connect (null, mapDispatchToProps)(PureTranscript)