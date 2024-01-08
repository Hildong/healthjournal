import { Button, Input, message } from "antd";
import styles from '../style/LoginOrRegister.module.css';
import { useState } from "react";
import useAddUser from "../hooks/useAddUser";

function RegisterPage() {
    const [inputtedEmail, setInputtedEmail] = useState<string>("")
    const [inputtedUsername, setInputtedUsername] = useState<string>("")
    const [inputtedPassword, setInputtedPassword] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage();
    const addUser = useAddUser()

    const onRegister = () => {
        addUser.mutateAsync({email: inputtedEmail, username: inputtedUsername, password: inputtedPassword})
            .then(res => {
                console.log(res)
                if(res.status === 201) {
                    console.log("Success")
                }
            })
            .catch(err => {
                if(err.response.status === 400) {
                    messageApi.open({
                        type: "error",
                        content: "Email already registered"
                    })
                }
            })
    }

    return (
        <div className={styles.inputAndButtonDiv}>
            {contextHolder}
            <h1 style={{marginTop: 20}} className={styles.header}>Register</h1>
            <Input style={{marginTop: 50}} className={styles.inputs} onChange={e => setInputtedEmail(e.target.value)} type="email" placeholder="Email"/>
            <Input className={styles.inputs} onChange={e => setInputtedUsername(e.target.value)} placeholder="Username"/>
            <Input className={styles.inputs} onChange={e => setInputtedPassword(e.target.value)} placeholder="Password" type="password"/>
            <Button className={styles.button} onClick={() => onRegister()}>Register</Button>
        </div>
    )
}

export default RegisterPage;