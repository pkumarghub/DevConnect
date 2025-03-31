import bcrypt from 'bcrypt';
import User from '../models/User';
import { IUser } from '../interface/User';

export class UserService {
    static async register(body: IUser): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new User({
            ...body,
            password: hashedPassword
        });
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

    static async deleteUser(username: string): Promise<IUser | null> {
        return User.findOneAndDelete({ username });
    }

    static async updateUser(username: string, body: IUser): Promise<IUser | null> {
        return User.findOneAndUpdate({ username }, body, { new: true });
    }

    static async getUserDetails(username: string): Promise<IUser | null> {
        return User.findOne({ username })
    }

    static async addAsFollower(loggedInUser: string, userToBeFollowed: string): Promise<IUser | null> {

        const loggedInUserDetails = await User.findOne({ username: loggedInUser }, { _id: 1, following: 1 })
        const getUserToBeFollowedId = await User.findOne({ username: userToBeFollowed }, { _id: 1, followers: 1 });

        const newFollowersList = [...(getUserToBeFollowedId?.followers || []), { _id: loggedInUserDetails?._id }];
        await User.findOneAndUpdate({ username: userToBeFollowed }, { followers: newFollowersList }, { new: true })

        const newFollowingList = [...(loggedInUserDetails?.following || []), { _id: getUserToBeFollowedId?._id }];
        const updatedUserData = await User.findOneAndUpdate({ username: loggedInUser }, { following: newFollowingList });

        return updatedUserData;
    }
    
    static async removeAsFollower(loggedInUser: string, userToBeUnFollowed: string): Promise<IUser | null> {

        const loggedInUserDetails = await User.findOne({ username: loggedInUser }, { _id: 1, following: 1 })
        const getUserToBeUnFollowedId = await User.findOne({ username: userToBeUnFollowed }, { _id: 1, followers: 1 });

        const newFollowersList = getUserToBeUnFollowedId?.followers.filter((ele: { equals: (id: any) => boolean }) => !ele.equals(loggedInUserDetails?._id));
        await User.findOneAndUpdate({ username: userToBeUnFollowed }, { followers: newFollowersList }, { new: true })

        const newFollowingList = loggedInUserDetails?.following.filter((ele: { equals: (id: any) => boolean }) => !ele.equals(getUserToBeUnFollowedId?._id));
        const updatedUserData = await User.findOneAndUpdate({ username: loggedInUser }, { following: newFollowingList }, { new: true });

        return updatedUserData;
    }
}