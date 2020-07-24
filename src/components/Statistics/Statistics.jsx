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
  
  return (
    <>
      <Form
        setFullStatistics={setFullStatistics}
        fullStatistics={fullStatistics}
        statisticItem={statisticItem}
        setStatisticItem={setStatisticItem}
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