import React, { Component } from 'react';
import './App.css';

import FriendList from './components/FriendList';
import FriendForm from './components/FriendForm';


import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lambdaFriends: [], 
      error: ''
      
      
    };
  }
  
  addAFriend = (e, newName, newAge, newEmail) => {
    e.preventDefault();
    const newFriend = {
      id: this.state.id,
      name: newName,
      age: newAge,
      email: newEmail
    }
    this.setState({
      lambdaFriends: [...this.state.lambdaFriends, newFriend],      
      name: '',
      age: '',
      email: ''  
    });            
} 

  componentDidMount() {
    console.log('CDM running');
    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      // console.log(res);
      this.setState({ lambdaFriends: res.data });
    })
    .catch(err => {
      // console.log(err);
      this.setState({ error: err });
    })
  }

  render() {
    return (
      <div className="App">
        <NavLink to='/friends'><button className='clickBtn'>Click to See Lambda Friends</button></NavLink>
        <NavLink to='/form'><button className='clickBtn'>Click to add Friend</button></NavLink>

        <Route path='/friends' exact
          render={
            props => <FriendList {...props} friendsArr={this.state.lambdaFriends} />
           }
        />

        <Route path='/form' exact
         render={
           props => <FriendForm {...props} friendsArr={this.state.lambdaFriends} addAFriend={this.addAFriend} value={this.state.newFriend}/> 
         }
        />
        
      </div>
    );
  }
}

export default App;
