import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import DentalDepartment from './screens/DentalDepartment';
import Dermotology from './screens/Dermotology';
import Navbar from './component/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dental" element={<DentalDepartment />} />
        <Route path="dermotology" element={<Dermotology />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  