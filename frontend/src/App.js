import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;