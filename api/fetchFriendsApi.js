import url from "./baseurl";
export const AllFriendsApi = async (user_id) =>{
    try{
       const result = await url.get(`allfriend/${user_id}`)
       return result
   }
   catch(error){
       return error
   }
}