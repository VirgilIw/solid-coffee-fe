import React from 'react'
import InserUser from './InserUser'
import UserListContent from './UserListContent'

function UserlistMenu() {
  return (
    <div className='p-5'>
      <p>userlist</p>
      <UserListHero/>
      <InserUser/>
    </div>
  )
}

export default UserlistMenu
