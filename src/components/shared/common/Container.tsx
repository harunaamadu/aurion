import { cn } from "@/lib/utils";
import React from "react";

type ContainerElement =
  | "div"
  | "section"
  | "main"
  | "article"
  | "aside"
  | "header"
  | "footer";

interface ContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  as?: ContainerElement;
  className?: string;
}

const Container = ({
  children,
  as: Element = "div",
  className,
  ...props
}: ContainerProps) => {
  return (
    <Element
      className={cn(
        "flex flex-col w-full h-full p-4 sm:px-6 lg:px-10 max-w-360 mx-auto",
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Container;
