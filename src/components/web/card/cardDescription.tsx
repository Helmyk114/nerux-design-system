import { Card, type CardProps as HeroCardProps } from "@heroui/react";

export function CardDescriptionNerux({ children, ...props }: HeroCardProps) {
  return <Card.Description {...props}>{children}</Card.Description>;
}
