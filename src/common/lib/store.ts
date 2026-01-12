import { UserStore } from "../model/indext";
import { Store } from "@tanstack/react-store";


export const userStore = new Store<null | UserStore>(null);

export const setUserStore = (user: UserStore) => {
    userStore.setState(user);
}