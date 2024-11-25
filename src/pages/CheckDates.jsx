import { Button, Input, DatePicker, Tooltip } from 'antd'
import { getAllDates, getDates, getDoctorsDate } from '../client';
import { useContext, useState, useEffect } from 'react';
import { appContext } from '../context/appContext';
import { search } from '../functions/lists';

const CheckDates = () => {

    const {userData, doctorsList, treatmentList} = useContext(appContext)

    const [showList, setShowList] = useState([])

    useEffect(() => {
        fetchDates()
    }, [])

    async function fetchDates() {
        if(userData.type == 0){
            let res = await getAllDates()
            if(res.status == 200){
                setShowList(res.data)
            }
        }else if(userData.type == 1){
            let res = await getDoctorsDate(userData.id)
            if(res.status == 200){
                setShowList(res.data)
            }
        }else if(userData.type == 2){
            let res = await getDates(userData.id)
            if(res.status == 200){
                setShowList(res.data)
            }
        }
    }

    return(
        <div className="CheckDates">
            <h1>Citas agendadas</h1>
            <div className='listContainer'>
                { showList.map((item) => (
                    <div className='listItem'>
                        { userData.type == 0 && <h1>Dr. {search(doctorsList, item.doctorId).name} - Paciente: {item.name} - Fecha: {item.date}</h1> }
                        { userData.type == 1 && <h1>Paciente: {item.name} - Fecha: {item.date}</h1> }
                        { userData.type == 2 && <h1>Dr. {search(doctorsList, item.doctorId).name} - Fecha: {item.date}</h1> }
                        <h2>Tratamiento: {search(treatmentList, item.treatmentId).name}</h2>
                    </div>
                )) }
            </div>
            <Tooltip title='En este modulo se le suministrara la informacion de las citas correspondientes a usted, en caso de que usted sea un administrador se le suministrar la informacion de todas las citas existentes.'>
                    <p>Ayuda</p>
            </Tooltip>
        </div>
    )
}

export default CheckDates;