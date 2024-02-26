import { Suspense } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Home/Dashboard";
import { useUserContext } from "./Context/UserContext";
import styles from './Styles/app.module.css'

type RouteProps = {children: JSX.Element}
function PrivateRoute({children} : RouteProps) {
    const {activeUser} = useUserContext();
    console.log(activeUser)
    return activeUser ? <>{children}</> : <Navigate to="/"/>
}

function App() {
  const {activeUser} = useUserContext();

  return (
    <div>
        <div className={activeUser ? styles.loggedInMainDiv : styles.loggedOutMainDiv}>
            <Routes>
                <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><PrivateRoute><Dashboard/></PrivateRoute></Suspense>}/>
                <Route path="*" element={<Login />}/>
            </Routes>
        </div>
    </div>
  )
}

export default App
