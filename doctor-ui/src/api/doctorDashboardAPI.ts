import axios from "axios";

const BASE_URL = "http://localhost:8080/hiv";

const getToken = () => localStorage.getItem("accessToken");

export const getMyDoctorInfo = async () => {
  const res = await axios.get(`${BASE_URL}/api/doctors/myInfo`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data.result;
};

export const getTodaySchedule = async () => {
  const today = new Date().toISOString().split("T")[0];
  const res = await axios.get(
    `${BASE_URL}/api/doctors/me/schedules?startDate=${today}&endDate=${today}`,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data.result; // List<Schedule>
};

export const getAllAppointments = async () => {
  const res = await axios.get(`${BASE_URL}/api/appointments`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data.result; // List<Appointment>
};
