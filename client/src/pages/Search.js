import React, { Component } from "react";
import classes from "./styles/Search.module.css";
import Customer from "../components/Customer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import swal from "@sweetalert/with-react";

// Redux Imports
import { connect } from "react-redux";
import { openModal } from "../actions/modalActions";
import { deleteCustomer } from "../actions/customerActions";
const actions = { openModal, deleteCustomer };

class Search extends Component {
  state = {
    search: "",
  }

  updateSearch = event => {
    this.setState({ search: event.target.value });
  };

  deleteCustomer = customer => {
    swal({
      title: `Delete ${customer.name.first}?`,
      text: `Do you really want to delete this customer?`,
      buttons: true,
      icon: "warning",
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal(
          `Boom! ${customer.name.first} ${customer.name.last} has been deleted!`,
          {
            icon: "success"
          }
        );
        this.props.deleteCustomer(customer._id);
      } else {
        swal(`Phew! ${customer.name.first} is safe!`);
      }
    });
  };

  calculateCompletedBeers = arr => {
    if (arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].finished === true) {
          count++;
        }
      }
      return count;
    }
  };

  render() {
    let filteredCustomers = this.props.customers
      ? this.props.customers.filter(customer => {
          let strings =
            customer.name.first
              .toLowerCase()
              .includes(this.state.search.toLowerCase()) ||
            customer.name.last
              .toLowerCase()
              .includes(this.state.search.toLowerCase());
          // let numbers = customer.mugClub.cludId.includes(Number(this.props.search));
          return strings;
        })
      : null;

    const mappedCustomers = filteredCustomers
      ? filteredCustomers.map((customer, index) => {
          return (
            <Customer
              key={index}
              name={customer.name}
              email={customer.email}
              username={customer.username}
              clubId={customer.mugClub.clubId}
              beers={customer.mugClub.beers}
              completed={customer.mugClub.completed}
              openModal={() => this.props.openModal("EDIT_CUSTOMER", customer)}
              openBeerModal={() =>
                this.props.toggleCustomerBeersModal(customer)
              }
              
              updateCompletedBeers={this.props.updateCompletedBeers}
              calculateCompletedBeers={this.calculateCompletedBeers}
              deleteCustomer={() => this.deleteCustomer(customer)}
            />
          );
        })
      : null;
    return (
      <>
        <div>
          <div className={classes.InputContainer}>
            <h1 className={classes.SearchTitle}>
              Search Customers
              <div
                className={classes.AddIcon}
                onClick={() => this.props.openModal("NEW_CUSTOMER")}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </h1>
            <input
              type="text"
              name="search"
              className={classes.Input}
              value={this.state.search}
              onChange={this.updateSearch}
            />

            <div className={classes.CustomerContainer}>
              {this.state.search && mappedCustomers}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customers.customers
});

export default connect(mapStateToProps, actions)(Search);
