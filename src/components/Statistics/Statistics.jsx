import React, {useState} from 'react';
import styled from './Statistics.module.css';
import Form from '../Form/Form';

function Statistics() {
  const [fullStatistics, setFullStatistics] = useState([]);
  const [statisticItem, setStatisticItem] = useState({
    date: '',
    distance: '',
  });
  
  const removeStatisticItem = (item) => {
    setFullStatistics([...fullStatistics.filter(statisticItem => statisticItem !== item)]);
  };
  
  const changeStatisticItem = (item) => {
    setStatisticItem({...item});
    removeStatisticItem(item);
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    
    if (statisticItem.date !== '' && statisticItem.distance !== '') {
      const isStatisticExist = fullStatistics.some(item => (item.date === statisticItem.date));
      
      if (isStatisticExist) {
        // Альтернативный вариант
        // const currentFullStatistics = fullStatistics.filter(item => item.date !== statisticItem.date);
        // const [ item ] = fullStatistics.filter(item => item.date === statisticItem.date);
        // const currentDistance = Number(item.distance) + Number(statisticItem.distance);
        // setFullStatistics([...currentFullStatistics, { ...item, distance: currentDistance }]);
        const updateStatistics = fullStatistics.map(item => {
          if (item.date === statisticItem.date) {
            return {...item, distance: Number(item.distance) + Number(statisticItem.distance)};
          }
          return item;
        });
        
        setFullStatistics([...updateStatistics]);
      } else {
        setFullStatistics(prevState => [...prevState, statisticItem]);
      }
      
      setStatisticItem({
        date: '',
        distance: '',
      });
    }
  };
  
  return (
    <>
      <Form
        statisticItem={statisticItem}
        setStatisticItem={setStatisticItem}
        onSubmit={onSubmit}
      />
      <table className={styled.statistics__wrapper}>
        <thead>
          <tr>
            <td>Дата</td>
            <td>Пройдено км</td>
            <td colSpan={2}>Действия</td>
          </tr>
        </thead>
        <tbody>
          {fullStatistics.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
  
            return 0;
          })
          .map((item, idx) => (
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.distance}</td>
              <td>
                <button
                  onClick={() => changeStatisticItem(item)}
                >
                  change
                </button>
              </td>
              <td>
                <button
                  onClick={() => removeStatisticItem(item)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Statistics;