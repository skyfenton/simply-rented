import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();
  const user = props.getUser();
  
  function removeUser(e) {
    e.preventDefault();
    if(props.removeUser()){
      navigate("/");
    }
  }

  return (
    <>
      <h2>{user ? user : "You're not logged in!"}</h2>
      <button
        className="btn btn-lg btn-outline-danger"
        onClick={removeUser}
      >
        Log out
      </button>
    </>
  );
}
