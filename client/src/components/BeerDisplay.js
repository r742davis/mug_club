import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import classes from './styles/BeerDisplay.module.css';
import { connect } from 'react-redux';
const uniqid = require('uniqid');

const BeerDisplay = (props) => {
  const beerList = props.beers ? 
    props.beers.map(beer => {
      return (
        <ListItem
          key={uniqid()}
          dense
          button
          className={classes.ListItem}
          onClick={() => props.toggleEditBeerModal(beer)}
          >
          <ListItemAvatar>
            <Avatar
              alt={`${beer.brewery}`}
              src={beer.url}
            />
          </ListItemAvatar>
          <div className={classes.Group}>
            <h3>{beer.brewery}</h3>
            <h2>{beer.name}</h2>
          </div>
        </ListItem>
      );
    })
    : null

  return (
    <>
    <section className={classes.DisplayContainer}>
      <h1>Current Beers</h1>
        <List dense className={classes.List}>
          {beerList}
        </List>
    </section>
    </>
  )
}

const mapStateToProps = (state) => ({
  beers: state.beers.beers
})


export default connect(mapStateToProps)(BeerDisplay);