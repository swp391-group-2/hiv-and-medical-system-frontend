interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({
  message = "Lỗi khi tải dữ liệu",
}: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-destructive">{message}</p>
    </div>
  );
};
