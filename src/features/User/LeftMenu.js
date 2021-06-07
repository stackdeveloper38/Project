import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
class Header extends Component {
  render () {
    return (
      <ul className='list-unstyled mt-3'>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <Link
            to='/dashboard'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              class='las la-user-tie'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Students</span>
          </Link>
        </li>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <Link
            to='/elections'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              class='las la-vote-yea'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Election</span>
          </Link>
        </li>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <Link
            to='/notifications'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              class='las la-envelope'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Notifications</span>
          </Link>
        </li>
      </ul>
    )
  }
}
export default Header
