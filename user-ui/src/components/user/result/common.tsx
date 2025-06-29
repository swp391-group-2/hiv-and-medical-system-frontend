export interface GenericListProps<T> {
  /** the data array to render */
  items: T[];
  /** how to render each item */
  renderItem: (item: T) => React.ReactNode;
  /** optional header above the <ul> */
  header?: React.ReactNode;
  /** text to show when items is empty */
  emptyMessage?: string;
  /** <ul> container classes */
  className?: string;
  /** <span> (empty) classes */
  emptyClassName?: string;
}

export function GenericList<T>({
  items,
  renderItem,
  header,
  emptyMessage = "Không có kết quả",
  className = "w-full border rounded-2xl border-gray-300 p-4 shadow-sm",
  emptyClassName = "block w-full text-center text-zinc-500 py-8 italic",
}: GenericListProps<T>) {
  if (items.length === 0) {
    return <span className={emptyClassName}>{emptyMessage}</span>;
  }

  return (
    <>
      {header}
      <ul className={className}>{items.map((item) => renderItem(item))}</ul>
    </>
  );
}

const RsNote = ({ note }: { note: string }) => {
  return (
    <div>
      <div className="mb-2 flex">
        <span className="w-32 text-zinc-700 font-medium">Ghi chú:</span>
      </div>
      <input
        type="text"
        value={note}
        disabled
        className="w-full bg-zinc-100 rounded px-4 py-3 text-zinc-600 border-none cursor-not-allowed outline-none"
      />
    </div>
  );
};

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

export { RsNote, InfoGroup, InfoTextRow };
