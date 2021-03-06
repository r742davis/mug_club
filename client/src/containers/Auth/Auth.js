import React from "react";
import classes from "./Auth.module.css";
import Register from "../../components/Auth/Register/Register";
import LoginComponent from "../../components/Auth/Login/LoginComponent";
import PasswordReset from "../../components/Auth/Password/ResetPassword/PasswordReset";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  login,
  register,
  sendReset,
  clearErrors,
} from "../../store/actions/index";

class Auth extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    message: null,
    success: null,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error !== prevProps.error) {
      //Check for login/register error
      if (
        error.id === "LOGIN_FAIL" ||
        error.id === "REGISTER_FAIL" ||
        error.id === "RESET_PASSWORD_FAIL"
      ) {
        this.setState({ message: error.message.message });
      } else {
        this.setState({ message: null });
      }
    }
    if (success !== prevProps.success) {
      if (success.origin === "REGISTER") {
        this.setState({ success: success.message });
        console.log(success.message);
      } else {
        this.setState({ success: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
    this.props.clearErrors();
  };

  onSubmitReg = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password,
    };
    const message = "User Successfully Created! Please Login";
    this.props.register(newUser, message);
    this.props.clearErrors();
  };

  onSubmitReset = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.props.sendReset(email);
    console.log(email);
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { registerOpen, passwordResetOpen } = this.props.auth;
    return (
      <div>
        {isAuthenticated && <Redirect to="/search-customers" />}
        {!isAuthenticated && (
          <section className={classes.Container}>
            <div className={classes.Title}>
              <h2>Welcome to</h2>
              <h1>
                Mug Club{" "}
                <span role="img" aria-label="Beers clinking together">
                  🍻
                </span>
              </h1>
            </div>
            {!registerOpen && !passwordResetOpen && (
              <LoginComponent
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                error={this.state.message}
                success={this.state.success}
              />
            )}

            {registerOpen && (
              <Register
                onSubmit={this.onSubmitReg}
                onChange={this.onChange}
                error={this.state.message}
                success={this.state.success}
              />
            )}

            {passwordResetOpen && (
              <PasswordReset
                onChange={this.onChange}
                onSubmit={this.onSubmitReset}
                error={this.state.message}
                success={this.state.success}
              />
            )}
          </section>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  login,
  register,
  sendReset,
  clearErrors,
};
const mapStateToProps = ({ auth, error, success }) => ({
  auth: auth,
  error: error,
  success: success,
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
