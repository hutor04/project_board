import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import withDataFetching from '../withDataFetching';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Board = ({ lanes, loading, error, data }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(data);
  }, [data]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData('id');
    const newTickets = tickets.map(ticket => {
      if (ticket.id === Number(id)) {
        ticket.lane = laneId;
      }
      return ticket;
    });
    setTickets(newTickets)
  };

  return (
    <BoardWrapper>
      {lanes.map(lane => (
        <Lane
          key={lane.id}
          laneId={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tickets={tickets.filter(ticket => ticket.lane === lane.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </BoardWrapper>
  );
}

export default withDataFetching(Board);
