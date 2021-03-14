import React, { Component } from "react";
import UserDataService from "../../services/users.service";

export default class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeSubunit = this.onChangeSubunit.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      name: "",
      code: "", 
      subunit: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    });
  }

  onChangeSubunit(e) {
    this.setState({
      subunit: e.target.value
    });
  }

  saveUser() {
    var data = {
      name: this.state.name,
      code: this.state.code,
      subunit: this.state.subunit
    };

    console.log(data);

    UserDataService.createUser(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          subunit: response.data.subunit,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      name: "",
      code: "",
      subunit: "",

      submitted: false
    });
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div>
              <label>Code</label>
              <input
                type="number"
                id="code"
                required
                value={this.state.code}
                onChange={this.onChangeCode}
                name="code"
              />
            </div>

            <div>
              <label>Subunit</label>
              <input
                type="text"
                id="subunit"
                required
                value={this.state.subunit}
                onChange={this.onChangeSubunit}
                name="subunit"
              />
            </div>

            <button onClick={this.saveUser}>
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}