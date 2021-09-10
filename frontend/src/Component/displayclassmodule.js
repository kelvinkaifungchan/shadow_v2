import React from 'react';
import { connect } from 'react-redux'


class PureDisplayClassModule extends React.Component {

    render() {

        console.log("this.props.classroomsthis.props.classrooms", this.props.classrooms);
        return (
            <div className="row d-flex justify-content-between m-3">

                {this.props.classrooms.map((classroom, i) => {
                    console.log(">>>>>>>>", classroom);
                    return (
                        <div key={i} className="col  m-1 p-3 border border-4 rounded-lg highlight ">
                            <h4 className="p-3"><strong>{classroom.title}</strong></h4>
                            <p className="p-3">{classroom.description}</p>
                            <div className="d-flex justify-content-start p-3">
                                {classroom.tags.map((tag, j ) => {
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