import { Card, type CardProps as HeroCardProps } from "@heroui/react";

export function CardTitleNerux({ children, ...props }: HeroCardProps) {
  return <Card.Title {...props}>{children}</Card.Title>;
}
