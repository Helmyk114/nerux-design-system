import { useCallback, useEffect, useRef } from "react";
import { Button as HeroButton, Spinner } from "@heroui/react";
import clsx from "clsx";
import type { ButtonProps } from "./button.types";
import { buttonColorVariants } from "./button.variants";

const LINK_ONLY_PROPS = [
  "href",
  "target",
  "rel",
  "download",
  "hrefLang",
  "ping",
  "referrerPolicy",
  "render",
] as const;

function withoutLinkProps<T extends object>(props: T): T {
  const sanitized = { ...props } as Record<string, unknown>;

  for (const key of LINK_ONLY_PROPS) {
    delete sanitized[key];
  }

  return sanitized as T;
}

export function ButtonNerux({
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  isDisabled,
  startContent,
  endContent,
  children,
  className,
  ref,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as { current: HTMLButtonElement | null }).current = node;
      }
    },
    [ref],
  );

  useEffect(() => {
    const node = buttonRef.current;

    if (!node) return;

    if (isLoading) {
      node.setAttribute("aria-busy", "true");
    } else {
      node.removeAttribute("aria-busy");
    }
  }, [isLoading]);

  return (
    <HeroButton
      {...withoutLinkProps(props)}
      ref={setRef}
      variant={variant}
      size={size}
      type={type}
      isDisabled={isDisabled}
      isPending={isLoading}
      className={clsx(buttonColorVariants[variant], className)}
    >
      {isLoading ? <Spinner size="sm" color="current" /> : startContent}
      {children}
      {endContent}
    </HeroButton>
  );
}
