import Canvas from '../components/canvas/canvas';
import CountDown from '../components/countDown';
import Chat from '../components/Chat';
import {socket} from '../socket';

const Home = () => {

  return (
    <main>
      <CountDown/>
      <Canvas/>
      <Chat socket={socket}/>
    </main>
  );
};

export default Home;
