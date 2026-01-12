import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

export const sendChatMessage = async (message, userId) => {
  const response = await axiosInstance.post(
    API_PATHS.CHAT.SEND_MESSAGE,
    {
      message,
      userId,
    }
  );

  return response.data;
};
