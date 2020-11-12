import React from 'react'

function UserDashboardItem({usersName, usersJoinDate, usersEmail}) {
  return (
    <>
      <h3>{usersName}</h3>
      <p>Member since {usersJoinDate}</p>
      <p>email: {usersEmail}</p>
    </>
  )
}

export default UserDashboardItem;
