import React from 'react';
import PropTypes from 'prop-types';
import styled from './Form.module.css';

function Form({onSubmit, statisticItem, setStatisticItem}) {
  
  const onChange = ({ target }) => {
    const {name, value} = target;
    setStatisticItem({...statisticItem, [name]: value});
  };
  
  return (
    <form className={styled.form} onSubmit={onSubmit}>
      <label className={styled.label}>
        дата
        <input
          className={styled.input}
          onChange={onChange}
          type="date"
          name="date"
          value={statisticItem.date}
        />
      </label>
      <label className={styled.label}>
        пройдено км
        <input
          className={styled.input}
          onChange={onChange}
          type="number"
          name="distance"
          value={statisticItem.distance}
        />
      </label>
      <button>ok</button>
    </form>
  );
}

Form.propTypes = {
  statisticItem: PropTypes.object.isRequired,
  setStatisticItem: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;