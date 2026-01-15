import { UserStore } from "../model/indext";
import { Store } from "@tanstack/react-store";


export const userStore = new Store<UserStore | null>(null);

export const setUserStore = (user: UserStore | null) => {
    userStore.setState(user);
}