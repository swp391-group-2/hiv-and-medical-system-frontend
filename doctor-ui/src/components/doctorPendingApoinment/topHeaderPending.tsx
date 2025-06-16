interface TopHeaderPendingProps {
  total: number;
}

export const TopHeaderPending: React.FC<TopHeaderPendingProps> = ({
  total,
}) => {
  return (
    <div className="mb-6 flex space-x-4">
      <div className="flex-1 bg-blue-50 border border-blue-300 rounded p-4 text-center">
        <div className="text-sm">Tổng chờ</div>
        <div className="text-2xl font-bold text-blue-600">{total}</div>
      </div>
    </div>
  );
};
