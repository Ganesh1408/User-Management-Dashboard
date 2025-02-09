import { useContext, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import "./index.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import Header from "../Header";

import Pagination from "../Pagination/Pagination";
import { UserContext } from "../UserContext";


function UserList() {
    const {users,setUsers,isLoading,error,setError} = useContext(UserContext)
    
  
  
    const [CurrentPage, setCurrentPage] = useState(0);
  const  [successMessage,setSuccessMessage] = useState('')
  const page_size = 3;
  const startIndex = CurrentPage * page_size;
    const endIndex = startIndex + page_size;


  
  //deleting the user
  const handleDeleteUser = async (id) => {
    try {
      const Url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const options = {
        method: "DELETE",
      };
      const response = await fetch(Url, options);
      if (!response.ok) throw new Error("Failed to delete  User");

      const filteredUsers = users.filter((user) => user.id !== id);
      setUsers(filteredUsers);
      setSuccessMessage(`User ${id } Deleted Successfully`)
      setError('')
    } catch (error) {
      setError(error.message)
      setSuccessMessage('')
    }
  };

  //returning the JSX
  return (
   <> 
    <Header/>
    <Link to="/userForm">
          
          <button className="add-user">
        Add User  
            <PersonAddIcon sx={{ fontSize: "30px",color:"white"  }} />
          </button>
        </Link>

    <div className="user-section-container">
    
      <div>
       
        {isLoading ? (
          <h3>Loading</h3>
        ) : error ? (
          <p>{error}</p>
        ) : users && Array.isArray(users) && users?.length > 0 ? (
          <ul>
            {users.slice(startIndex, endIndex).map((user) => (
              // console.log(user)
              <li key={user.id}>
                <div className="userContainer">
                  <div className="user-interaction-container">
                    <p>ID : {user.id}</p>
                    <div className="user-interaction-buttons">
                   <Link to="/userForm" className="no-underline"> <EditIcon sx={{fontSize:'20px'}}/></Link>
                    <DeleteIcon
                      sx={{ fontSize: "20px" }}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                    </div>
                  </div>
                  <div className="UserDetails-container">
                    <h3>Name : {user.name}</h3>
                    <p>UserName : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <p>Address : {user.address.city}</p>
                    <p>Company : {user.company.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Users Found</p>
        )}
        <Pagination users={users} currentPage={CurrentPage} setCurrentPage={setCurrentPage} pageSize={page_size}/>
               {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

      </div>
    </div>
    </>
  );
}

export default UserList;
