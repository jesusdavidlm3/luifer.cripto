import { Outlet, useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar'
// import { useContext, useEffect } from "React"
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { getTreatmentList, getDeseaseList } from "../client"

const Root = () => {

    const navigate = useNavigate()
    const {setTreatmentList, setDeseaseList, logged} = useContext(appContext)

    useEffect(() => {
        navigate('/Login')
        getInfo()
    }, [])

    async function getInfo(){
        let deseaseList = await getDeseaseList()
        let treatmentList = await getTreatmentList()

        setDeseaseList(deseaseList.data)
        setTreatmentList(treatmentList.data)
    }

    return(
        <div className="root">
            {logged && <NavBar/>}
            <Outlet/>
        </div>
    )
}

export default Root;