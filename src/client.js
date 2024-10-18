import axios, { Axios } from "axios";

const url = 'http://localhost:3000'

export async function getDeseaseList(){
    try{
        let res = await axios.get(`${url}/api/getDeseaseList`)
        console.log(res)
        return res
    }catch(err){
        return err
    }
}

export async function getTreatmentList(){
    try{
        let res = await axios.get(`${url}/api/getTreatmentList`)
        return res
    }catch(err){
        return res
    }
}

export async function login(data){
    try{
        let res = await axios.post(`${url}/api/login`, data)
        return res
    }catch(err){
        return err
    }
}

export async function register(data){
    try{
        let res = await axios.post(`${url}/api/register`, data)
        return res
    }catch(err){
        return err
    }
}