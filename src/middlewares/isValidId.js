import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, res, next) => {
    const {_id} = req.params;
    if(!isValidObjectId(_id)) {
        throw createHttpError(400, 'Bad request');
    }
    next();
};
