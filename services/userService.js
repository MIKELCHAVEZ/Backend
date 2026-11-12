import * as userModel from '../models/userModel.js';
import ValidationError from '../utils/ValidationError.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';


const doesUserExist = async (email) => {
    const existing = await userModel.findUserByEmail(email);

    if(existing.length > 0){
        return {result: true, user: existing[0]};
    }
    return {result:false, user: undefined};
}


export const createAccount = async (user) => {
    if(!user.name || !user.email || !user.password){
        throw new ValidationError(404, "Name, Email and Password are required!");
    }
    if(!validator.isEmail(user.email)){
        throw new ValidationError(404, "Improper email fortmat.");
    }
    if(!validator.isStrongPassword(user.password)){
        throw new ValidationError(404, "Password is not strong enough.");
    }
    const existing = await doesUserExist(user.email);
    if (existing.result) {
        throw new ValidationError(409, "An account with that email already exists.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const result = await userModel.insert(user.name, user.email, hashedPassword);

    if (!result || result <= 0) {
        throw new Error("Unable to create an account. please try again.");
    }

    return 'account created successfully!';
}


export const login = async (user) => {
    if(!user.email || !user.password){
        throw new ValidationError(404, "Email and Password are required!");
    }
    const existing = await doesUserExist(user.email);
    if (!existing.result) {
        throw new ValidationError(404, "Account with that email does not exist.");
    }

    const isCorrectPassword = await bcrypt.compare(user.password, existing.user.password);
    if(!isCorrectPassword){
        throw new Error("Incorrect password.");
    }
    return 'login successfully!';
}