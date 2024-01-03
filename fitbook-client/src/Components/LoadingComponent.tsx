import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface IQueryLoader {
    status: string
}

const QueryLoader = ({ status, children }: PropsWithChildren<IQueryLoader>) => {
    console.log(status)
    if (status === "loading") return (
        <div style={{ "width": "100%", "display": "flex", "justifyContent": "center", "paddingTop": "25vh" }}>
            <h1>Loading...</h1>
            <div style={{ display: "none" }}>
                {children}
            </div>
        </div>
    )
    if (status === "error") return <>Error fetching data..</>
    return (
        <>{children}</>
    )
}

const initialValue = {
    setLoadingState: () => { }
}
interface IContext {
    setLoadingState: (status: string) => void
}

const QueryLoaderContext = createContext<IContext>(initialValue)

export const QueryLoaderProvider = (props: PropsWithChildren) => {
    const [status, setStatus] = useState<string>("")

    const setLoadingState = (status: string) => {
        setStatus(status)
    }

    return (
        <QueryLoaderContext.Provider value={{ setLoadingState }}>
            <QueryLoader status={status}>
                {props.children}
            </QueryLoader>
        </QueryLoaderContext.Provider>
    )
}

export const useQueryLoader = () => {
    const context = useContext(QueryLoaderContext)

    if (!context) throw new Error("useQueryLoader must be within provider");

    return context
}