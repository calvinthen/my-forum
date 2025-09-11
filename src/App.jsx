import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './index.css'
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Register from "./pages/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      

    </>
  )
}

export default App
