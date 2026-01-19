import { Store } from "@tanstack/react-store";
import { UserModel } from "../model/user";


export const userStore = new Store<UserModel | null>(null);

export const setUserStore = (user: UserModel | null) => {
    userStore.setState(user);
}