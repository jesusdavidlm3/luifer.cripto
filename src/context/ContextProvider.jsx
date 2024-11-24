import { useState } from 'react'
import { appContext } from './appContext'
import { message } from 'antd'

const ContextProvider = ({children}) => {

    const [userData, setUserData] = useState('')
    const [logged, setLogged] = useState(false)
    const [deseaseList, setDeseaseList] = useState([0])
    const [treatmentList, setTreatmentList] = useState([0])
    const [doctorsList, setDoctorsList] = useState([0])
    const [messageApi, contextHolder] = message.useMessage()

    return(
        <appContext.Provider value={{
            userData,
            setUserData,
            logged,
            setLogged,
            deseaseList,
            setDeseaseList,
            treatmentList,
            setTreatmentList,
            doctorsList,
            setDoctorsList,
            messageApi,
            contextHolder,
        }}>
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider