import { createContext } from "react";
import { userInfo } from "./types";

export const UserContext = createContext<userInfo>(null);