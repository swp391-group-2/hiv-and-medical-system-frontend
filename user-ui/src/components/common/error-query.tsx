import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorQueryProps {
  error?: string | Error;
  message?: string;
  onRetry?: () => void;
}

function ErrorQuery({ error, message, onRetry }: ErrorQueryProps) {
  const errorMessage =
    message ||
    (error instanceof Error ? error.message : error) ||
    "An error occurred";

  return (
    <div className="max-w-md mx-auto">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">{errorMessage}</AlertDescription>
      </Alert>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="destructive"
          size="sm"
          className="mt-3 w-full"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorQuery;
