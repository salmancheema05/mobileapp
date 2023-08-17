import url from "./baseurl";
export const searchPeople = async (search) =>{
     try{
        const result = await url.get(`searchpeople/${search}`)
        return result
    }
    catch(error){
        return error
    }
}