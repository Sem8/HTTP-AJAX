import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { Route } from 'react-router-dom';



export default function FriendList(props) {
  return (
    <div className='lambdaFriendsDiv'>
    {props.friendsArr.map(allFriends => (
        <div key={allFriends.id} className='eachFriendCard'>
            <h2>{allFriends.name}</h2>
            <h3>{allFriends.age}</h3>
            <p>{allFriends.email}</p>
            <button onClick={(e => props.deleteName(e, allFriends.id))}>Delete</button>
        </div>
    ))}      
    </div>
  )
}
