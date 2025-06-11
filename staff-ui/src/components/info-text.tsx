const InfoGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

const InfoTextRow = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-700 font-medium">{label}:</span>
      <span className="text-zinc-900">{data}</span>
    </div>
  );
};

export { InfoGroup, InfoTextRow };
