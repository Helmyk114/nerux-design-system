export type TextVariant = "title" | "subtitle" | "body" | "caption" | "error";
export type WeightVariant = "light" | "regular" | "medium" | "semibold" | "bold";
export type ColorVariant = "primary" | "secondary" | "error" | "success" | "warning";

export interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
  color?: ColorVariant;
  weight?: WeightVariant;
  as?: React.ElementType;
  italic?: boolean;
}
