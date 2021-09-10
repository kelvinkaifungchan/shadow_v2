import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetModule extends React.Component {

    render() {
        return (
            <div className="row  m-3">
                {/* Add button */}
                <div className="col-4 m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                    <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                        <i className="fas fa-plus" />
                    </div>
                    <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                        <span>
                            Add new or exist card
                        </span>

                    </div>
                </div>
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