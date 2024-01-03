import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types/types";

const CLIENT_PATH = "/auth/"

const useAddUser = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation((user: IUser) => {
        return axios.post(CLIENT_PATH + "create", {user}, {withCredentials: true})
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
            navigate("/dashboard")
        }
    })
    return mutation;
}

export default useAddUser