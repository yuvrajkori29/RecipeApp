
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';

import { CreateReceipe } from './pages/create-receipe';
import { SavedReceipe } from './pages/saved-receipe';
import { Register } from './pages/Register';
import Navbar from './Components/Navbar';


function App() {
  return (
    <div className="App">

      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Register/>} />
        <Route exact path="/create-receipe" element={<CreateReceipe/>} />
        <Route path="/saved-receipe" element={<SavedReceipe/>} />
  
        </Routes>
    </Router>
    </div>
  );
}

export default App;
