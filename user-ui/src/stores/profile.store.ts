import type { UserProfileValues } from "@/types/userProfile.type";
import { create } from "zustand";

interface ProfileStore {
  profile: UserProfileValues;
  setProfile: (profile: UserProfileValues) => void;
}

const initialProfile: UserProfileValues = {
  patientId: "",
  userId: "",
  email: "",
  fullName: "",
  userStatus: "",
  patientCode: "",
  dob: "",
  gender: "",
  address: "",
  phoneNumber: "",
  healthInsurance: "",
  identificationCard: "",
  occupation: "",
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: initialProfile,
  setProfile: (profile: UserProfileValues) => set({ profile }),
}));
