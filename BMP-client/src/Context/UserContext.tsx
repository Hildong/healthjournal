import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../@types/types";
import axios from "axios";

interface IUserContext {
    activeUser?: IUser,
    initActiveUser: (user: IUser) => void,
    logoutActiveUser: () => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)
const UserProvider = (props: PropsWithChildren) => {
    const [activeUser, setActiveUser] = useState<IUser | undefined>(undefined)
    const [loadingSpinner, setLoadingSpinner] = useState<boolean>(true);

    useEffect(() => {
        axios.get<IUser>("/auth/session", {withCredentials: true})
            .then(res => {
                setActiveUser(res.data)
                setLoadingSpinner(false)
            })
            .catch(err => {
                setLoadingSpinner(false)
                console.log(err)
            })
    }, [])
    
    const logoutActiveUser = () => {
        setActiveUser(undefined)
    }

    const initActiveUser = (user: IUser) => {
        console.log(user)
        setActiveUser(user)
    }

    const value = {activeUser, initActiveUser, logoutActiveUser}
    if(loadingSpinner) return(
        <div>
            Loading...
        </div>
    )

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

function useUserContext() {
    const context = useContext(UserContext)
    if(context === undefined) throw new Error("Must be user within provider")
    return context
}

export {UserProvider, useUserContext}