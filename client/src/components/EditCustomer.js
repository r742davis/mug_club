import React, { Component } from "react";
import classes from "./styles/Modals.module.css";
import Grow from "@material-ui/core/Grow";
import swal from "@sweetalert/with-react";
import BeersList from "./BeersList";

//Redux Imports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeModal } from "../actions/modalActions";
import { updateCustomer, fetchCustomers } from "../actions/customerActions";

class EditCustomer extends Component {
  state = {
    first: this.props.first,
    last: this.props.last,
    clubId: this.props.clubId,
    customerId: this.props.customerId,
    completed: this.props.completed,
    customerBeers: this.props.customerBeers
  };

  static propTypes = {
    modalOpen: PropTypes.bool
  };

  updateCompletedBeers = checkedArr => {
    let updatedArr = this.state.customerBeers;
    for (let k = 0; k < updatedArr.length; k++) {
      for (let h = 1; h < checkedArr.length; h++) {
        if (updatedArr[k]._id === checkedArr[h]._id) {
          updatedArr[k].finished = true;
        }
      }
    }
    this.setState({
      customerBeers: updatedArr
    });
  };

  checkCompletion = beers => {
    console.log(beers);
    let value = true;
    for (let i = 0; i < beers.length; i++) {
      if (beers[i].finished === false) {
        return (value = false);
      }
    }
    if (value === true) {
      this.state.completed = true;
    }
  };

  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = async (e, checkedArr) => {
    e.preventDefault();
    await this.updateCompletedBeers(checkedArr);
    await this.checkCompletion(this.state.customerBeers);
    const updatedCustomer = await {
      name: {
        first: this.state.first,
        last: this.state.last
      },
      mugClub: {
        clubId: this.state.clubId,
        completed: this.state.completed,
        beers: this.state.customerBeers
      }
    };    
    try {
      await this.props.updateCustomer(updatedCustomer, this.props.customerId);
      await this.props.fetchCustomers();
      swal({
        title: `You've updated ${this.state.first} ${this.state.last}!`,
        icon: "success",
        button: "Ok!"
      });
      this.props.closeModal();
    } catch (e) {
      console.log(e);
      swal({
        title: `Oops! Something went wrong :(`,
        icon: "fail",
        button: "Crap!"
      });
    }
  };

  render() {
    if (!this.props) {
      return null;
    }
    return (
      <>
        <section className={classes.ModalContainer}>
          <Grow in={true}>
            <div className={classes.EditModal}>
              <h2 className={classes.ModalTitle}>Edit Customer</h2>
              <form
                className={classes.EditForm}
                onSubmit={e => this.props.handleSubmit(e)}
              >
                <div className={classes.Group}>
                  <input
                    type="text"
                    name="first"
                    className={classes.Input}
                    defaultValue={this.props.first}
                    onChange={this.handleInputChange}
                    required
                  />
                  <span className={classes.Bar}></span>
                  <label htmlFor="first" className={classes.Label}>
                    First Name
                  </label>
                </div>
                <div className={classes.Group}>
                  <input
                    type="text"
                    name="last"
                    className={classes.Input}
                    defaultValue={this.props.last}
                    onChange={this.handleInputChange}
                    required
                  />
                  <span className={classes.Bar}></span>
                  <label htmlFor="last" className={classes.Label}>
                    Last Name
                  </label>
                </div>
                <div className={classes.Group}>
                  <input
                    type="text"
                    name="clubId"
                    className={classes.Input}
                    defaultValue={this.props.clubId}
                    onChange={this.handleInputChange}
                    required
                  />
                  <span className={classes.Bar}></span>
                  <label htmlFor="clubId" className={classes.Label}>
                    Mug Club ID
                  </label>
                </div>
                <div>
                  <label htmlFor="beerList" id={classes.ListLabel}>
                    Beer List
                  </label>
                  <BeersList
                    beers={this.props.customerBeers}
                    updateCompletedBeers={this.updateCompletedBeers}
                    handleSubmit={this.handleSubmit}
                    toggleModal={() => this.props.closeModal()}
                  />
                </div>
              </form>
            </div>
          </Grow>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => ({
  modalOpen: state.modal.modalOpen,
  first: state.modal.info.name.first,
  last: state.modal.info.name.last,
  clubId: state.modal.info.mugClub.clubId,
  completed: state.modal.info.mugClub.completed,
  customerBeers: state.modal.info.mugClub.beers,
  customerId: state.modal.info._id
});

export default connect(mapStateToProps, {
  closeModal,
  updateCustomer,
  fetchCustomers
})(EditCustomer);
