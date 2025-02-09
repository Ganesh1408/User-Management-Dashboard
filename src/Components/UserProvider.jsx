import  { useEffect, useState } from 'react'
import { UserContext } from "./UserContext"; 
import PropTypes from 'prop-types';





function UserProvider({children}) {
   


    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  //fetching data from the api and assigning the users data to state
  const fetchData = async () => {
    setLoading(true);
    try {
      const Url = "https://jsonplaceholder.typicode.com/users";

      const response = await fetch(Url);
      if (!response.ok) {
        throw new Error("fetching failed");
      } else {
        const Data = await response.json();
        console.log(Data);
        setUsers(Data);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  //calling the fetchData in useEffect

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <UserContext.Provider value={{ users, setUsers, error,setError, isLoading }}>
      {children}
    </UserContext.Provider>

  );
};

UserProvider.propTypes={
  children:PropTypes.node.isRequired,
}

export default UserProvider