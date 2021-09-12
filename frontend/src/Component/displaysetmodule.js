import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetModule extends React.Component {

    render() {
        return (
            <div className="row ">
                {this.props.sets.map((set, i) => {
                    return (
                        <div data-key={set.id} className="col-4 m-1 p-5 border border-4 rounded-lg highlight " onClick={(e)=>{this.props.navigate(e)}}>
                            <h4 data-key={set.id}><strong>{set.title}</strong></h4>
                            <p data-key={set.id}>{set.description}</p>
                        </div>
                    )
                })}

            </div>
        )

    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)