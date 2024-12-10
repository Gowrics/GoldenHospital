import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import DentalDepartment from './screens/DentalDepartment';
import Dermotology from './screens/Dermotology';
import Navbar from './component/Navbar';
import DoctersList from './screens/DoctersList';
import FormComponent from './component/FormComponent';
import DepartmentForm from './component/DepartmentForm';
import DepartmentList from './screens/DepartmentList';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dental" element={<DentalDepartment />} />
        <Route path="dermotology" element={<Dermotology />} />
        <Route path="docterlist" element={<DoctersList />} />
        <Route path="form" element={<FormComponent/>}/>
        <Route path="service" element={<DepartmentForm/>}/>
        <Route path="departmentlist" element={<DepartmentList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  