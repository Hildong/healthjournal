import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import styles from '../style/LoginOrRegister.module.css';
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginAndRegisterPage() {
    const [showLogin, setShowLogin] = useState<boolean>(true);
    const {activeUser} = useUserContext()
    const navigate = useNavigate()

    useEffect(() => {
        activeUser ? navigate("/dashboard") : console.log("logged in")
    }, [activeUser, navigate])
    
    return(
        <div className={styles.background}>
            <div>
                {
                    showLogin ? (
                        <div className={styles.SignInOrUpDiv}>
                            <LoginPage />
                            <div className={styles.switchView}>
                                <p onClick={() => setShowLogin(!showLogin)}>Click here to create an account</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.SignInOrUpDiv}>
                            <RegisterPage />
                            <div className={styles.switchView}>
                                <p onClick={() => setShowLogin(!showLogin)}>Switch to login</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoginAndRegisterPage;