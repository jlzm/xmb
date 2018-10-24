import { Axios } from './axios'
import { Session } from './axios'

export const getData = {
    customerList: getCustomerList(),
}

function getCustomerList(){
    console.log(Session.companyid)
    let reqBody = {
        "api": "getcustomerlist",
        "companyid": Session.companyid,
    }

    Axios(reqBody, 'index').then((res) => {
        console.log(res)
        if (res.state == 10001) {
            return res.data
            console.log(getData)
        } else {
            return res.state
        }
    })
}

