import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Contacts from './Pages/Contacts';
import Home from './Pages/Home';
import Register from './Pages/Register';
import { ToastContainer } from "react-toastify";
import {UseLogged} from './Context/UserLogged';

function App() {

  const {isLoggedIn} = UseLogged();
  

  return (
    <>
    
      <ToastContainer style={{ fontSize: "14px" }} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={!isLoggedIn ? < Home/> :  <Navigate to="/my-contacts" replace />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/my-contacts" element={isLoggedIn ? <Contacts /> : <Navigate to="/" replace />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;