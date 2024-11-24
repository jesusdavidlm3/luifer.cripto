import { useContext, useState } from "react";
import { appContext } from "../context/appContext";
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const [menuOpenHandler, setMenuOpenHandler] = useState(false)
    const {userData, setUserData, setLogged} = useContext(appContext)
    const navigate = useNavigate()

    const logOut = () => {
        setLogged(false)
        setUserData('')
        navigate('/Login')
    }

    return(
        <>
            <div className="NavBar">
                <h1>Bienvenido {userData.name}</h1>
                <div>
                    <Button variant="solid" color="danger" onClick={logOut}>Cerrar sesion</Button>
                    <Button onClick={() => setMenuOpenHandler(true)}>Menu</Button>
                </div>
            </div>
            <Drawer title='Menu' onClose={() => setMenuOpenHandler(false)} open={menuOpenHandler}>
                {userData.type == 0 && <Button type="link" onClick={() => {navigate('/AddDoctor'); setMenuOpenHandler(false)}}>Agregar doctor</Button>}
                {userData.type == 2 && <Button type="link" onClick={() => {navigate('/MakeDate'); setMenuOpenHandler(false)}}>Agendar cita</Button>}
                {userData != 0 && <Button type="link" onClick={() => {navigate('/CheckDates'); setMenuOpenHandler(false)}}>Consultar citas</Button>}
            </Drawer>
        </>
    )
}

export default NavBar;