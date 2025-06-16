const ArvCaution = ({ list }: { list: string[] }) => {
  return (
    <div className="p-4 border rounded-lg bg-white mt-5">
      <strong className="block mb-2 text-lg">Lưu ý quan trọng</strong>
      <ul className="list-disc pl-5">
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArvCaution;
