import "./App.css";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx"
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute"
import PublicRoute from "./Components/PublicRoute"
import NavBar from "./Components/NavBar"
import UnderConstruction from "./Pages/UnderConstruction"
import FourOFour from "./Pages/FourOFour"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserPlaces, setCurrentUserPlaces] = useState(null);
  return (
    <div className="App">
      <header className="App-header"></header>
      <UserProvider>
        <Router>

          <div>
            <NavBar currentUser={currentUser}
              setCurrentUser={setCurrentUser} />
          </div>

          <Routes>

            {/* public route login */}
            <Route path="/"
              element={
                <PublicRoute
                  element={LoginPage}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentUserPlaces={currentUser}Places
                  setCurrentUserPlaces={setCurrentUserPlaces}
                />
              }
            />

            {/* private route - home screen of specific user */}
            <Route
              path="/loggedInPage"
              element={
                <ProtectedRoute
                  element={LoggedInPage}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentUserPlaces={currentUser}Places
                  setCurrentUserPlaces={setCurrentUserPlaces}
                />
              }
            />

            {/* private route - home screen of specific user */}
            <Route
              path="/maps"
              element={
                <ProtectedRoute
                  element={MemoGoogleMap}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentUserPlaces={currentUser}Places
                  setCurrentUserPlaces={setCurrentUserPlaces}
                />
              }
            />

            {/* private route - home screen of specific user */}
            <Route
              path="/places"
              element={
                <ProtectedRoute
                  element={UnderConstruction}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentUserPlaces={currentUser}Places
                  setCurrentUserPlaces={setCurrentUserPlaces}
                />
              }
            />

            {/* public route - page not found */}
            <Route
                path="*"
                element={
                  <PublicRoute
                    element={FourOFour}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                }
              />


          </Routes>
        </Router>

      </UserProvider>


    </div>
  );
}

export default App;
