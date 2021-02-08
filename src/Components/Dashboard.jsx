import React, { Component } from 'react';
import UserTabel from './UserTabel';
import AddForm from './AddForm';

class Dashboard extends Component {

    state = {
        listUsers: [],
        id: null,
        name: null,
        year: null,
        edit: false
    }

    componentDidMount() {
        this.renderDynamicList(1);
    }
    addUser = (event) => {
        let eventObject = this.state.listUsers[this.state.listUsers.length - 1]
        event.id = eventObject.id + 1;
        let object = { "id": event.id, "name": event.name, "year": event.year };
        let array = [...this.state.listUsers];
        array.push(object);
        this.setState({ listUsers: array });
    }

    deleteUser = (event) => {
        let arrayFilter = this.state.listUsers.filter(ele => {
            return ele.id !== event
        })
        this.setState({ listUsers: arrayFilter });
    }

    editUserFromList = (event) => {
        this.setState({ "id": event.id, "name": event.name, "year": event.year, "edit": true });
    }

    onUpdateHandle = (event) => {
        event.preventDefault();
        let array = [...this.state.listUsers];
        let updatedArray = array.map(item => {
            if (this.state.id === item.id) {
                item.name = this.state.name;
                item.year = this.state.year

            }
            return item;
        });
        this.setState({ listUsers: updatedArray });
        console.log(updatedArray);
    }

    onChangeUpdate = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    editUserForm = () => {
        if (this.state.edit) {
            return <form onSubmit={this.onUpdateHandle.bind(this)}> <input className="inputMargin" type="text" name="name" defaultValue={this.state.name} onChange={this.onChangeUpdate} /> <input className="inputMargin" type="text" name="year" defaultValue={this.state.year} onChange={this.onChangeUpdate} /> <button className="button muted-button">Update</button></form>
        }
    }
    pageChange = (value) =>{    
        console.log("=======", value);
        this.renderDynamicList(2);
    } 
    renderDynamicList= (page) =>{
        console.log("page====",page);
        fetch('https://reqres.in/api/users?page='+page)
        .then(res => res.json())
        .then(list => {
            console.log(list.data)
            this.setState({ 'listUsers': list.data })
        })
    }

    
    render() {
        const users = this.state.listUsers;
        return (
            <div className="App-header">
                <div className="container">
                    <h1>CRUD App Demo</h1>
                    <div className="flex-row">
                        <div className="flex-large">
                            <h2>Add user</h2>
                            <AddForm addUser={this.addUser} />
                        </div>
                        <div className="flex-large">
                            {/* <h2>Add user</h2>
                            <AddForm user={users} editUser={this.editUser} /> */}
                            {this.editUserForm()}
                        </div>
                        <hr />
                        <div className="flex-large">
                            <h2>View users</h2>
                            <UserTabel users={users} deleteUser={this.deleteUser} editUser={this.editUserFromList} />
                        </div>
                        <div className="flex-large">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item" onClick={()=>this.pageChange(1)}><a className="page-link active" >1</a></li>
                                    <li className="page-item" onClick={()=>this.pageChange(2)}><a className="page-link1">2</a></li>
                                    <li className="page-item" onClick={()=>this.pageChange(3)}><a className="page-link1">3</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;