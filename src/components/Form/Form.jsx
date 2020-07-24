import React from 'react';
import PropTypes from 'prop-types';
import styled from './Form.module.css';

function Form({setFullStatistics, fullStatistics, statisticItem, setStatisticItem}) {
  
  const onSubmit = (event) => {
    event.preventDefault();
    
    if (statisticItem.hasOwnProperty('date') && statisticItem.hasOwnProperty('distance')) {
      fullStatistics.length > 0 ? fullStatistics.map(item => {
        console.log(item)
        if (item.date === statisticItem.date) {
          const currentStatistics = fullStatistics.filter(item => item.date !== statisticItem.date);
          const currentDistance = Number(item.distance) + Number(statisticItem.distance);
          setFullStatistics([...currentStatistics, { ...item, distance: currentDistance }]);
        } else {
          setFullStatistics(prevState => [...prevState, statisticItem]);
        }
      }) : setFullStatistics(prevState => [...prevState, statisticItem]);
  
      setStatisticItem({
        date: '',
        distance: '',
      });
    }
  };
  
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
  setFullStatistics: PropTypes.func.isRequired,
  setStatisticItem: PropTypes.func.isRequired,
  statisticItem: PropTypes.object.isRequired,
  fullStatistics: PropTypes.array.isRequired,
};

export default Form;