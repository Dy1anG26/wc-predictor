import { CSSProperties, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function GlassCard({ children, style, className }: GlassCardProps) {
  return (
    <div className={`glass-card${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}
