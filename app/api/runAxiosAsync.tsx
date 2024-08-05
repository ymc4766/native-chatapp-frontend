import { AxiosError, AxiosResponse } from "axios";
import { showMessage } from "react-native-flash-message";

export const runAxiosAsync = async <T,>(
  promise: Promise<AxiosResponse<T>>
): Promise<T | null> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    let message = (error as any).message;
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response) {
        message = response.data.message || "An error occurred";
      } else if (error.request) {
        message = "No response received from the server";
      } else {
        message = "Error setting up the request";
      }
    }
    showMessage({ message, type: "danger" });
    return null;
  }
};
