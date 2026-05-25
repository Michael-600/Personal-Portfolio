"use client";

import React, { useState, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";

type Color = "cyan" | "green" | "amber" | "red" | "blue" | "purple";
type Size = "small" | "medium" | "large";

interface BaseProps {
  children: ReactNode;
  color?: Color;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

interface ButtonProps extends BaseProps {
  href?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface AnchorProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

type Props = ButtonProps | AnchorProps;

/**
 * Minimal Minecraft-style chunky button.
 *
 * - Brand-aligned colors (cyan / amber / blue) by default; classic green/red/purple still available.
 * - Uses the Press Start 2P pixel font for the label.
 * - Renders as a <Link>/<a> when `href` is set, otherwise a <button>.
 *
 * Designed to be used sparingly — a touch of personality for primary CTAs.
 */
export function MinecraftButton(props: Props) {
  const {
    children,
    color = "cyan",
    size = "medium",
    disabled = false,
    className = "",
  } = props;

  const [pressed, setPressed] = useState(false);

  const palette: Record<Color, { bg: string; dark: string; text: string }> = {
    cyan: { bg: "#06b6d4", dark: "#0e7490", text: "#06121a" },
    green: { bg: "#10b981", dark: "#065f46", text: "#06121a" },
    amber: { bg: "#f59e0b", dark: "#92400e", text: "#1a1207" },
    red: { bg: "#ef4444", dark: "#991b1b", text: "#fff5f5" },
    blue: { bg: "#3b82f6", dark: "#1e40af", text: "#04101f" },
    purple: { bg: "#8b5cf6", dark: "#5b21b6", text: "#0d061f" },
  };

  const sizing: Record<Size, { padding: string; fontSize: string; offset: number }> = {
    small: { padding: "8px 14px", fontSize: "9px", offset: 3 },
    medium: { padding: "12px 22px", fontSize: "11px", offset: 4 },
    large: { padding: "16px 30px", fontSize: "13px", offset: 5 },
  };

  const c = palette[color];
  const s = sizing[size];

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-pixel), ui-monospace, monospace",
    color: c.text,
    backgroundColor: disabled ? "#555" : c.bg,
    border: "none",
    borderRadius: "4px",
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    textShadow: "1px 1px 0 rgba(0,0,0,0.18)",
    boxShadow: pressed
      ? `inset 2px 2px 0 rgba(0,0,0,0.25), inset -2px -2px 0 rgba(255,255,255,0.15)`
      : `${s.offset}px ${s.offset}px 0 0 ${c.dark}, inset 1px 1px 0 rgba(255,255,255,0.35), inset -1px -1px 0 rgba(0,0,0,0.18)`,
    transform: pressed ? `translate(${s.offset}px, ${s.offset}px)` : "translate(0, 0)",
    transition: "transform 80ms ease-out, box-shadow 80ms ease-out, filter 120ms ease-out",
    outline: "none",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const interactionHandlers = {
    onMouseDown: () => !disabled && setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => !disabled && setPressed(true),
    onTouchEnd: () => setPressed(false),
  };

  if ("href" in props && props.href) {
    const isExternal = props.external ?? props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={props.onClick}
          {...interactionHandlers}
          style={baseStyle}
          className={className}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        {...interactionHandlers}
        style={baseStyle}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={(props as ButtonProps).onClick}
      disabled={disabled}
      {...interactionHandlers}
      style={baseStyle}
      className={className}
    >
      {children}
    </button>
  );
}

export default MinecraftButton;
