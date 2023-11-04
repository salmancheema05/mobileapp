import url from "./baseurl";
export const searchPeople = async (data) => {
  try {
    const { userid, search } = data;
    // console.log(userid, search);
    const result = await url.get(`searchpeople/${userid}/${search}`);
    return result;
  } catch (error) {
    return error;
  }
};
