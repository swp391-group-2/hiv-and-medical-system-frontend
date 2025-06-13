// import {
//   AppointmentFilters,
//   type Filters,
// } from "@/components/appointments/appointment-filters";

// const [filters, setFilters] = useState<Filters>({
//     search: "",
//     aptStatus: "default",
//   });

// const filtered = useMemo(() => {
//     const q = filters.search?.trim().toLowerCase() || "";

//     return appointments.filter((a) => {
//       // type check
//       const statusMatch =
//         filters.aptStatus === "default" ? true : a.status === filters.aptStatus;

//       // search check
//       const searchMatch =
//         !q ||
//         a.patientName.toLowerCase().includes(q) ||
//         a.patientPhone.toLowerCase().includes(q);

//       // only include if BOTH match
//       return statusMatch && searchMatch;
//     });
//   }, [appointments, filters]);
