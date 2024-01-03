import Types, { Date, Model, Schema, model } from "mongoose";

export interface IWorkoutStats {
    user: Types.ObjectId,
    workouts: Workouts[]
}

export type Workouts = {
    muscleGroup: string[],
    type: string,
    length: number,
    pb: boolean,
    pbExercise: string,
    pbWeightOrLength: string,
    createdAt: number;
}

const workouts = {
    muscleGroup: {type: [String], required: false},
    type: {type: String, required: false},
    length: {type: Number, required: false},
    pb: {type: Boolean, required: false},
    pbExercise: {type: String, required: false},
    pbWeightOrLength: {type: String, required: false},
    createdAt: { type: Number, default: Date.now }
}

const workoutStatsSchema = new Schema<IWorkoutStats>(
    {
        user: {type: String, required: true},
        workouts: {type: [workouts], required: false}
    }
)

export const WorkoutStats = Model<IWorkoutStats> = model("Workoutstats", workoutStatsSchema)