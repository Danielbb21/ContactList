import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Contacts from './Pages/Contacts';
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/my-contacts" element={<Contacts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;