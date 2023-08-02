import url from "./baseurl";
export const loginApi = async (data) =>{
     try{
        const result = await url.post('/login',data)
        return result
    }
    catch(error){
        return error
    }
}