import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <ul className='list-unstyled mt-3'>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <a
            href='/dashboard'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              className='las la-user-tie'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Students</span>
          </a>
        </li>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <a
            href='/candidates'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              className='las la-vote-yea'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Election</span>
          </a>
        </li>
        <li
          className='text-left'
          style={{ position: 'relative', padding: '10px' }}
        >
          <a
            href='/notifications'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <i
              className='las la-envelope'
              style={{ fontSize: '22px', marginRight: '15px' }}
            ></i>
            <span>Notifications</span>
          </a>
        </li>
      </ul>
    )
  }
}
export default Header
