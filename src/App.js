import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from './screens/Home';
import DentalDepartment from './screens/DentalDepartment';
import Dermotology from './screens/Dermotology';
import Navbar from './component/Navbar';
import DoctersList from './screens/DoctersList';
import FormComponent from './component/FormComponent';
import DepartmentForm from './component/DepartmentForm';
import DepartmentList from './screens/DepartmentList';
import Calender from './component/Calender';
import Dbtable from './component/Dbtable';
import ModalShow from './component/Modal';
import Dbtable1 from './component/Dbtable1';
import Dbtable2 from './component/Dbtable2';
import Dbtable3 from './component/Dbtable3';

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
        <Route path="/calender" element={<Calender/>}/>
        <Route path="/dbtable" element={<Dbtable3/>}/>
        <Route path="/modal" element={<ModalShow/>}/>
        <Route path="*" element={<Home />}  />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
  