import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './index.css'

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="*" />
        </Routes>
      </BrowserRouter> */}

       <div className="min-h-screen bg-green-600 text-white flex items-center justify-center">
          <p className="text-2xl bg-red-500 p-4 rounded">✅ Tailwind Safelist Test</p>
        </div>

    </>
  )
}

export default App
