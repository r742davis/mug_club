import React from 'react';
import classes from './BeerModal.module.css';

const BeerModal = (props) => {
  return (
    <>
      <section className={classes.ModalContainer}>
        <div className={classes.Modal}>
          <h2 className={classes.ModalTitle}>Edit Beer</h2>
          <form
            className={classes.ModalForm}
            onSubmit={props.handleEditSubmit}>
            <label htmlFor="beerName">Beer Name</label>
            <input type="text" name="beerName" placeholder="Beer Name" value={props.beerName} onChange={props.handleInputChange} />
            <label htmlFor="beerType">Type</label>
            <input type="text" name="beerType" placeholder="Beer Type" value={props.beerType} onChange={props.handleInputChange} />
            <label htmlFor="brewery">Brewery</label>
            <input type="text" name="brewery" placeholder="Brewery Name" value={props.brewery} onChange={props.handleInputChange} />
            <label htmlFor="breweryLocation">Brewery Location</label>
            <input type="text" name="breweryLocation" placeholder="Brewery Location" value={props.breweryLocation} onChange={props.handleInputChange} />
            <input type="submit" value="Submit" />
          </form>
          <button onClick={props.toggleEditModal}>Close</button>
        </div>
      </section>
    </>
  )
};

export default BeerModal;
