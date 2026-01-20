import { Store } from "@tanstack/react-store";
// import { UserModel } from "../model/user";
import { UserStore } from "../model/indext";


export const userStore = new Store<UserStore | null>(null);

export const setUserStore = (user: UserStore | null) => {
    console.log("SET USER STORE:", user);
    userStore.setState(user);
}