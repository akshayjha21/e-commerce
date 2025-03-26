// import {apierror} from "../utils/apierror.js"
import {apiresponse} from "../utils/apiresponse.js"
import {asynchandler} from "../utils/asynchandler.js"

const healthcheck=asynchandler(async(req,res)=>{
    return res
    .status(200)
    .json(apiresponse(200,"Ok","health route is good"))
})

export {healthcheck}