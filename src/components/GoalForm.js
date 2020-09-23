import React from 'react';
import { connect } from 'react-redux';
import { editGoal, addGoal } from '../actions/goals';
import { filteringGoal } from '../actions/currentGoal';

// FETCH REQUESTS - POST and PATCH

class GoalForm extends React.Component{
   constructor () {
       super()
       this.state = {
           editMode: false,
           title: "",
           multi_user: false, 
           markerChange: false,
           publicly_viewable: false, 
           deadline: "",
           friend: "",
           markers: []
       }   
   }
   
    componentDidMount(){
       if(this.props.location.pathname.includes('/dashboard/goals/edit/')){
        const { goal, comp, markers } = this.props.current
        const { title, multi_user, publicly_viewable, deadline } = goal
        let friend_info =  comp.length > 0 ? comp[0].first_name : ""

            this.setState({ 
            editMode: !this.state.editMode,
            title: title,
            multi_user: multi_user,
            markerChange: false,
            publicly_viewable: publicly_viewable,
            deadline: deadline, 
            friend: friend_info,
            markers: markers
        })}
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.setState({
                editMode: false,
                title: "",
                multi_user: false, 
                markerChange: false,
                publicly_viewable: false, 
                deadline: "",
                friend: "",
                markers: []
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
            this.setState({
                markers,
                markerChange: !this.state.markerChange
            })
        }
    }

    handleChecks = event =>{
        // refactor
        if(event.target.name === 'multi_user'){
            this.setState({
                multi_user: !this.state.multi_user
            })
        }else if (event.target.name === 'publicly_viewable'){
            this.setState({
                publicly_viewable: !this.state.publicly_viewable
            })
        }else if (event.target.name === 'accomplished'){
            let markers = [...this.state.markers]
            markers[event.target.dataset.id][event.target.name] = !markers[event.target.dataset.id][event.target.name]
            this.setState({
                markers
            })
        }
    }

    newMarker = (event) =>{
        event.preventDefault()
        if(this.props.location.pathname.includes('/dashboard/goals/edit/')){
            this.setState({
                markers: [...this.state.markers, {title: '', notes: '', accomplished: false, user_group_goal_id: this.props.current.ugg_id, status: 'new'}]
            })
        } else {
            this.setState({
                markers: [...this.state.markers, {title: '', notes: '', accomplished: false, status: 'new'}]
            })
        }
    }
    
    handleSubmit = (event) =>{
        event.preventDefault()
        const token = localStorage.getItem('userToken')
        let newMarkers = this.state.markers.filter(marker => marker.status === 'new' && marker.title !== '')
        let existingMarkers = this.state.markers.filter(marker => marker.status !== 'new')


        if(event.target.name === 'Submit'){
            delete this.state['editMode']
            // console.log (this.state)
            // fetch to submit new goal
            // backend should automatically create a new UGG with appropriate IDs
            // should then use dispatch action addGoal to add to state
            // will need to grab ugg_id (for this user's entry) from newly created goal and add it to each marker
            // should then send fetch request to create markers on backend
            // if multi-user, send patch request to user_group_goals to create second record
            const reqObj = {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: this.state.title,
                    deadline: this.state.deadline,
                    multi_user: this.state.multi_user,
                    publicly_viewable: this.state.publicly_viewable
                })
            }

            fetch('http://localhost:3000/goals', reqObj)
            .then(response => response.json())
            .then(data => {
                console.log(newMarkers)
                Promise.all(newMarkers.map(marker => {
                    delete marker['status']
                    marker['user_group_goal_id'] = data.goal[0].ugg_id
                    
                    fetch('http://localhost:3000/markers', {
                        method: 'POST', 
                        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                        body: JSON.stringify(marker)
                    })
                    .then(response => response.json())
                    .then(marker =>{
                        this.props.addGoal(data.goal[0])
                        this.props.filteringGoal(data.goal[0])
                        this.props.current.markers.push(marker)
                        this.props.history.push(`/dashboard/goals/view/${this.props.current.id}`)
                    })
                    }))
            })
            
            
        } else if (event.target.name === 'Update'){
                const reqObj = {
                    method: 'PATCH',
                    headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        title: this.state.title,
                        multi_user: this.state.multi_user, 
                        publicly_viewable: this.state.publicly_viewable, 
                        deadline: this.state.deadline})
                }

            fetch(`http://localhost:3000/goals/${this.props.current.goal.id}`, reqObj)
                .then(response => console.log(response.json()))

            if(this.state.markerChange === true){
                
                Promise.all((newMarkers.map(marker => {
                    delete marker['status']
                    const reqObj = {
                        method: 'POST',
                        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                        body: JSON.stringify(marker)
                    }
                    
                    fetch('http://localhost:3000/markers', reqObj)
                        .then(response => response.json)
                            .then(
                                this.setState({markerChange: !this.state.markerChange}),
                                this.props.editGoal(this.props.current),
                                this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                            ) 
                })),
                    existingMarkers.map(markerData =>{
                        const idInfo = markerData.id
                        delete markerData['id']
                        delete markerData['created_at']
                        delete markerData['updated_at']
                        const reqObj = {
                            method: 'PATCH',
                            headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                            body: JSON.stringify(markerData)
                        }

                        fetch(`http://localhost:3000/markers/${idInfo}`, reqObj)
                            .then(response => response.json)
                            .then(
                                this.setState({markerChange: !this.state.markerChange}),
                                this.props.editGoal(this.props.current),
                                this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                            ) 
                    })
                )
            }
        
        }
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <h2>Goal Form</h2>
                <form name={this.props.location.pathname === '/dashboard/new_goal' ? 'Submit' : 'Update'} onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Goal' name='title' onChange={this.handleInput} value={this.state.title}></input><br/>
                    <input type='date' name='deadline' onChange={this.handleInput} value={this.state.deadline}></input><br/>
                    <label>Multi-User?</label><input type='checkbox' name='multi_user' onChange={this.handleChecks} checked={this.state.multi_user}></input><br/>
                    
                    {this.state.multi_user === true ? 
                        <div><select>
                        {this.props.friends.map(friend => {
                            return <option value={friend.id}>{friend.first_name}</option>
                        })}
                        </select></div> : null }
                    
                    <label>Private?</label><input type='checkbox' name='publicly_viewable' onChange={this.handleChecks} checked={!this.state.publicly_viewable}></input><br/>
                    {this.state.markers.map((marker, index) =>{
                        return (<div key={index}>
                            {marker.title !== '' ? <input type='checkbox' name='accomplished' data-id={index} checked={marker.accomplished} onChange={this.handleChecks} disabled={marker.accomplished === true? true : false}></input> : null }
                            {marker.accomplished === true ? <label>{marker.title}</label> : <input type='text' className='marker' name='title' data-id={index} onChange={this.handleInput} value={marker.title}></input>}
                        </div>)
                    })}
                    <button onClick={this.newMarker}>Add Marker</button>
                    {this.state.markers.length > 0  && this.state.markers[0].title !== '' ? 
                    <button type='submit'>{this.props.location.pathname === '/dashboard/new_goal' ? 'Submit' : 'Update'}</button> :
                    null}
                </form>
            </div>
            )
        }
}

const mapStateToProps = (state) =>{
    return { current: state.currentGoal, userId: state.login.id, friends: state.friends }
}

const mapDispatchToProps = {
    editGoal, 
    addGoal,
    filteringGoal
}

export default connect (mapStateToProps, mapDispatchToProps)(GoalForm)