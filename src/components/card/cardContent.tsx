import { Card, type CardProps as HeroCardProps } from "@heroui/react";

export function CardContentNerux({ children, ...props }: HeroCardProps) {
  return <Card.Content {...props}>{children}</Card.Content>;
}
