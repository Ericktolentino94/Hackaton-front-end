import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Services/Firebase";
import {useState} from "react"




export const LoggedInPage = ({currentUser, setCurrentUser}) => {
  const [clearMessage, setClearMessage] = useState(false);

  const imgStyle = {
      width:'30vh',
      height:'30vh'
  }
  const navigate = useNavigate();
  const user = useContext(UserContext);
  
  useEffect(() => { 
    if(!user) {

        navigate("/");
      }
    }, [user, navigate]);

  
  const handleLogout = async () => {
    logOut()
    alert("you've been logged out")
  };
  const handleOk=(event) => {
    event.preventDefault();
    setClearMessage(true);
  }
  if ( user ){ setCurrentUser(user)
    return (<>
  <button onClick={handleOk}>
    OK
  </button>{!clearMessage ? 
      <div>
        <h1> YOU ARE NOW LOGGED IN : </h1>
        <h1>Welcome {user.displayName} !</h1>
        <div>
          <img src = {user.photoURL}
          style={imgStyle}
            className="user-image"
            alt="its the users head"
            ></img>
        </div>
        email: {user.email}
       
        
      </div> : null}
      <button onClick={handleLogout}> LOG OUT</button>
      </>

    );
  } else 
  return (
    <div> NOT LOGGED IN </div>
  )
}