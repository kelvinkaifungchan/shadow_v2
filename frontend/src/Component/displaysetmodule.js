import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetModule extends React.Component {

    render() {
        return (
            <div className="row ">
                {this.props.sets.map((sets, i) => {
                    return (
                        <div key={i} className="col-4 m-1 p-5 border border-4 rounded-lg highlight ">
                            <h4><strong>{sets.title}</strong></h4>
                            <p>{sets.description}</p>
                        </div>
                    )
                })}

            </div>
        )

    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)