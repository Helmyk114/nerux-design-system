import { Card, type CardProps as HeroCardProps } from "@heroui/react";
import clsx from "clsx";

export function CardNerux({ ...props }: HeroCardProps) {
  return <Card {...props} className={clsx("bg-(--color-surface-default) text-(--color-primary-text-default)")}>
  </Card>;
}
