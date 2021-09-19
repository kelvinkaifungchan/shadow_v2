import React from 'react';
import { connect } from 'react-redux'
// Require Action
import { getdataThunk } from '../Redux/actions/action'
import { logoutNowThunk } from '../Redux/actions/loginboxAction'

// Require Component
import { NavBar } from '../Component/navbar';
import { DisplayCardModule } from '../Component/displaycardmodule';
import { DisplaySetTag } from '../Component/displaysettag'

// Require Modal Component
import { NewTagPopUp } from '../Component/newtagmodal';
import { AddnewPopUp } from '../Component/addnewmodal'

// Require Css
import classes from './ViewSet.module.css'

class ViewSet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectModal: false,
            modal: false,
            type: "",
            tagModal: false,
            shareModal: false,
            correctflashCard: [],
            correctquizCard: [],
            correctdictationCard: [],
            correctTag: [],
            correctSet: this.props.sets.filter(set => set.id === parseInt(this.props.match.params.id))
        }
    }

    async componentDidMount() {
        await this.props.getdata( {email: localStorage.getItem('email')} )
    }

    async componentWillReceiveProps(nextProps) {
        console.log('Receive Props', nextProps)
        await this.setState({
            correctSet: this.props.sets.filter(set => set.id === parseInt(this.props.match.params.id))
        })
        // await this.getSet()
        if(this.state.correctSet[0] !== undefined){
            console.log("nextpropsss", nextProps);
            const correctFlashs = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctFlashs[0] !== undefined && correctFlashs[0].bridge_flashcard !== undefined) {
                if( correctFlashs[0].bridge_flashcard.length > 0){
                    let nextflash = correctFlashs[0].bridge_flashcard.map((changed) => {
                        const newestState = nextProps.cards.flashcard.filter(nFlashcard => nFlashcard.id === changed.flashcard_id)
                        return newestState[0]
                    });
                    if(nextflash[0] !== undefined){
                        this.setState({
                            correctflashCard: nextflash,
                        });
                    }
                }
            }
            const correctQuizs = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctQuizs[0] !== undefined && correctFlashs[0].bridge_quizcard !== undefined) {
                let nextquiz = correctQuizs[0].bridge_quizcard.map((changed) => {
                    const newestState = nextProps.cards.quizcard.filter(nQuizcard => nQuizcard.id === changed.quizcard_id)
                    return newestState[0]
                });
                if(nextquiz[0] !== undefined){
                    this.setState({
                    correctquizCard: nextquiz,
                });
            }
            }
            const correctDicts = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            if (correctDicts[0] !== undefined && correctFlashs[0].bridge_dictationcard !== undefined) {
                let nextdictation = correctDicts[0].bridge_dictationcard.map((changed) => {
                    const newestState = nextProps.cards.dictationcard.filter(nDictcard => nDictcard.id === changed.dictationcard_id)
                    return newestState[0]
                });
                if(nextdictation[0] !== undefined){
                    this.setState({
                    correctdictationCard: nextdictation,
                });
            }
            }
            const correctProps = nextProps.sets.filter(filter => filter.id === this.state.correctSet[0].id)
            console.log('this.state.correctSet[0].tags',correctProps)
            if(correctProps[0] !== undefined){
                this.setState({
                    correctTag: correctProps[0].tags,
                })
            }
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    tagToggle() {
        this.setState({
            tagModal: !this.state.tagModal
        })
    }

    shareToggle() {
        this.setState({
            shareModal: !this.state.shareModal
        })
    }


    selectToggle() {
        this.setState({
            selectModal: !this.state.selectModal,
        });
    }

    changeTypeSet() {
        this.setState({
            type: "set"
        })
    }

    navigateCard(e) {
        if (e.target.attributes["data-type"].value === "flashcard") {
            console.log('nav card func props', this.props.cards.flashcard)
            console.log('nav card func value', e.target.attributes["data-key"].value)
            this.props.history.push({
                pathname: `/viewflashcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "quizcard") {
            this.props.history.push({
                pathname: `/viewquizcard/${e.target.attributes["data-key"].value}`
            })
        } else if (e.target.attributes["data-type"].value === "dictationcard") {
            this.props.history.push({
                pathname: `/viewdictationcard/${e.target.attributes["data-key"].value}`

            })
        }

    }
    navigateNewFlashcard(e) {
        this.props.history.push({
            pathname: `/createflashcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    navigateNewQuizcard(e) {
        this.props.history.push({
            pathname: `/createquizcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    navigateNewDictationcard(e) {
        this.props.history.push({
            pathname: `/createdictationcard/${this.props.match.params.id}`,
            state: {
                set: this.state.correctSet
            }
        }
        )
    }

    getSet() {
        console.log("this.state in get SET func", this.state);
        this.setState({
            correctTag: this.state.correctSet[0].tags
        })
        if (this.state.correctSet[0].bridge_flashcard != null && this.state.correctSet[0].bridge_flashcard.length > 0) {
            const flash = this.state.correctSet[0].bridge_flashcard.map((flashCard) => {
                const newestState = this.props.cards.flashcard.filter(card => card.id === flashCard.flashcard_id)
                return newestState[0]
            });
            this.setState({
                correctflashCard: flash
            })
        } else {
            return null
        }
        if (this.state.correctSet[0].bridge_quizcard != null) {
            const quiz = this.state.correctSet[0].bridge_quizcard.map((quizCard) => {
                const newestState = this.props.cards.quizcard.filter(card => card.id === quizCard.quizcard_id)
                return newestState[0]
            });
            this.setState({
                correctquizCard: quiz
            })
        } else {
            return null
        }
        if (this.state.correctSet[0].bridge_dictationcard != null) {
            const dictation = this.state.correctSet[0].bridge_dictationcard.map((dictationCard) => {
                const newestState = this.props.cards.dictationcard.filter(card => card.id === dictationCard.dictationcard_id)
                return newestState[0]
            });
            this.setState({
                correctdictationCard: dictation
            })
        } else {
            return null
        }
    }
    render() {
        console.log("View Set the props", this.props);
        console.log("View Set the STTTTTATE", this.state);

        return (
            <div>
                <NavBar set={() => this.getSet()} user={this.props.user} history={this.props.history} />

                <div className={classes.viewset}>
                    <div classNmae="row d-flex p-4">
                        <div className="col-8">
                            <h1>{this.state.correctSet.length > 0 ? this.state.correctSet[0].title : null}</h1>
                            <h6>{this.state.correctSet.length > 0 ? this.state.correctSet[0].description : null}</h6>
                        </div>
                    </div>


                    <div className="row d-flex pl-4 pr-4 m-2">

                        <DisplaySetTag tags={this.state.correctTag} />
                        <NewTagPopUp addTag={this.state} location={this.state.correctSet[0]} toggle={() => this.tagToggle()} />
                        <span className="d-inline-flex ">
                            <button onClick={() => { this.tagToggle(); this.changeTypeSet() }} className={classes.addtagbutton}><i className="fas fa-plus"></i></button>
                        </span>
                    </div>

                    <div className="row d-flex m-3">
                        <AddnewPopUp 
                        match={this.props.match} 
                        create={this.state} 
                        allCard={this.props.cards} 
                        navigateNewFlashcard={(e) => { this.navigateNewFlashcard(e) }} 
                        navigateNewQuizcard={(e) => { this.navigateNewQuizcard(e) }} 
                        navigateNewDictationcard={(e) => { this.navigateNewDictationcard(e) }} 
                        toggle={() => this.toggle()} />
                        
                        <div onClick={() => { this.changeTypeSet(); this.toggle(); }} className={classes.card}>
                            <div className={classes.addbtn}>
                                <i className="fas fa-plus" />
                            </div>
                            <div className="m-2 p-4 rounded-lg d-flex align-items-center">
                                <span>Add new or exist card</span>
                            </div>
                        </div>

                        <DisplayCardModule view={this.state} correctSet={this.state.correctSet} set={this.props.sets} navigate={(e) => this.navigateCard(e)} />
                    </div>
                </div>
            </div>
        );
    }
}
    const mapStateToProps = (state) => {

        return {
            email: state.authStore.email,
            user: state.userStore.user,
            classrooms: state.classroomStore.classrooms,
            sets: state.setStore.sets,
            cards: state.cardStore.card,
            tags: state.tagStore.tags,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            getdata: (email) => {
                dispatch(getdataThunk(email))
            },
            logout: () => {
                dispatch(logoutNowThunk())
            }
        }
    }

    const connectedViewSet = connect(mapStateToProps, mapDispatchToProps)(ViewSet)
export { connectedViewSet as ViewSet };