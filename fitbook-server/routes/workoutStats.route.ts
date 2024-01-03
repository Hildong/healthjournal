import express from "express"
import workoutsController from "../controller/workoutStats.controller";

const workoutStatsRouter = express.Router();

workoutStatsRouter.route("/usersWorkoutsStats/:id").get(workoutsController.getWorkoutStats);
workoutStatsRouter.route("/usersWorkoutsStats/:id/:timePeriod").get(workoutsController.getWorkoutStats);
workoutStatsRouter.route("/create").post(workoutsController.createWorkout);


export default workoutStatsRouter