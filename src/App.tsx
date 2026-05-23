import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/home" element={<DashboardPage />} />
      <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  )
}

export default App
