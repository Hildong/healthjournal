import { Button, Input, message } from "antd";
import styles from '../style/LoginOrRegister.module.css';
import useLoginUser from "../hooks/useLoginUser";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

function LoginPage() {
    const login = useLoginUser()
    const [inputtedEmail, setInputtedEmail] = useState<string>("");
    const [inputtedPassword, setInputtedPassword] = useState<string>("");
    const {initActiveUser} = useUserContext()
    const [messageApi, contextHolder] = message.useMessage();

    const onLogin = () => {
        login.mutateAsync({email: inputtedEmail, password: inputtedPassword})
            .then(res => {
                console.log(res)
                console.log("Success")
                initActiveUser(res.data)
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: "error",
                    content: "No user with that username exists"
                })
            })
            
    }

    return (
        <div className={styles.inputAndButtonDiv}>
            {contextHolder}
            <h1 style={{marginTop: 20}} className={styles.header}>Login</h1>
            <Input style={{marginTop: 50}} className={styles.inputs} onChange={e => setInputtedEmail(e.target.value)} placeholder="Username"/>
            <Input className={styles.inputs} placeholder="Password" onChange={e => setInputtedPassword(e.target.value)} type="password"/>
            <Button className={styles.button} onClick={() => onLogin()}>Login</Button>
        </div>
    )
}

export default LoginPage;