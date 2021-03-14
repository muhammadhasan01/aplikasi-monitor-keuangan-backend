import React, { Component } from "react";
import UserDataService from "../../services/users.service";
import { Link } from "react-router-dom";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);

    this.state = {
      Users: [],
      currentUser: null,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    UserDataService.getUsers()
      .then(response => {
        this.setState({
          Users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
    });
  }

  setActiveUser(user) {
    this.setState({
      currentUser: user
    });
  }

  render() {
    const { Users, currentUser } = this.state;

    return (
      <div>
        <div id="UserList">
          <h4>Users List</h4>
          <ul>
            {Users &&
              Users.map((user, index) => (
                <li
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.name}
                  {" - "}
                  {user.subunit}
                </li>
              ))}
          </ul>
        </div>
        <div>
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.name}
              </div>
              <div>
                <label>
                  <strong>Subunit:</strong>
                </label>{" "}
                {currentUser.subunit}
              </div>
              <div>
                <label>
                  <strong>Code:</strong>
                </label>{" "}
                {currentUser.code}
              </div>
              <Link
                to={"/users/" + currentUser._id}              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a User</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}