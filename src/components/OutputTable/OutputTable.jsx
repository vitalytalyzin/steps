import React from 'react';
import styled from "./OutputTable.module.css";

function OutputTable({ onChange, onRemove, statistics }) {
  return (
    <table className={styled.statistics__wrapper}>
      <thead>
      <tr>
        <td>Дата</td>
        <td>Пройдено км</td>
        <td colSpan={2}>Действия</td>
      </tr>
      </thead>
      <tbody>
      {statistics.sort((a, b) => {
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
                onClick={() => onChange(item)}
              >
                change
              </button>
            </td>
            <td>
              <button
                onClick={() => onRemove(item)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OutputTable;