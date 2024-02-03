import "./App.css";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx"
import { useState } from "react";


function App() {
  const[currentUser, setCurrentUser] = useState(null);
  return (
    <div className="App">
     <header className="App-header"></header>
      <UserProvider>
        <Router>
          <Routes>
            <Route  path="/" element = { <LoginPage  /> } /> 
            <Route path="/loggedInPage" element = { <LoggedInPage currentUser={currentUser} 
            setCurrentUser={setCurrentUser}/>} />
         </Routes>
        </Router> 

       </UserProvider> 
      <main>
        <MemoGoogleMap 
        currentUser={currentUser} />
      </main>

    </div>
  );
}

export default App;
