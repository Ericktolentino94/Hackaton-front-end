import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logOut } from "../Services/Firebase"
import "./login.css"

export const Login = ({currentUser, setCurrentUser}) => {
  const user = useContext(UserContext);
  const navigate  = useNavigate();
  useEffect(() => {
    if (user) {
      setCurrentUser(user)
      navigate("/loggedInPage");
    }
  }, [user, navigate]);

  return (
    <div>
      <section>
        <div className="login">
          <button className="btn btn-dark btn-lg" onClick={ signInWithGoogle }>Sign in With google</button>
      </div>
      </section>

    </div>
  );
};