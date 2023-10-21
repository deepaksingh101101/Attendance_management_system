
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import axios from 'axios'
import Sidebar from './components/sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateComponent from './components/privateComponent/PrivateComponent'
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true;

function App() {
const auth=localStorage.getItem('user');
  return (
    <>

      {/* {!auth?<Navbar />:null} */}
      <Sidebar/>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Hide this routes until login */}
          <Route element={<PrivateComponent/>}> 
          
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Sidebar />} />
          </Route>

      </Routes>

      


    </>
  )
}

export default App
