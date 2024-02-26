import { Button, Input, message } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../@types/types";
import useLoginUser from "./hooks/useLoginUser";
import { useUserContext } from "../../Context/UserContext";

const Login = () => {
    const login = useLoginUser()    
    const {initActiveUser} = useUserContext()
    const [messageApi, contextHolder] = message.useMessage();
    const {
        control,
        handleSubmit,
    } = useForm<IUser>();

    const onSubmit: SubmitHandler<IUser> = (data) => {
        login.mutateAsync({email: data.email, password: data.password})
            .then(res => {
                console.log(res)
                console.log("Success")
                initActiveUser(res.data)
            })
            .catch(err => {
                console.log(err)
                messageApi.open({
                    type: "error",
                    content: "Fel angivna inloggningsuppgifter"
                })
            })
    }

  return (
    <div>
        {contextHolder}
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
            name="email"
            control={control}
            render={({ field }) => (
                <Input type="email" {...field} />
            )}
            />
            <Controller
            name="password"
            control={control}
            render={({ field }) => (
                <Input type="password" {...field} />
            )}
            />
            <Button htmlType="submit">Logga in</Button>
        </form>
    </div>
  );
};

export default Login;