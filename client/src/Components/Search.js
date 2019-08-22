import React from 'react';

const search = (props) => {
  return (
    <>
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        value={props.value}
        onChange={props.handleChange} />
      <input
        type="submit"
        value="Submit" />
      </form>
    </>
  )
};

export default search;