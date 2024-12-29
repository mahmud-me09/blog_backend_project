import { Request, Response } from "express"
import { UserModel } from "./user.model"

const getUser = (req:Request,res:Response)=>{
    const result = UserModel.find()
    res.send(result)
}

export const UserController = {
    getUser
}