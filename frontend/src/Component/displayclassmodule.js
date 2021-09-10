import React from 'react';
import { connect } from 'react-redux'

import { AddnewPopUp } from '../Component/addnewmodal'

class PureDisplayClassModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        console.log('t')
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass(){
        console.log('ctc')
        this.setState({
            type: "class"
        })
    }
    render() {

        console.log("this.props.classroomsthis.props.classrooms", this.props.classrooms);
        return (
            <div className="row d-flex justify-content-between m-3">
                <AddnewPopUp create={this.state} toggle={() => this.toggle()}/>

                {/* Add button */}
                <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className="col-3 m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                    <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                        <i className="fas fa-plus" />
                    </div>
                    <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                        <span>
                            Add new or exist card
                        </span>
                        
                    </div>
                </div>
                {this.props.classrooms.map((classroom, i) => {
                    console.log(">>>>>>>>", classroom);
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{classroom.title}</strong></h4>
                            <p className="p-3">{classroom.description}</p>
                            <div className="d-flex justify-content-start p-3">
                                {classroom.tags.map((tag, j) => {
                                    return (
                                        <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}

            </div>

        );
    }
}


export const DisplayClassModule = connect(null, null)(PureDisplayClassModule)