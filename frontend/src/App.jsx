import {Routes,Route} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import EmployeeList from './pages/EmployeeListPage'
import AttendancePage from './pages/AttendancePage'
import EmpAttendanceHistory from './pages/EmpAttendanceHistory'

function App() {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage/>}></Route>
      <Route path='/emp' element={<EmployeeList/>}></Route>
      <Route path='/attendance' element={<AttendancePage></AttendancePage>}></Route>
      <Route path='/attendance/history/:id' element={<EmpAttendanceHistory></EmpAttendanceHistory>}></Route>
    </Routes>
  )
}

export default App
