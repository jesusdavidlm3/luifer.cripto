import { useContext } from "react";
import { appContext } from "../context/appContext";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const {userData, setUserData, setLogged} = useContext(appContext)
    const navigate = useNavigate()

    const logOut = () => {
        setLogged(false)
        setUserData('')
        navigate('/Login')
    }

    return(
        <div className="NavBar">
            <h1>Bienvenido {userData.name}</h1>
            <Button variant="solid" color="danger" onClick={logOut}>Cerrar sesion</Button>
        </div>
    )
}

export default NavBar;