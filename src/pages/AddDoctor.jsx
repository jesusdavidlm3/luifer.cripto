import { Form, Input, Button, InputNumber } from 'antd'
import { encrypt } from '../functions/encrypt'
import { register } from '../client'
import { useContext } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const AddDoctor = () => {

    const {messageApi, userData} = useContext(appContext)
    const navigate = useNavigate()
    console.log(userData)

    const submitDoc = async () => {
        const idField = document.getElementById('idField').value
        const nameField = document.getElementById('nameField').value
        const usernameField = document.getElementById('usernameField').value
        const emailField = document.getElementById('emailField').value
        const passwordField = document.getElementById('passwordField').value
        
        const data = {
            id: idField,
            name: nameField,
            username: usernameField,
            email : emailField,
            password: await encrypt(passwordField),
            type: 1
        }

        let res = await register(data)
        if(res.status == 200){
            messageApi.open({
                type: 'success',
                Content: 'Doctor registrado con exito'
            })
            navigate('/home')
        }else{
            messageApi.open({
                type: 'error',
                content: 'ah ocurrido un error'
            })
        }
    }

    return(
        <div className='AddDoctor'>
            <h1>Registrar nuevo doctor</h1>
            <Form>
                <Form.Item name='idField'>
                    <InputNumber placeholder='Cedula'/>
                </Form.Item>
                <Form.Item name='nameField'>
                    <Input placeholder='Nombre'/>
                </Form.Item>
                <Form.Item name='usernameField'>
                    <Input placeholder='Usuario'/>
                </Form.Item>
                <Form.Item name='emailField' rules={[{type: 'email', message: 'Ingrese un correo valido'}]}>
                    <Input placeholder='Correo'/>
                </Form.Item>
                <Form.Item name='passwordField'>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>
                <Button onClick={submitDoc}>Registrar</Button>
            </Form>
        </div>
    )
}

export default AddDoctor;