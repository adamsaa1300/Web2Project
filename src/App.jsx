import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from "./components/admin/AdminDashboard"
import Navbar from './components/navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar userRole="admin" />
      <Routes>
        <Route path='/admin'     element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App