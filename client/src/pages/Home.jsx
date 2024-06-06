import { useQuery } from '@apollo/client';
import Canvas from '../components/canvas/canvas';
import { QUERY_THOUGHTS } from '../utils/queries';
import CountDown from '../components/countDown';
import Container from '@mui/material/Container';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main> 
      <CountDown/>
      <Canvas/>
    </main>
  );
};

export default Home;
