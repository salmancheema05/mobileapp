import url from "./baseurl";
export const receiveRequests = async (receiver_id) => {
  try {
    const result = await url.get(`receiverequest/${receiver_id}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const acceptRequests = async (data) => {
  try {
    const { sender_id, receiver_id } = data;
    const result = await url.put(`acceptedrequest/${sender_id}/${receiver_id}`);
    return result;
  } catch (error) {
    return error;
  }
};
export const send = async (data) => {
  try {
    const result = await url.post(`sendrequest`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export const removeRequestApi = async (data) => {
  try {
    const { sender_id, receiver_id } = data;
    const result = await url.delete(
      `deletedrequest/${sender_id}/${receiver_id}`
    );
    return result;
  } catch (error) {
    return error;
  }
};
