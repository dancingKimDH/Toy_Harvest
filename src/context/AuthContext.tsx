import { ReactNode, createContext } from "react";
import {User, getAuth, onAuthStateChanged} from "firebase/auth";

interface AuthProps {
    children: ReactNode;
}

const AuthContext = createContext(
    {user: null as User | null}
);