import User from "../../resources/user/user.interface"
declare global {
    namespace Express {
        export interface Request {
            user: User;
            localId: string;
        }
        export interface Response {
            aut: string;
            isLogin: boolean;
        }
    }
}