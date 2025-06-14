const InfoGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

const InfoTextRow = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{data}</span>
    </div>
  );
};

export { InfoGroup, InfoTextRow };
