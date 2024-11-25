import { Input, Form, Button, Select, message, Tooltip } from 'antd'
import { register } from '../client'
import { useContext, useState } from 'react'
import { encrypt } from '../functions/encrypt'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../context/appContext'

const Register = () => {

    const navigate = useNavigate()
    const [selectedDisease, setSelectedDesease] = useState(0)
    const [messageApi, contextHandler] = message.useMessage()
    const {deseaseList} = useContext(appContext)

    let deseaseOptions = []
    deseaseList.map((item) => {
        if(deseaseOptions == []){
            deseaseOptions = [{value: item.id, label: item.name}]
        }else{
            deseaseOptions = [...deseaseOptions, {value: item.id, label: item.name}]
        }
    })

    const submitRegister = async () => {
        const id = document.getElementById('id').value
        const name = document.getElementById('name').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const data ={
            id: id,
            name: name,
            username: username,
            email: email,
            password: await encrypt(password),
            diseaseId: selectedDisease,
            type: 2
        }

        let res = await register(data)
        if(res.status == 200){
            messageApi.open({
                type: 'success',
                content: 'Usuario registrado con exito'
            })
            navigate('/login')
        }else{
            console.log(res)
            messageApi.open({
                type: 'error',
                content: 'ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Register">
            {contextHandler}
            <h1>Bienvenido</h1>
            <Form  className='Form'>
                <Form.Item name='id' className='field'>
                    <Input placeholder='Cedula'/>
                </Form.Item>
                <Form.Item name='name'  className='field'>
                    <Input placeholder='Nombre'/>
                </Form.Item>
                <Form.Item name='username'  className='field'>
                    <Input placeholder='Usuario'/>
                </Form.Item>
                <Form.Item rules={[{type: 'email', message: 'Ingrese un correo valido'}]} name='email'  className='field'>
                    <Input placeholder='Correo'/>
                </Form.Item>
                <Form.Item name='password'  className='field'>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>
                <Form.Item label='Enfermedad'  className='field'>
                    <Select onChange={(e) => setSelectedDesease(e)} options={deseaseOptions}/>
                </Form.Item>
                <Button type='primary' onClick={submitRegister}>Registrarse</Button>
                <h4 onClick={() => navigate('/Login')}>Iniciar sesion</h4>
            </Form>
            <Tooltip title='En este modulo usted podra registrarse como paciente ingresando su informacion para posteriormente iniciar sesion'>
                <p>Ayuda</p>
            </Tooltip>
        </div>
    )
}

export default Register;