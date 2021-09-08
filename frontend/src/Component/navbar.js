import React from 'react';
import { connect } from 'react-redux'
import { getdataThunk} from "../Redux/getdata/action"


class PureNavBar extends React.Component {
    componentDidMount() {
        this.props.listDataMDP("test@test.com")
      }
    render() {
        console.log("this.props>>>>>>>>>>>",this.props);
        return (
            <div className=" p-3 d-flex  justify-content-between" id="navbar">
                <div>
                    <h2>shadow</h2>
                </div>
                <div>
                   <span>{this.props.classroom}<i className="fas fa-bars"></i></span> 
                </div>
                <div>
                    <i className="fas fa-search"></i>
                    <img src="" alt="Avatar" className="avatar-sm"></img>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("this is state;", state);
    return {
        data: state.dataStore.data
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
      listDataMDP: (email)=> dispatch(getdataThunk(email))
    }
}

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(PureNavBar)