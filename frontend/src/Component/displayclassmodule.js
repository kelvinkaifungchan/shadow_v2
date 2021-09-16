import React from 'react';
import { connect } from 'react-redux'

import classes from './displayclassmodule.module.css'

class PureDisplayClassModule extends React.Component {
  
    render() {
        
        return (
            <>
            {/* <div className="row "> */}
                {this.props.classrooms.map((classroom, i) => {
                    return (
                        <div data-key={classroom.id} className={classes.classroom} onClick={(e=>{this.props.navigate(e)})}>
                            <h4 data-key={classroom.id}>{classroom.title}</h4>
                            <p data-key={classroom.id}>{classroom.description}</p>
                            <div data-key={classroom.id}>
                                {classroom.tag && classroom.tag.length > 0 ? classroom.tags.map((tag, j) => {
                                    return (
                                        <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                    )
                                }): null}
                            </div>
                        </div>
                    )
                })}
            {/* </div> */}
            </>

        );
    }
}


export const DisplayClassModule = connect(null, null)(PureDisplayClassModule)