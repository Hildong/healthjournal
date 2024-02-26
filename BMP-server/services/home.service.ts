//import { IWorkoutStats, WorkoutStats, Workouts } from "../models/workoutStats.model"

class workoutStatsService {
/*
    async createWorkout(userID: string, resource: Workouts) {
        console.log(resource)
        const workoutStats = await WorkoutStats.findOneAndUpdate(
            {user: userID}, 
            {$push: {workouts: resource}},
            {new: true, upsert: true}
        );
        return workoutStats
    }
    async getWorkoutStats(userID: string) {
        const workoutStats = await WorkoutStats.find({user: userID}).sort({ "workouts.createdAt": -1 });;
        return workoutStats
    }
    async getWorkoutStatsFromPeriod(userID: string, timePeriod: string) {
        const xMonthsAgo = new Date();
        xMonthsAgo.setMonth(xMonthsAgo.getMonth() - Number(timePeriod));

        const workoutStats = await WorkoutStats.find({user: userID, "workouts.createdAt": {$gte: xMonthsAgo.getTime(), $lt: new Date().getTime()}});
        return workoutStats
    }
*/
}

export default new workoutStatsService