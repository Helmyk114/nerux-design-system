import { CardHeader, type CardProps as HeroCardProps } from "@heroui/react";

export function CardHeaderNerux({ children, ...props }: HeroCardProps) {
  return <CardHeader {...props}>{children}</CardHeader>;
}
