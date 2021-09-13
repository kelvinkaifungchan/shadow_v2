import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


class PureDisplayClassModule extends React.Component {
  
    render() {
        
        return (
            <>
                {/* {this.props.classrooms.map((classroom, i) => {
                    return (
                        <div data-key={classroom.id} className="col  m-1 p-3 border border-4 rounded-lg highlight " onClick={(e=>{this.props.navigate(e)})}>
                            <h4 data-key={classroom.id} className="p-3"><strong data-key={classroom.id}>{classroom.title}</strong></h4>
                            <p data-key={classroom.id} className="p-3">{classroom.description}</p>
                            <div data-key={classroom.id} className="d-flex justify-content-start p-3">
                                {classroom.tag && classroom.tag.length > 0 ? classroom.tags.map((tag, j) => {
                                    return (
                                        <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                    )
                                }): null}
                            </div>
                        </div>
                    )
                })} */}

            </>

        );
    }
}


export const DisplayClassModule = connect(null, null)(PureDisplayClassModule)