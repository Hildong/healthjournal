import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CLIENT_PATH = "/auth/"

const useLoginUser = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation((data: {email: string, password: string}) => {
        return axios.post(CLIENT_PATH + "login", {email: data.email, password: data.password}, {withCredentials: true})
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
            navigate("/dashboard")
        }
    })
    return mutation;
}

export default useLoginUser