import axios, { Axios } from "axios";

const url = 'http://localhost:3000'

export async function getDeseaseList(){
    try{
        let res = await axios.get(`${url}/api/getDeseaseList`)
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

export async function getDoctors() {
    try{
        let res = await axios.get(`${url}/api/getDoctors`)
        return res
    }catch(err){
        return err
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

export async function getAllDates(){
    try{
        let res = await axios.get(`${url}/api/getAllDates`)
        return res
    }catch(err){
        return err
    }
}

export async function getDates(id) {
    try{
        let res = await axios.get(`${url}/api/getDates/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function getDoctorsDate(id){
    try{
        let res = await axios.get(`${url}/api/getDoctorsDate/${id}`)
        return res
    }catch(err){
        return err
    }
}

export async function makeDate(data) {
    try{
        let res = await axios.post(`${url}/api/makeDate`, data)
        return res
    }catch(err){
        return err
    }
}