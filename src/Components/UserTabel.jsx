import React from 'react';

const UserTabel = props => (

    <table className='tableWidth'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.year}</td>
              <td>
                <button className="button muted-button" onClick={()=>{props.editUser(user)}}>Edit</button>
                <button className="button muted-button" onClick={()=> props.deleteUser(user.id)}> Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  )
  export default UserTabel
