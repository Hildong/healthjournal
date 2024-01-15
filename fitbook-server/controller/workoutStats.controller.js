"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workoutStats_service_1 = __importDefault(require("../services/workoutStats.service"));
class WorkoutStats {
    createWorkout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            workoutStats_service_1.default.createWorkout(req.body.resource.userID, req.body.resource.workout)
                .then(stats => res.status(201).send(stats))
                .catch(err => next(err));
        });
    }
    getWorkoutStats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            workoutStats_service_1.default.getWorkoutStats(req.params.id)
                .then(stats => res.status(200).send(stats))
                .catch(err => next(err));
        });
    }
    getWorkoutStatsFromPeriod(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            workoutStats_service_1.default.getWorkoutStatsFromPeriod(req.params.id, req.params.timePeriod)
                .then(stats => res.status(200).send(stats))
                .catch(err => next(err));
        });
    }
}
exports.default = new WorkoutStats;
