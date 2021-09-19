import React from 'react'
import { connect } from 'react-redux'

class PureCreateQuiz extends React.Component{
    render(){
        return (
            <p>fuck</p>
        )
    }
}

export const CreatequizcardQuestion = connect(null, null)(PureCreateQuiz)
