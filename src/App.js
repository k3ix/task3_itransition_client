import './App.css';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import { useState, useEffect } from 'react';
import { AuthContext } from "./helpers/AuthContext";
import axios from 'axios';


function App() {

    const[authState, setAuthState] = useState(false);

    useEffect(() => {
        axios.get("https://task3-itransition.herokuapp.com/users/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                setAuthState(false);
            } else {
                setAuthState(true);
            }
        });
    }, []);

    const logOut = () => {
        axios.put("https://task3-itransition.herokuapp.com/users/logout", {
            accessToken: localStorage.getItem("accessToken")
        }).then((response) => {
            localStorage.removeItem("accessToken")
            if (!response.data.error){
                window.location.reload();
            }
        })
    }




    return (
        <div className="App">
            <AuthContext.Provider value={{authState, setAuthState}}>
                <Router>
                    <div className="navBar">
                        <Link to="/">Home Page</Link>
                        <Link to="/register">Register</Link>
                        {!authState ? (
                          <>
                              <Link to="/login">Log In</Link>
                          </>
                        ) : (
                          <button onClick={logOut} className="logoutbtn">Log Out</button>
                        )}
                    </div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Registration} />
                    <Route path="*" exact component={PageNotFound} />
                </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
