import  { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom'
import './sidebar.css'; //Import your CSS file
import profileImg from './profile.jpeg'
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/login')
    }


    const removeSidebar=()=>{
      navigate('/login');
    }


  const menuBtnClass = isSidebarOpen ? "bx bx-menu-alt-right" : "bx bx-menu";
  const auth= localStorage.getItem('user');

  return (
    <div className="App">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo_details">
          <i className="bx bxl-audible icon"></i>
          <div className="logo_name">Code Effect</div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">

      {auth?<>
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
        <a href="#">
          <i className="bx bx-user"></i>
          <span className="link_name">User</span>
        </a>
        <span className="tooltip">User</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-chat"></i>
          <span className="link_name">Request Admin</span>
        </a>
        <span className="tooltip">Message</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-pie-chart-alt-2"></i>
          <span className="link_name">Analytics</span>
        </a>
        <span className="tooltip">Analytics</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-folder"></i>
          <span className="link_name">File Manger</span>
        </a>
        <span className="tooltip">File Manger</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cart-alt"></i>
          <span className="link_name">Order</span>
        </a>
        <span className="tooltip">Order</span>
      </li>
      <li>
        <a href="#">
          <i className="bx bx-cog"></i>
          <span className="link_name">Settings</span>
        </a>
        <span className="tooltip">Settings</span>
      </li>

  </>:null}
  <li>
        <a href="#">
          <i className="bx bx-user-voice"></i>
          <span className="link_name">Home</span>
        </a>
        <span className="tooltip">Home</span>
      </li>
    <li></li>
  <li>
        <a href="#">
          <i className="bx bx-user-voice"></i>
          <span className="link_name">Contact Admin</span>
        </a>
        <span className="tooltip">Contact Admin</span>
      </li>
    <li>
        <a href="#">
          <i className="bx bx-user-voice"></i>
          <span className="link_name">About</span>
        </a>
        <span className="tooltip">About</span>
      </li>

{auth?
      <li className="profile">
        <div className="profile_details">
          <img src={profileImg} alt="profile image"/>
          <div className="profile_content">
            <div className="name">Anna Jhon</div>
            <div className="designation">Admin</div>
          </div>
          <Link className="nav-link" to='/login' onClick={handleLogout}>
            <i className="bx bx-log-out" id="log_out" onClick={removeSidebar}> </i>
        </Link>
        </div>
      </li>:
      // <li className="profile">
      //   <div className="profile_details" id='loginbtn'>
      //     <Link className='loginBtn' to='/login'>Login Here</Link>
      //   </div>
      // </li>
      null

}
        </ul>
      </div>

      {/* <section className="home-section">
        <div className="text">Dashboard</div>
      </section> */}
    </div>
  );
}

export default App;
