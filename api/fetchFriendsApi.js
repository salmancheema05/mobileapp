import url from "./baseurl";
export const AllFriendsApi = async (user_id) => {
  try {
    const result = await url.get(`allfriend/${user_id}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const getChats = async (data) => {
  try {
    const { senderid, receiverid } = data;
    const result = await url.get(`fetchchats/${senderid}/${receiverid}`);
    return result;
  } catch (error) {
    return error;
  }
};
