import bcrypt from 'bcrypt';
import User from '../models/User';
import { IUser } from '../interface/User';

export class UserService {
    static async register(username: string, password: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return user;
    }

    static async login(username: string, password: string): Promise<IUser | null> {
        const user = await User.findOne({ username });
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return user;
    }
}