import { useState } from 'react'
import { appContext } from './appContext'

const ContextProvider = ({children}) => {

    const [userData, setUserData] = useState('')
    const [logged, setLogged] = useState(false)
    const [deseaseList, setDeseaseList] = useState([0])
    const [treatmentList, setTreatmentList] = useState([0])

    return(
        <appContext.Provider value={{
            userData,
            setUserData,
            logged,
            setLogged,
            deseaseList,
            setDeseaseList,
            treatmentList,
            setTreatmentList
        }}>
            {children}
        </appContext.Provider>
    )
}

export default ContextProvider