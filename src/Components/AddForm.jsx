import React, { useState } from 'react'


const AddForm = props => {
    const initialFormState = { id: null, name: '', year: '' }
    const [user, setUser] = useState(initialFormState)
    console.log("props",props);

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <form onSubmit={event => {
            event.preventDefault()
            if (!user.name || !user.year) return
        
            props.addUser(user)
            setUser(initialFormState)
          }}
          >
            
            <input className="inputMargin" type="text" placeholder="Enter Name Here" name="name" value={user.name} onChange={handleInputChange} />
            
            <input className="inputMargin" type="text" placeholder="Enter Year Here" name="year" value={user.year} onChange={handleInputChange} />
            
            <button className="button muted-button">Add new user</button>
        </form>
    )
}

export default AddForm;