import { Input, Form, Button } from 'antd'

const Register = () => {
    return(
        <div className="Register">
            <h1>Bienvenido</h1>
            <Form>
                <Form.Item rules={[{type: 'email'}]}>
                    <Input placeholder='Correo'/>
                </Form.Item>
                <Form.Item>
                    <Input.Password placeholder='Contraseña'/>
                </Form.Item>
                <Button type='primary'>Iniciar sesion</Button>
            </Form>
        </div>
    )
}

export default Register;