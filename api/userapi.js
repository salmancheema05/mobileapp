import url from "./baseurl";
export const loginApi = async (data) => {
  try {
    const result = await url.post("/login", data);
    return result;
  } catch (error) {
    return error;
  }
};
export const logoutApi = async (data) => {
  try {
    const result = await url.post("/logout", data);
    return result;
  } catch (error) {
    return error;
  }
};
export const signupApi = async (data) => {
  try {
    const result = await url.post("/signup", data);
    return result;
  } catch (error) {
    return error;
  }
};
export const profileImageApi = async (data) => {
  try {
    const resultData = await url.post("/profileimage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resultData;
  } catch (error) {
    return error;
  }
};
export const GetprofileImageApi = async (user_id) => {
  try {
    const resultData = await url.get(`/userprofile/${user_id}`);
    return resultData;
  } catch (error) {
    return error;
  }
};
