import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function CommonButton({ children, onClick, type }: Props) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 ml-3"
    >
      {children}
    </Button>
  );
}
