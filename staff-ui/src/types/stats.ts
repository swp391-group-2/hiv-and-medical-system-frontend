export type AppointmentStat = {
  service: string;
  count: number;
  percentage: number;
};

export type StatCardStaticProps = {
  title: string;
  value: string;
  change: string;
  isGrowing: boolean;
};
