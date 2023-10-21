import { Link,useNavigate} from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'


export default function Navbar() {
const auth=localStorage.getItem('user');
const navigate=useNavigate();

const handleLogout=()=>{
localStorage.clear();
navigate('/login')
}

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} className='logo' alt='logo'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav ms-auto px-5 ">
        <li className="nav-item mx-3">
          <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link" href="#">Service</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link" href="#">About</Link>
        </li>
        {!auth?<li className="nav-item mx-3">
          <Link className="nav-link" to="/login">Login</Link>
        </li>:<li className="nav-item mx-3">
          <Link className="nav-link" to='/login' onClick={handleLogout}>Logout</Link>
        </li>}
       
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}
