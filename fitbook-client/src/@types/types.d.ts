export interface IUser {
    _id?: string
    username?: string;
    email: string,
    password: string
}

export interface IWorkouts {
    muscleGroup: string[],
    type: string,
    length: number,
    pb: boolean,
    pbExercise: string,
    pbWeightOrLength: string
}

export interface IWorkoutStats {
    user: Types.ObjectId,
    workouts: Workouts[]
}