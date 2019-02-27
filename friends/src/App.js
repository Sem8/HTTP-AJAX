import React, { Component } from 'react';
import './App.css';
import FriendList from './components/FriendList';

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

        <Route path='/friends' exact
          render={
            props => <FriendList {...props} friendsArr={this.state.lambdaFriends} />
           }
        />
        
      </div>
    );
  }
}

export default App;
