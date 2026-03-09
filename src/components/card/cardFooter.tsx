import { CardFooter, type CardProps as HeroCardProps } from "@heroui/react";

export function CardFooterNerux({ children, ...props }: HeroCardProps) {
  return <CardFooter {...props}>{children}</CardFooter>;
}
