import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar'
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { getTreatmentList, getDeseaseList, getDoctors } from "../client"

const Root = () => {

    const navigate = useNavigate()
    const {setTreatmentList, setDeseaseList, setDoctorsList, logged, contextHolder} = useContext(appContext)

    useEffect(() => {
        navigate('/Login')
        getInfo()
    }, [])

    async function getInfo(){
        let deseaseList = await getDeseaseList()
        let treatmentList = await getTreatmentList()
        let doctorsList = await getDoctors()

        setDeseaseList(deseaseList.data)
        setTreatmentList(treatmentList.data)
        setDoctorsList(doctorsList.data)
    }

    return(
        <div className="root">
            {contextHolder}
            {logged && <NavBar/>}
            <Outlet/>
        </div>
    )
}

export default Root;