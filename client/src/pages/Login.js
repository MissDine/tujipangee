import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
axios.post('/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
redirect = () => {
    this.props.history.push('/')
  }
handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };

  render() {
    const { username, email, password } = this.state
    return (
      <div className="w-50 mx-auto">
        <h1 className="text-black text-center py-10">Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            placeholder="username"
            type="text"
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            required
            placeholder="email"
            type="text"
            name="email"
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={email}
            onChange={this.handleChange}
          />
          <input
            required
            placeholder="password"
            type="password"
            name="password"
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            <Link to="/home"><h2 className="mb-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Login
            </h2></Link>
          </button>
          <div className="pb-6">
            or <Link to="/signup" className="text-orange-600">sign up</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;