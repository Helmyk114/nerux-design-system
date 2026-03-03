export type TextVariant = "title" | "subtitle" | "body" | "caption" | "error";

export interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
  className?: string;
}
