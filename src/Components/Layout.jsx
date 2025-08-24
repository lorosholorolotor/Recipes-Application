import { Outlet, useNavigation } from "react-router-dom"
import { Header } from "./Header"
import {Loader} from "../Pages/RecipesPage"
export const Layout = ({linksArr}) => {
    const navigation = useNavigation();
    const isLoading = navigation.state !== "idle";
    return(
        <div className="layout">
            <Header linksArr={linksArr} />
            {isLoading ? <Loader/>:<Outlet />}
        </div>
    )
}