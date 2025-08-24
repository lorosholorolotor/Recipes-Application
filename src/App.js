import {router} from './const.js'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import {Loader} from './Components/Loader'
import { InputProvider } from './inputContext.js';

function App() {
  return (
    <div className="App">
      <InputProvider>
        <RouterProvider router={router} fallbackElement={<Loader/>} />
      </InputProvider>
    </div>
  );
}

export default App;
