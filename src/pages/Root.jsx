import { Outlet } from "react-router-dom"
import NavBar from '../components/NavBar'

const Root = () => {
    return(
        <div className="root">
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Root;