import type { Doctor } from "./doctor";

export type ServiceTypeStat = {
  service: string;
  count: number;
  percentage: number;
};

export type StatCardStaticProps = {
  title: string;
  value: string;
  change: string;
  growing: boolean;
};

export type FavoriteDoctor = {
  id: number;
  name: string;
  specialization: string;
  totalAppointment: number;
};

export type FavoriteDoctorV2 = {
  doctor: Doctor;
  totalAppointment: number;
};
