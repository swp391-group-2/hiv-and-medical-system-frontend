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

export type WeeklyStatsData = {
  weekRange: string;
  stats: {
    title: string;
    value: string;
    change: string;
    growing: boolean;
  }[];
};

export type WeeklyStatsResponse = {
  code: number;
  success: boolean;
  message: string;
  data: WeeklyStatsData[];
};
