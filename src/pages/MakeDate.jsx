import { useContext, useState } from 'react'
import { Select, DatePicker, Form, Button } from 'antd'
import { appContext } from '../context/appContext'
import { makeDate } from '../client'
import { useNavigate } from 'react-router-dom'

const MakeDate = () => {

    const navigate = useNavigate()
    const { doctorsList, treatmentList, userData, messageApi } = useContext(appContext)
    const [selectedDoctor, setSelectedDoctor] = useState(0)
    const [selectedTreatment, setSelectedTreatment] = useState(0)
    const [selectedDate, setSelectedDate] = useState('')


    const doctorOptions = doctorsList.map((item) => ({
        value: item.id,
        label: item.name
    }))

    const treatmentOptions = treatmentList.map(item => ({
        value: item.id,
        label: item.name
    }))

    const submitDate = async () => {
        const data = {
            patientId: userData.id,
            doctorId: selectedDoctor,
            date: selectedDate,
            treatmentId: selectedTreatment
        }

        let res = await makeDate(data)
        if(res.status == 200){
            messageApi.open({
                type: 'success',
                content: 'Cita registrada con exito'
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
        <div className='MakeDate'>
            <h1>Agendar una nueva cita</h1>
            <Form>
                <Form.Item>
                    <Select placeholder='Seleccione un doctor' options={doctorOptions} onChange={(e) => setSelectedDoctor(e)}/>
                </Form.Item>
                <Form.Item>
                    <Select placeholder='Seleccione un tratamiento' options={treatmentOptions} onChange={(e) => setSelectedTreatment(e)}/>
                </Form.Item>
                <Form.Item>
                    <DatePicker placeholder='Seleccione una fecha' onChange={(a, b) => setSelectedDate(b)}/>
                </Form.Item>

                <Button onClick={submitDate}>Agendar cita</Button>
            </Form>
        </div>
    )
}

export default MakeDate;