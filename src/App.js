import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form/Form";
import OutputTable from "./components/OutputTable/OutputTable";

function App() {
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
      <OutputTable
        statistics={fullStatistics}
        onChange={changeStatisticItem}
        onRemove={removeStatisticItem}
      />
    </>
  );
}

export default App;
