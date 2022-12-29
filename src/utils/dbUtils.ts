import { ObjectId } from "mongoose";

export const deleteAnId = (dbArr: any, deletedId: any): any => {
    const arr = [...dbArr]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].toString() === deletedId.toString()) {
            arr.splice(i, 1)
            break
        }
    }
    return [...arr]
};
