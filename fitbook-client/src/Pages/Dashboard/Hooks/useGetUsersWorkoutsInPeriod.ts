import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IWorkoutStats } from "../../../@types/types";

const useGetUsersWorkoutsInPeriod = (userID?: string, months?: number) => useQuery(["usersWorkoutsStats"], async () => {
    const {data} = await axios.get<[IWorkoutStats]>(`/workout/usersWorkoutsStats/${userID}/${months}`, {withCredentials: true})
    console.log(data[0])
    return data[0]
})

export default useGetUsersWorkoutsInPeriod