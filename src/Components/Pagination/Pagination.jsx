import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PropTypes from "prop-types";
import "./Pagination.css";

function Pagination({ users, currentPage, setCurrentPage, pageSize }) {
  //Pagination constants
  console.log(users);
  const total_number_of_users = users?.length;
  console.log(total_number_of_users);
  const number_of_pages = Math.ceil(total_number_of_users / pageSize);

  //incrementing page number
  const handleIncrement = () => {
    setCurrentPage((prev) => prev + 1);
  };

  //decrementing the page number
  const handleDecrement = () => {
    setCurrentPage((prev) => prev - 1);
  };

  //returning page_number jsx
  return (
    <div className="pagination-container">
      {currentPage === 0 ? (
        ""
      ) : (
        <NavigateBeforeIcon
          onClick={handleDecrement}
          sx={{ fontSize: "40px", color: "white" }}
        />
      )}
      {Array.from({ length: number_of_pages }, (_, i) => i + 1).map((each) => (
        <span
          role="button"
          onClick={() => setCurrentPage(each - 1)}
          className={`page-number ${currentPage === each - 1 ? "active" : ""}`}
          key={each}
        >
          {each}
        </span>
      ))}
      {currentPage === number_of_pages - 1 ? (
        ""
      ) : (
        <NavigateNextIcon
          onClick={handleIncrement}
          sx={{ fontSize: "40px", color: "white" }}
        />
      )}
    </div>
  );
}


//propTypes
Pagination.propTypes = {
  users: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
