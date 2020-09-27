import { UsersModel } from "../models";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import UsersRepository from "../repositories/Users.repository";

class UsersService {
    public async canUserRegister(email: string, phone: string): Promise<boolean> { 
        const isEmail = await UsersRepository.getUserByEmail(email);
        if (phone !== undefined) {
            return isEmail && !!(await UsersRepository.getUserByPhone(phone));
        }
        return !!isEmail;
    }
    public async registerNewUser(entity: UsersModel): Promise<UsersModel> {
        if (this.canUserRegister(entity.email, entity.phone)) {
            return await UsersRepository.registerUser(entity);
        } else {
            // delete the user
            await admin.auth().deleteUser(entity.uuid);
            logger.warn("invalid user register with existing email / phone number", entity);
            return null;
        }
    }
}
export default new UsersService();
