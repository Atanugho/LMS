import { Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/HomePage';
import Footer from './Components/Footer';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  )
}

export default App
