export interface Patient {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  birthDate: string;
  hivStatus: 'positive' | 'negative';
  screeningResult?: string;
  confirmResult?: string;
  cd4?: string;
  vl?: string;
}
export const patients: Patient[] = [
  {
    id: "BN001",
    name: "Nguyễn Văn An",
    gender: "Nam",
    birthDate: "15/3/1985",
    hivStatus: "positive",
    screeningResult: "Dương tính",
    confirmResult: "Dương tính",
    cd4: "350 cells/µL",
    vl: "45,000 copies/mL"
  },
  {
    id: "BN002",
    name: "Trần Thị Bình",
    gender: "Nữ",
    birthDate: "22/7/1990",
    hivStatus: "negative",
    screeningResult: "Âm tính"
  },
  {
    id: "BN003",
    name: "Lê Văn Cường",
    gender: "Nam",
    birthDate: "5/12/1978",
    hivStatus: "positive",
    cd4: "580 cells/µL",
    vl: "Không phát hiện"
  }
];