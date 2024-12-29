import { Request, Response } from "express"
import { UserModel } from "./user.model"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"

const getUser = catchAsync(async(req:Request,res:Response)=>{
    const result = await UserModel.find()
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"data retrieved successfully",
        data:result
    } )
})

export const UserController = {
    getUser
}