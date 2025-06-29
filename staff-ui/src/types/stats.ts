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
  doctor: Doctor;
  totalAppointment: number;
};
