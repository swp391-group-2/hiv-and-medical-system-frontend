import type {
  AppointmentStat,
  StatCardStaticProps,
  FavoriteDoctor,
} from "@/types/stats";
import type { Response, ResponseSingleObject } from "@/types/types";
import axios from "axios";

export const getFeaturedStats = async (): Promise<StatCardStaticProps[]> => {
  const { data } = await axios.get<Response<StatCardStaticProps>>(``);
  return data.data;
};

export const getAppointmentStats = async (): Promise<AppointmentStat> => {
  const { data } = await axios.get<ResponseSingleObject<AppointmentStat>>(``);
  return data.data;
};

export const getFavoriteDoctors = async (): Promise<FavoriteDoctor[]> => {
  const { data } = await axios.get<Response<FavoriteDoctor>>(``);
  return data.data;
};
