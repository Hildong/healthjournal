import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUserDocument } from "../../models/user.model";
import authService from "../service/auth.service";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        passport.authenticate("local", (err: Error, user: IUserDocument) => {
            if(err) return next(err)
            if(!user) return res.status(401).send("Authentication failed")

            req.logIn(user, err => {
                if(err) return next(err);
                console.log(user)
                res.status(202).send(user)
            })
        })(req, res, next)
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        req.logout(err => {
            if(err) next(err)
            res.status(202).send("Logged out")
        })
    }
    async registerUser(req: Request, res: Response, next: NextFunction) {
        const result = await authService.registerUser({email: req.body.user.email, password: req.body.user.password, username: req.body.user.username})
        if(result) {
            res.status(201).send(result)
        } else {
            res.status(400).send("Email already exists")
        }
    }
    async getSession(req: Request, res: Response, next: NextFunction) {
        if(req.user) {
            console.log(req.user)
            res.send(req.user)
        } else {
            res.status(401).send("Invalid session")
        }
    }
}

export default new AuthController()