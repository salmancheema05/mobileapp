import url from "./baseurl";
export const receiveRequests = async (receiver_id) =>{
     try{
        const result = await url.get(`receiverequest/${receiver_id}`)
        return result
    }
    catch(error){
        return error
    }
}
export const acceptRequests = async (data) =>{
    try{
       const result = await url.put(`acceptedrequest`,data)
       return result
   }
   catch(error){
       return error
   }
}
export const removeRequest = async (data) =>{
    try{
       const result = await url.delete(`deletedRequest/`,data)
       return result
   }
   catch(error){
       return error
   }
}