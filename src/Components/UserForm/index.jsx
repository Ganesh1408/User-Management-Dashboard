import { useContext, useEffect, useState } from "react";
import "./index.css";
import Header from "../Header";
import { UserContext } from "../UserContext";


function UserForm() {
  const { users } = useContext(UserContext);
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    company: "",
  });
  const [error, setError] = useState({});
  const [SuccessNotification, setSuccessNotification] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const formValidation = () => {
    let errors = {};
    if (!input.name.trim()) errors.name = "Name required";

    if (!input.username.trim()) errors.username = "Username required";
    if (!input.email.trim() || !input.email.includes("@"))
      errors.email = "Enter a valid email";
    if (!input.address.trim()) errors.address = "address required";
    if (!input.company.trim()) errors.company = "company required";
    setError(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (selectedId) {
      const selectedUser = users?.find(
        (user) => user.id === Number(selectedId)
      );

      //   console.log
      if (selectedUser) {
        setInput({
          name: selectedUser.name,
          username: selectedUser.username,
          email: selectedUser.email,
          address: selectedUser.address?.city,
          company: selectedUser.company?.name,
        });
      }
    } else {
      setInput({ name: "", username: "", email: "", address: "", company: "" });
    }
  }, [selectedId, users]);

  const onSubmit = async (e) => {
    e.preventDefault();

    
        //updating existing user
    
    if (!formValidation()) return;
    let response;
    try {
      if (selectedId) {
        const Url = `https://jsonplaceholder.typicode.com/users/${selectedId}`;
        const options = {
          method: "PATCH",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(input),
        };
         response = await fetch(Url, options);
    }else {
        const Url = "https://jsonplaceholder.typicode.com/users";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        };
         response = await fetch(Url, options);
    }
  
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }
    
      // Handle success cases
      if (selectedId) {
        setSuccessNotification("User Updated Successfully");
      } else {
        setSuccessNotification("User Added Successfully");
        setInput({
          name: "",
          username: "",
          email: "",
          address: "",
          company: "",
        });
      }
    
      setError({}); 
    
    } catch (error) {
      setError({ submit: error.message });
    }
    
};     
    

  return (
    <>
      <Header />

      <form className="form-container" onSubmit={onSubmit}>
        <div className="input-container">
          <div className="user-id-dropdown">
            <label  htmlFor="existing-id">
              Select Id to Update : 
            </label>

            <select
              className="select"
              id="existing-id"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Create New Invoice</option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}-{user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name : </label>
            <input
              id="name"
              name="name"
              type="text"
              value={input.name}
              className="inputElement"
              onChange={handleChange}
            />
          </div>
          {error.name && <p className="error-message">{error.name}</p>}

          <div className="form-group">
            <label htmlFor="username">UserName : </label>
            <input
              id="username"
              name="username"
              type="text"
              value={input.username}
              className="inputElement"
              onChange={handleChange}
            />
          </div>
          {error.username && <p className="error-message">{error.username}</p>}
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              id="email"
              name="email"
              type="email"
              value={input.email}
              className="inputElement"
              onChange={handleChange}
            />
          </div>
          {error.email && <p className="error-message">{error.email}</p>}
          <div className="form-group">
            <label htmlFor="Address">Address : </label>
            <input
              id="Address"
              name="address"
              type="text"
              value={input.address}
              className="inputElement"
              onChange={handleChange}
            />
          </div>
          {error.address && <p className="error-message">{error.address}</p>}

          <div className="form-group">
            <label htmlFor="company">Company : </label>
            <input
              id="company"
              type="text"
              name="company"
              value={input.company}
              className="inputElement"
              onChange={handleChange}
            />
          </div>
          {error.company && <p className="error-message">{error.company}</p>}

          <button className="form-button" type="submit">
            {selectedId ? "Update" : "Submit"}
          </button>
          <p
            className={
              SuccessNotification
                ? "success-message-visible"
                : "success-message-hidden"
            }
          >
            {SuccessNotification}
          </p>
          <p
            className={
              error.submit ? "error-message-visible" : "error-message-hidden"
            }
          >
            {error.submit}
          </p>
        </div>
      </form>
    </>
  );
}

export default UserForm;
