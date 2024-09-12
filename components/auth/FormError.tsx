import { RiAlertFill } from "react-icons/ri";
export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-destructive flex items-center gap-2 text-secondary-foreground p-3 rounded-md mt-5">
      <RiAlertFill />
      <p>{message}</p>
    </div>
  );
}
