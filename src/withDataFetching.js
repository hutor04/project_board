import React, { useEffect, useState } from 'react';

const withDataFetching = (WrappedComponent) => ({dataSource, ...rest}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tickets = await fetch('../../assets/data.json');
        const ticketsJSON = await tickets.json();
        setLoading(false);
        setError(false);
        setData(ticketsJSON);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <WrappedComponent
      data={data}
      loading={loading}
      error={error}
      {...rest}
    />
    );
};

export default withDataFetching;
