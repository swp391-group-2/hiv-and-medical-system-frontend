import logoImg from "../assets/images/logo-hiv.png";

function Logo() {
  return (
    <div className="flex items-center gap-[8px]">
      <img className="w-[40px] rounded-sm" src={logoImg} alt="HIVCare" />
      <h2 className="text-2xl font-bold text-sky-500">Aura HIV</h2>
    </div>
  );
}

export default Logo;
