import React, { Component } from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';
import moment from 'moment';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: moment().format('YYYY-MM-DD'),
      email: '',
      firstName: '',
      id: '',
      lastName: '',
      password: '',
      username: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { registerFunction } = this.props;
    const formData = this.state;
    registerFunction(formData);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <p>
            Want to get started reserving your flights?
            Create an account!
          </p>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <Label for="email">Email</Label>
              <AvInput
                id="email"
                name="email"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="something@techandfly.com"
                type="email"
                required
                value={this.state.email}
              />
              <AvFeedback>A valid email is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="password">Password</Label>
              <AvInput
                id="password"
                name="password"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                type="password"
                required
                value={this.state.password}
              />
              <AvFeedback>Password must be at least eigth characters length.</AvFeedback>
              <span>
                We recommend a password service like&nbsp;
                <a href="https://www.lastpass.com/" target="_blank" rel="noopener noreferrer">LastPass</a>
                &nbsp;or <a href="https://1password.com/" target="_blank" rel="noopener noreferrer">1Password</a>
              </span>
            </AvGroup>

            <AvGroup>
              <Label for="username">Username</Label>
              <AvInput
                id="username"
                name="username"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="CaptainCode"
                type="text"
                required
                value={this.state.username}
              />
              <AvFeedback>A username is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="id">Identification Number</Label>
              <AvInput
                id="id"
                name="id"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="123456"
                type="number"
                required
                min="0"
                value={this.state.id}
              />
              <AvFeedback>An Identification Number is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="firstName">First Name</Label>
              <AvInput
                id="firstName"
                name="firstName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Jamie"
                type="text"
                required
                value={this.state.firstName}
              />
              <AvFeedback>A first name is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="lastName">Last Name</Label>
              <AvInput
                id="lastName"
                name="lastName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Smith"
                type="text"
                required
                value={this.state.lastName}
              />
              <AvFeedback>A last name is required to register.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="birthday">Birthday</Label>
              <AvInput
                id="birthday"
                name="birthday"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                type="date"
                max={moment().format('YYYY-MM-DD')}
                required
                value={this.state.birthday}
              />
              <AvFeedback>The birthday is required to register.</AvFeedback>
            </AvGroup>

            <Button color="primary">Register</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
