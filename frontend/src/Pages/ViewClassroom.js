import React from 'react';
import { connect } from 'react-redux'

import { getdataThunk } from '../Redux/actions/action'

import { NavBar } from '../Component/navbar';
import { HeadingInput } from '../Component/headinginput';
// import Tags from '../Component/tags';
import { NewSharePopUp } from '../Component/sharemodal';
import { NewTagPopUp } from '../Component/newtagmodal';
// import Users from '../Component/users';
import { DisplaySetModule } from '../Component/displaysetmodule'

import { AddnewPopUp } from '../Component/addnewmodal'



class ViewClassroom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: JSON.parse(window.localStorage.getItem('email')),
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            // classroom: this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.location.state.classroom)),
            classroomTitle: "",
            classroomDesc: "",
        };
    }

    componentDidMount (){
        this.props.getdata({ email: JSON.parse(localStorage.getItem('email')) }) 
    }

    handleHeading(title){
        this.setState({
            classroomTitle: title
        })
    }
    
    componentDidMount() {
        console.log("this page is rerendering")
    }

    handleTranscript(desc){
        this.setState({
            classroomDesc: desc
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    changeTypeClass() {
        this.setState({
            type: "class"
        })
    }

    tagToggle(){
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle(){
        console.log('share tog')
        this.setState({
            shareModal: !this.state.shareModal
        })
    }
    navigateSet(e){
        this.props.history.push({
            pathname:`/viewset`,
            state: { set:e.target.attributes["data-key"].value }
        })
    }
    logout = (e) => {
        e.preventDefault();
        this.props.logout()
    }

    render() {
<<<<<<< HEAD
=======
        console.log("props of view classroom", this.props)
        console.log("state of view classroom", this.state)
        // if(this.props.classrooms == []){
        //     console.log("I AM HEREEEEEE");
        //     this.props.getdata({ email: JSON.parse(localStorage.getItem('email')) }) 
        // }
 
>>>>>>> cb40fb9334f5a0c6dc56d5383d1bf354cb5e508e
        return (
            <div>
                <NavBar history={this.props.history}/>
                <div className="row">
                    <div className="col col-12">
                        <HeadingInput card={this.state} heading={this.props.location.state.classroom} handleHeading={this.handleHeading}/>
                        <div className="row">
                            <div className="col col-3">
                                <div>
                                    <div className="d-inline-flex align-item-center h-50 pt-2">
                                        {this.props.location.state.classroom.tags && this.props.location.state.classroom.tags.length > 0 ? this.props.location.state.classroom.tags.map((tag, j) => {
                                            return (
                                                <span key={j} className="pl-3 pr-3 p-1 rounded-pill bg-dark text-light">#{tag.body}</span>
                                            )
                                        }): null}
                                    </div>
                                </div>
                            </div>
                            <div className="col col-2 d-inline-flex align-item-center h-50 pt-2">
                                <NewTagPopUp addTag={this.state} toggle={() => this.tagToggle()}/>
                                <span className="d-inline-flex "><span onClick={() => this.tagToggle()} className="btn rounded-pill border border-warning"><i className="fas fa-plus"></i></span></span>
                            </div>
                        </div>
                        <NewSharePopUp share={this.state} toggle={() => this.shareToggle()}/>
                        <span className="d-inline-flex "><h2 className="p-2 m-0">share</h2><span onClick={() => this.shareToggle()} className="btn rounded-pill border border-warning p-2"><i className="fas fa-plus"></i></span></span>
                        
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
                        <DisplaySetModule sets={this.props.sets} navigate={(e)=>this.navigateSet(e)} />

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log('state in vclass', state)

    return {
        tags:state.setStore.tags,
        sets: state.setStore.sets,
        classrooms: state.classroomStore.classrooms,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getdata: (email) => {
            dispatch(getdataThunk(email))
        }
    }
}
const connectedViewClassroom = connect(mapStateToProps, mapDispatchToProps)(ViewClassroom)
export { connectedViewClassroom as ViewClassroom };

    // componentDidMount(){
    //     console.log('cmpn did muntmuntmuntmuntmuntmuntmuntmuntmunt')
    //     this.props.getdata({ email: "test@test.com" })
    //     this.setState({
    //         classroom: this.props.classrooms.filter(classroom => classroom.id === parseInt(this.props.match.params.id))
    //     })
    // }
    // componentWillReceiveProps (nextProps){
    //     console.log('CWRP', nextProps)
    //     this.setState({
    //         classroom: nextProps.classrooms.filter(classroom => classroom.id === parseInt(nextProps.match.params.id))
    //     })
    // }
    // static getDerivedStateFromProps (nextProps, prevState) {
    //     console.log('next props', nextProps)
    //     console.log('prev state', prevState)
    //     // nextProps.classrooms = prevState
    //     const classroom = nextProps.classrooms
    //     console.log(classroom)
    //     // update your internal state that depends on the props
    //     // const internalState = nextProps.something
    //     // this.setState({internalState}
    //   }