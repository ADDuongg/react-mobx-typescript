import { makeAutoObservable } from "mobx";
import Cookies from "cookiejs";
import accountsData from "../fakedata.json";

export interface UserType {
    username: string;
    email: string;
    password: string;
    role: string;
    firstname: string,
    lastname: string
}

class UserStore {
    currentUser: UserType = {
        username: "",
        email: "",
        password: "",
        role: "",
        firstname: "",
        lastname: ""
    };

    accounts: UserType[] = accountsData.accounts;

    constructor() {
        makeAutoObservable(this);
        this.loadUserFromCookies();
    }

    setUser(user: UserType) {
        this.currentUser = user;
        Cookies.set('currentUser', JSON.stringify(user));
    }

    clearUser() {
        this.currentUser = {
            username: "",
            email: "",
            password: "",
            role: "",
            firstname: "",
            lastname: ""
        };
        Cookies.remove('currentUser');
    }

    loadUserFromCookies() {
        const userCookie = Cookies.get('currentUser');
        if (typeof userCookie === 'string') {
            this.currentUser = JSON.parse(userCookie);
        }
    }

    login(email: string, password: string): boolean {
        const user = this.accounts.find(account => account.email === email && account.password === password);
        if (user) {
            this.setUser(user);
            return true;
        }
        return false;
    }

    logout() {
        this.clearUser();
    }
}

const userStore = new UserStore()
export default userStore;
