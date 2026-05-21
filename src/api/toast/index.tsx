import axios from "@/untils/axios";
import { ToastSetting } from "@/types/toast";

export const getToast = async () => {
  const res = await axios(`/api/toast-setting/`);
  return res.data;
};

export const updateToast = async (id: string, data: Partial<ToastSetting>) => {
  const res = await axios.put(`/api/toast-setting/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteToastField = async (id: string, field: string) => {
  const res = await axios.delete(`/api/toast-setting/${id}`, {
    data: { field },
    withCredentials: true,
  });
  return res.data;
};

export const createToast = async (data: ToastSetting) => {
  const res = await axios.post(`/api/toast-setting`, data, {
    withCredentials: true,
  });
  return res.data;
};
