import { toast } from "react-toastify";

export const error = (message) => {
  toast.error(message);
};

export const success = (message) => {
  toast.success(message);
};
