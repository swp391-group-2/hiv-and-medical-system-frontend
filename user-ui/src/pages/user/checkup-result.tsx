import CheckUpResultList from "@/components/user/result/checkup-rs-list";
import {
  cd4Result,
  checkUpList,
  viralLoadResult,
} from "@/raw-data/result-data";

const CheckUpResult = () => {
  return (
    <section className="w-full mt-7 mr-10">
      <h1 className="text-3xl font-bold mb-5">Kết quả khám</h1>
      <CheckUpResultList
        list={checkUpList}
        viral={viralLoadResult}
        cd4={cd4Result}
      />
    </section>
  );
};

export default CheckUpResult;
