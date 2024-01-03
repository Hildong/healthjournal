import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IWorkouts } from "../../@types/types";

const CLIENT_PATH = "/workout/"

const useAddWorkout = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation((resource: {workout: IWorkouts, userID: string}) => {
        return axios.post(CLIENT_PATH + "create", {resource}, {withCredentials: true})
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["usersWorkoutsStats"])
        }
    })
    return mutation;
}

export default useAddWorkout