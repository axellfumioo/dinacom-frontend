import { Store } from "@tanstack/react-store";
import { UserModel } from "../model/user";

export const userIdStore = new Store<string | null>(null);

export const setUserIdStore = (userId: string) => {
    userIdStore.setState(userId);
}