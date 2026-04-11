import { Card, type CardProps as HeroCardProps } from "@heroui/react";

export function CardHeaderNerux({ children, ...props }: HeroCardProps) {
  return <Card.Header {...props}>{children}</Card.Header>;
}
