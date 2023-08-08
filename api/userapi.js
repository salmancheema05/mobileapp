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
export const profileImageApi = async (data) =>{
    try{
        const resultData = await url.post('/profileimage',data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        return resultData
   }
   catch(error){
       return error
   }
}