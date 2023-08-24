import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

interface HeadingProps extends LucideProps {
  title: string;
  description: string;
  name: keyof typeof dynamicIconImports;
  color?: string;
  size?: number;
  bgColor?: string;
}

export const Heading = ({ title, description, name, color, size, bgColor }: HeadingProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <LucideIcon color={color} size={size} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};
