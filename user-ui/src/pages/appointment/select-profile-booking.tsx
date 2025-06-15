import ProfileDone from "@/components/appointmenBooking/profile-done";
import ProfileMissing from "@/components/appointmenBooking/profile-missing";

function SelectProfileBooking() {
  const hasProfile = true; // This should be replaced with actual logic to check if the user has a profile
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold text-center my-8 text-primary">
        Chọn Hồ Sơ Đặt Lịch Khám
      </h1>
      {hasProfile ? <ProfileDone /> : <ProfileMissing />}
    </div>
  );
}

export default SelectProfileBooking;
