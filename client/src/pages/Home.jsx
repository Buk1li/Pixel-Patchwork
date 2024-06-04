import { useQuery } from '@apollo/client';
import Canvas from '../components/canvas/canvas';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <Canvas/>
    </main>
  );
};

export default Home;
