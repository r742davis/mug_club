import React from "react";
import classes from "../css/LoginContainer.module.css";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

//Redux Imports
import { connect } from "react-redux";
import { closeRegister } from "../store/actions/authActions";
const actions = { closeRegister };

const Register = (props) => {
  return (
    <form onSubmit={(e) => props.onSubmit(e)}>
      <div className={classes.AuthContainer}>
      {props.success && <SuccessMessage success={props.success}/>}
      {props.error && <ErrorMessage error={props.error}/>}
        <div className={classes.Group}>
          <input
            type="text"
            name="name"
            onChange={props.onChange}
            className={classes.Input}
            required
          />
          <span className={classes.Bar}></span>
          <label htmlFor="name" className={classes.Label}>
            Name
          </label>
        </div>
        <div className={classes.Group}>
          <input
            type="email"
            name="email"
            onChange={props.onChange}
            className={classes.Input}
            required
          />
          <span className={classes.Bar}></span>
          <label htmlFor="email" className={classes.Label}>
            Email
          </label>
        </div>
        <div className={classes.Group}>
          <input
            type="password"
            name="password"
            onChange={props.onChange}
            className={classes.Input}
            required
          />
          <span className={classes.Bar}></span>
          <label htmlFor="password" className={classes.Label}>
            Password
          </label>
        </div>
        <button 
          type="submit" 
          name="register" 
          className={classes.Button}>
          Register
        </button>
        <div 
          onClick={() => props.closeRegister()} 
          className={classes.Back}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </div>
      </div>
    </form>
  );
};

export default connect(null, actions)(Register);
