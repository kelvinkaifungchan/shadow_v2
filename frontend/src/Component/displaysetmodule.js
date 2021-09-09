import React from 'react';
import { connect } from 'react-redux'


class PureDisplaySetModule extends React.Component {

    render() {
        console.log("this.props.sets",this.props.sets);
        return (
            this.props.sets.map((sets, i) => {
                return (
                    <div className="col m-1 p-5 border border-4 rounded-lg highlight ">
                        <h4><strong>{sets.title}</strong></h4>
                        <p>{sets.description}</p>
                    </div>
                )
            })

        )
    }
}


export const DisplaySetModule = connect(null, null)(PureDisplaySetModule)