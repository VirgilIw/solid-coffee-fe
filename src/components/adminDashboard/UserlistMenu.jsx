import React from 'react'
import UserListHero from './UserListHero'
import UserListContent from './UserListContent'

function UserlistMenu() {
  return (
    <div className='p-5'>
      <p>userlist</p>
      <UserListHero/>
      <UserListContent/>
    </div>
  )
}

export default UserlistMenu
