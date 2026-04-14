import { Card, type CardProps as HeroCardProps } from "@heroui/react";

export function CardFooterNerux({ children, ...props }: HeroCardProps) {
  return <Card.Footer {...props}>{children}</Card.Footer>;
}
