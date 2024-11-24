import { Button, Input, DatePicker } from 'antd'
import { getAllDates, getDates } from '../client';
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
        let res = await getDates(userData.id)
        if(res.status == 200){
            setShowList(res.data)
            console.log(res)
        }
    }

    return(
        <div className="CheckDates">
            {/* <Input.Search /> */}

            <div className='listContainer'>
                { showList.map((item) => (
                    <div className='listItem'>
                        <h1>Dr. {search(doctorsList, item.doctorId).name} - Fecha: {item.date}</h1>
                        <h2>Tratamiento: {search(treatmentList, item.treatmentId).name}</h2>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default CheckDates;