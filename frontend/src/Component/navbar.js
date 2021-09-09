import React from 'react';
import { connect } from 'react-redux'
// import {getdataThunk} from '../Redux/getdata/action'


class PureNavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: this.props.data

        }
    }
    componentDidMount(){

    }
    render() {
        console.log("this.props in navbar >>>>>>>>>>>", this.state)

        return (
            <div className=" p-3 d-flex  justify-content-between" id="navbar">
                 <div className=" p-3 d-inline-flex">
                    <h2>shadow</h2>
                </div>
            
                <div className=" p-3 d-inline-flex">
                    <span>{this.props.classroom}<i className="fas fa-bars"></i></span>
                </div>
                <div className=" p-3 d-inline-flex">
                    <span><i className="m-2 fas fa-search"></i></span>
                    <span ><img id="picture" src={this.props} alt="Avatar" className="avatar-sm"></img></span>
                </div>

            </div>

        );
    }
}


// const mapStateToProps = (state) => {
//     console.log("state in dashboard",state);

//     return {
//         dataMSP: state.dataStore.data
//     }
// }
// const mapDispatchToProps  = dispatch => {
//     return {
//         getdata: (email) => {
//             dispatch(getdataThunk(email))
//         }
//     }
// }


export const NavBar = connect(null, null)(PureNavBar)