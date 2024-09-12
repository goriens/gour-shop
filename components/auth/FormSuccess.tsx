import { FaCheckCircle } from "react-icons/fa";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-teal-400 flex items-center gap-2 text-secondary-foreground p-3 rounded-md mt-5">
      <FaCheckCircle />
      <p>{message}</p>
    </div>
  );
}
