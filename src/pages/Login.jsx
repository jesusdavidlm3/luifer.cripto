import { Input, Form, Button, message } from 'antd'
import { encrypt } from '../functions/encrypt'
import { login } from '../client'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { appContext } from '../context/appContext'

const Login = () => {

    const navigate = useNavigate()
    const { setLogged, setUserData } = useContext(appContext)
    const [messageApi, contextHolder] = message.useMessage()

    const submitLogin = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const data = {
            username: username,
            password: await encrypt(password)
        }

        let res = await login(data)
        if(res.status == 200){
            setLogged(true)
            setUserData(res.data)
            navigate('/Home')
        }else{
            console.log(res)
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Login">
            {contextHolder}
            <Form className='Form'>
                <h1>Bienvenido</h1>
                <Form.Item name='username' className='field'>
                    <Input placeholder='Usuario'/>
                </Form.Item>
                <Form.Item name='password' className='field'>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>
                <Button type='primary' onClick={submitLogin}>Iniciar sesion</Button>
                <h4 onClick={() => navigate('/Register')}>Registrarse</h4>
            </Form>
        </div>
    )
}

export default Login;