import React from 'react';
import { connect } from 'react-redux';
import { editGoal, addGoal } from '../actions/goals';

class GoalForm extends React.Component{
   constructor () {
       super()
       this.state = {
           editMode: false,
           title: "",
           multi_user: false, 
           deadline: "",
           friend: "",
           markers: [{title: '', notes: '', accomplished: false}]
       }   
   }
   
   componentDidMount(){
    //    console.log(this.props.current)
       if(this.props.location.pathname.includes('/dashboard/goals/edit/')){
        const { goal, comp, markers } = this.props.current
        const { title, multi_user, publicly_viewable, deadline } = goal
            this.setState({ 
            editMode: !this.state.editMode,
            title: title,
            multi_user: multi_user,
            publicly_viewable: publicly_viewable,
            deadline: deadline, 
            friend: comp[0].first_name,
            markers: markers
        })}
    }

    componentDidUpdate(prevProps){
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.setState({
                editMode: false,
                title: "",
                multi_user: false, 
                publicly_viewable: false, 
                deadline: "",
                friend: ""
            })
        }
    }

    handleInput = event =>{
        if(event.target.className !== 'marker'){
            this.setState({
            [event.target.name]: event.target.value
        })} else {
            let markers = [...this.state.markers]
            markers[event.target.dataset.id][event.target.name] = event.target.value
            console.log(this.state)
        }
    }

    handleChecks = event =>{
        if(event.target.name === 'multi_user'){
            this.setState({
                multi_user: !this.state.multi_user
            })
        }else if (event.target.name === 'publicly_viewable')
        this.setState({
            publicly_viewable: !this.state.publicly_viewable
        })
    }

    newMarker = (event) =>{
        event.preventDefault()
        this.setState({
            markers: [...this.state.markers, {title: '', notes: '', accomplished: false}]
        })
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <h2>Goal Form</h2>
                <form>
                    <input type='text' placeholder='Goal' name='title' onChange={this.handleInput} value={this.state.title}></input><br/>
                    <input type='date' name='deadline' onChange={this.handleInput} value={this.state.deadline}></input><br/>
                    <label>Multi-User?</label><input type='checkbox' name='multi_user' onChange={this.handleChecks} checked={this.state.multi_user}></input><br/>
                    <label>Private?</label><input type='checkbox' name='publicly_viewable' onChange={this.handleChecks} checked={!this.state.publicly_viewable}></input><br/>
                    {this.state.markers.map((marker, index) =>{
                        return (<div>
                            {marker.title !== '' ? <div key={index}><input type='checkbox' name='markers' checked={marker.accomplished}></input> <label>{marker.title}</label></div> : 
                            <input type='text' className='marker' name='title' placeholder='new marker' data-id={index} onChange={this.handleInput}></input>}
                        </div>)
                    })}
                    <button onClick={this.newMarker}>Add Marker</button>
                    <button type='submit'>{this.props.location.pathname === '/dashboard/goals/new_goal' ? 'Submit' : 'Update'}</button>
                </form>
            </div>
            )
        }
}

const mapStateToProps = (state) =>{
    return { current: state.currentGoal, userId: state.login.id }
}

const mapDispatchToProps = {
    editGoal, 
    addGoal
}

export default connect (mapStateToProps, mapDispatchToProps)(GoalForm)