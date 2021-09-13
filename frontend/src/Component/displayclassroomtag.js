import React from 'react';
import { connect } from 'react-redux'


class PureDisplayClassroomTag extends React.Component {

    render() {
        console.log("CLASSROOM TAG PROPS",this.props);
        return (
            <>
                {this.props.classrooms.tags.map((tag, i) => {
                    return (
                        <div data-key={i} className="col m-1 p-5 border border-4 rounded-lg highlight ">
                            <p>{tag[0].body}</p>
                        </div>
                    )
                })}
            </>
        )

    }
}


export const DisplayClassroomTag = connect(null, null)(PureDisplayClassroomTag)