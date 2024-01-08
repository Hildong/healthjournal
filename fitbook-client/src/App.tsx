import { Navigate, Route, Routes } from "react-router-dom";
import LoginAndRegisterPage from "./LoginAndRegister/Pages/LoginAndRegisterPage";
import { useUserContext } from "./context/UserContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from './Components/Navigationbars/Components/Navbar';
import { Suspense } from "react";
import styles from './styles/app.module.css'

type RouteProps = {children: JSX.Element}
function PrivateRoute({children} : RouteProps) {
    const {activeUser} = useUserContext();
    console.log(activeUser)
    return activeUser ? <>{children}</> : <Navigate to="/"/>
}

function App() {
    const {activeUser} = useUserContext();


    return(
        <div>
            <Navbar />
            <div className={activeUser ? styles.loggedInMainDiv : styles.loggedOutMainDiv}>
                <Routes>
                    <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><PrivateRoute><Dashboard/></PrivateRoute></Suspense>}/>
                    <Route path="*" element={<LoginAndRegisterPage />}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;