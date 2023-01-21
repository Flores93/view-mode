import './App.css';
import Carousel from './components/Carousel';
import Controls from './components/Controls';
import PrimaryLayout from './components/PrimaryLayout';

const App = () => {
  return (
    <PrimaryLayout>
      <Controls />
      <Carousel />
    </PrimaryLayout>
  );
};

export default App;
