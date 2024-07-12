import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RealTimeData = () => {
  const { data, error } = useSWR('/api/realtime', fetcher, { refreshInterval: 5000 });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Real-Time Data: {data.timestamp}</div>;
};

export default RealTimeData;
