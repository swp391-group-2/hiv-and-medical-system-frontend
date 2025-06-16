export function PatientCell({ name, phone }: { name: string; phone: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-gray-500">{phone}</span>
    </div>
  );
}
