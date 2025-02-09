
import './index.css'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';



function Header() {
    //returning the jsx
  return (
    
    
    <div className="Header-Container">
    <Link className="no-underline" to="/"><DashboardIcon sx={{fontSize:'40px'}}/></Link>
    <div className="Header-options">
    <Link className="no-underline" to="/">Home</Link>
    <div className="profile"><AccountCircleIcon sx={{color:"black",fontSize:"40px"}}/></div>
    </div>
    </div>
  )
}

export default Header