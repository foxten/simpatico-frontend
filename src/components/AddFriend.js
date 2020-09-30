import React from 'react';
import { connect } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import FriendCard from '../components/FriendCard';

// style idea: include little search icon in search bar

class AddFriend extends React.Component {
    constructor(){
        super();
        this.state = {
            allUsers: [],
            searchTerm: ''
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/users')
            .then(response => response.json())
                .then(data => {
                    let allOtherUsers = data.filter(dataInfo => dataInfo.id !== this.props.user.id)
                    for (let i = 0; i < this.props.friends.length; i++){
                        allOtherUsers = allOtherUsers.filter(user => user.id !== this.props.friends[i].id)
                    }
                    this.setState({
                        allUsers: allOtherUsers
                    })
                })
            }
            
            handleSearch = event =>{
                this.setState({
                    [event.target.name]: event.target.value
                })
            }
            

    render () {
        console.log(this.state)
        const filteredUsers = this.state.allUsers.filter(user => user.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

        return (
        <div>
             <Row className="justify-content-md-center">
                <form>
                    <input type='text' name='searchTerm' value={this.state.searchTerm} onChange={this.handleSearch}></input>
                </form>
            </Row>
            <Row sm={3}> 
            {filteredUsers.map((user, index) =>{
                return <FriendCard key={index} location={this.props.location} info={user}/>        
                })}
            </Row>
        </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return { user: state.login, friends: state.friends }
}



export default connect(mapStateToProps, null)(AddFriend)