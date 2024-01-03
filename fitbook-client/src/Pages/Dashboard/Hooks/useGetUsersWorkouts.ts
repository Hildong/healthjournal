import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWorkoutStats } from "../../../@types/types";

const useGetUsersWorkouts = (userID?: string) => useQuery(["usersWorkoutsStats"], async () => {
    const {data} = await axios.get<[IWorkoutStats]>("/workout/usersWorkoutsStats/" + userID, {withCredentials: true})

    return data[0]
})

export default useGetUsersWorkouts