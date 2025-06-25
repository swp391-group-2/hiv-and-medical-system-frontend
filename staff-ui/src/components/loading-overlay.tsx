import { Loader2 } from "lucide-react";

export function LoadingOverlay({ message }: { message: string }) {
  return (
    <div
      className="
        fixed inset-0
        z-50
        flex items-center justify-center
        bg-gray-800/50
      "
    >
      <Loader2 className="h-12 w-12 animate-spin text-white" />
      {message}
    </div>
  );
}

export function InternalLoading({ message }: { message: string }) {
  return (
    <div className="flex z-10 items-center justify-center w-full">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      {message}
    </div>
  );
}
