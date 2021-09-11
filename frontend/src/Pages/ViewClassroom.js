import React from 'react';
import { connect } from 'react-redux'


import { NavBar } from '../Component/navbar';
// import HeadingInput from '../Component/headingInput';
// import Tags from '../Component/tags';
// import Users from '../Component/users';
import { DisplaySetModule } from '../Component/displaysetmodule'

import { AddnewPopUp } from '../Component/addnewmodal'



class ViewClassroom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            type: ""
        };
    }
    toggle() {
        console.log('t')
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        console.log('ctc')
        this.setState({
            type: "class"
        })
    }

    render() {
        console.log("i want to see the props", this.props);

        return (
            <div>
                <NavBar />

                <div className="row">
                    <div className="col col-12">
                        {/* <HeadingInput/> */}
                        <p>HeadingInput</p>
                        {/* <Tags/> */}
                        <p>Tags</p>
                        {/* <Users/> */}
                        <p>Users</p>
                    </div>
                </div>
                <div className="p-3">

                    {/* Add button */}
                    <div className="row d-flex justify-content-between m-3">

                        <AddnewPopUp create={this.state} toggle={() => this.toggle()} />
                        <div onClick={() => { this.changeTypeClass(); this.toggle(); }} className="col-3 m-1 p-1 border border-4 rounded-lg d-inline-flex ">
                            <div className="col-4 m-1 p-1 d-flex justify-content-center align-items-center">
                                <i className="fas fa-plus" />
                            </div>
                            <div className="col-6 m-1 p-1 rounded-lg d-flex align-items-center">
                                <span>Add new or exist set</span>
                            </div>
                        </div>
                        <DisplaySetModule sets={this.props.sets} />

                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        sets: state.setStore.set,
    }
}


const connectedViewClassroom = connect(mapStateToProps, null)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };