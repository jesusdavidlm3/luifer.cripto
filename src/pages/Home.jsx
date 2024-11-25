import { Tooltip } from 'antd'

const Home = () => {
    return(
        <div className="Home">
            <Tooltip title='Ya ha logrado iniciar sesion, en la barra de navegacion tiene disponible un menu con las opciones disponibles para usted.'>
                <p>Ayuda</p>
            </Tooltip>
        </div>
    )
}

export default Home;