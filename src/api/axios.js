
import axios from 'axios'
import qs from 'qs'
axios.interceptors.request.use(function (config) {
   
    
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    
    if(config.method === 'post') {
        config.data = qs.stringify( {
            ...config.data
        })
    } 
    return config;
  }, function (error) {
    loadinginstace.close()
    return Promise.reject(error);
})

export const Session = {
    userid : sessionStorage.getItem('userid'),
    companyid: sessionStorage.getItem('companyid'),
    exportUrl: 'http://120.24.81.27:8800/xiangmubao/cw/',
    exportUrlPc: 'http://120.24.81.27:8800/xiangmubao/p/interface/index/',
    limits: JSON.parse(sessionStorage.getItem('limits')),
    browse:'http://58.246.254.194:8012/onlinePreview?url='
}

export function Axios(reqBody, thisUrl, getFileId,sURL) {
    let data = {
        "from": "android",
        "version": "1.0",
        "appkey": "zKaw7utGcDyLsaQhD2g3IGzOakzLtfuz",
        "reqBody": reqBody
    }
    let api = ''
    let uid = ''
 
    if (reqBody.api){
        api = reqBody.api
    }
    if (sessionStorage.getItem('userid')){
        uid = sessionStorage.getItem('userid')
    }
    let AUTH_TOKEN = {
        api: api,
        uid:uid
    }
    if (getFileId){
        AUTH_TOKEN.fileid = getFileId
    }
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = JSON.stringify(AUTH_TOKEN);
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //http://172.17.0.14:8022
    //http://172.17.0.11:8081
    //http://120.24.81.27:8800
    //http://172.17.0.8:8007
    let url
    
    url = 'http://172.17.0.8:8007/xiangmubao/p/interface/' + thisUrl + '/api'
    if (sURL) {
        url = "http://120.24.81.27:8800/xiangmubao/cw/" + sURL
    }
    return axios.post(url, { str: JSON.stringify(data) }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return ({
            err: 'err',
            data: err
        })
    });

}

// 权限单独接口
export function Permission(reqBody, thisUrl, getFileId, sURL) {
    let data = {
        "from": "android",
        "version": "1.0",
        "appkey": "zKaw7utGcDyLsaQhD2g3IGzOakzLtfuz",
        "reqBody": reqBody
    }
    let api = ''
    let uid = ''
 
    if (reqBody.api){
        api = reqBody.api
    }
    if (sessionStorage.getItem('userid')){
        uid = sessionStorage.getItem('userid')
    }
    let AUTH_TOKEN = {
        api: api,
        uid:uid
    }
    if (getFileId){
        AUTH_TOKEN.fileid = getFileId
    }
    axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.headers.common['Authorization'] = JSON.stringify(AUTH_TOKEN);
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //http://172.17.0.14:8022
    //http://172.17.0.11:8081
    //http://120.24.81.27:8800
    //http://172.17.0.8:8007
    let url
    
    url = 'http://172.17.0.8:8007/xiangmubao/p/interface/' + thisUrl
    if (sURL) {
        url = "http://120.24.81.27:8800/xiangmubao/cw/" + sURL
    }
    return axios.post(url, { str: JSON.stringify(data) }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return ({
            err: 'err',
            data: err
        })
    });

}

export function AxiosExport(reqBody, thisUrl, Download) {
    let data = {
        "from": "android",
        "version": "1.0",
        "appkey": "zKaw7utGcDyLsaQhD2g3IGzOakzLtfuz",
        "reqBody": reqBody
    }
    if (Download) {
        Download: true
    } else {
        Download: false
    }

    //http://172.17.0.11:8081
    //http://120.24.81.27:8800
    return axios.post('http://120.24.81.27:8800/xiangmubao/p/interface/' + thisUrl , { str: JSON.stringify(data) }, { Download: Download }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return ({
            err: 'err',
            data: err
        })
    });

}