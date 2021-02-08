import React, { Component } from 'react';
import '../App.css';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {
                email: '',
                password: ''
            },
            serverError : null
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;

            case 'password':
                errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
                break;

            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    handleSubmit = (event) => {
        // username : eve.holt@reqres.in
        // passsword : cityslicka

        event.preventDefault();
        if (validateForm(this.state.errors)) {
            fetch('https://reqres.in/api/login',{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({ 'email' :this.state.email , 'password' : this.state.password})
            })
            .then(res=>res.json())
            .then(result => {
                console.log(result);
                if(result.error){
                    this.setState({'serverError' : result.error})
                }
                if(result.token){
                    this.props.history.push('/dashboard');
                }
            })

        } else {
            console.error('Invalid Form')
            this.state.serverError = "Invalid Form"
        }
    }



    render() {
        const { errors } = this.state;
        const serverError = this.state.serverError;
        return (
            <div className="App-header">
                <div className='form-wrapper'>
                    <h2>Login Account</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='info'>
                            <span className="error">{serverError}</span>
                        </div>
                        <div className='submit'>
                            <button>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;