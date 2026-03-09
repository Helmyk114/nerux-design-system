import { CardBody, type CardProps as HeroCardProps } from "@heroui/react";

export function CardBodyNerux({ children, ...props }: HeroCardProps) {
  return <CardBody {...props}>{children}</CardBody>;
}
