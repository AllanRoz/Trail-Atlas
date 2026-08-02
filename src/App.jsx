import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import TrailDetail from './pages/TrailDetail'
import BucketList from './pages/BucketList'
import Completed from './pages/Completed'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trails/:id" element={<TrailDetail />} />
        <Route path="/bucket-list" element={<BucketList />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
