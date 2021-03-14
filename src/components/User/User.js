import React, { Component } from "react";
import UserDataService from "../../services/users.service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeSubunit = this.onChangeSubunit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        code: "",
        subunit: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name
        }
      };
    });
  }

  onChangeCode(e) {
    const code = e.target.value;
    
    this.setState(prevState => ({
        currentUser: {
        ...prevState.currentUser,
        code: code
      }
    }));
  }

  onChangeSubunit(e) {
    const subunit = e.target.value;
    
    this.setState(prevState => ({
        currentUser: {
        ...prevState.currentUser,
        subunit: subunit
      }
    }));
  }

  getUser(id) {
    UserDataService.getUserBy(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.getUpdateUser(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/userlist')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="editor">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="title"
                  value={currentUser.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subunit">Subunit</label>
                <input
                  type="text"
                  className="form-control"
                  id="subunit"
                  value={currentUser.subunit}
                  onChange={this.onChangeSubunit}
                />
              </div>
              <div className="form-group">
                <label htmlFor="code">Code</label>
                <input
                  type="text"
                  id="code"
                  value={currentUser.code}
                  onChange={this.onChangeCode}
                />
              </div>
            </form>

            <button
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Error: User Not Found</p>
          </div>
        )}
      </div>
    );
  }
}
