import { NextFunction, Request, Response } from "express";

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) return next()
    res.status(401).send("Not allowed")
}