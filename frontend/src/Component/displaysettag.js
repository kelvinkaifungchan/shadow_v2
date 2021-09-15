import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetTag extends React.Component {

    render() {
        console.log("SET TAG PROPS",this.props.sets);
        return (
            <>
                {this.props.sets.map((set, i) => {
                    return set.tags.map((tag)=>{
                        return (
                            <div data-key={i} className="col m-1 p-5 border border-4 rounded-lg highlight ">
                                <p>{tag.body}</p>
                            </div>
                        )
                    })
                    
                })}
            </>
        )

    }
}


export const DisplaySetTag = connect(null, null)(PureDisplaySetTag)