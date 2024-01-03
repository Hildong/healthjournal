import { NextFunction, Request, Response } from "express";
import workoutStatsService from "../services/workoutStats.service";

class WorkoutStats {
    async createWorkout(req: Request, res: Response, next: NextFunction) {
        workoutStatsService.createWorkout(req.body.resource.userID, req.body.resource.workout)
            .then(stats => res.status(201).send(stats))
            .catch(err => next(err))
    }
    async getWorkoutStats(req: Request, res: Response, next: NextFunction) {
        workoutStatsService.getWorkoutStats(req.params.id)
            .then(stats => res.status(200).send(stats))
            .catch(err => next(err))
    }
    async getWorkoutStatsFromPeriod(req: Request, res: Response, next: NextFunction) {
        workoutStatsService.getWorkoutStatsFromPeriod(req.params.id, req.params.timePeriod)
            .then(stats => res.status(200).send(stats))
            .catch(err => next(err))
    }
}

export default new WorkoutStats