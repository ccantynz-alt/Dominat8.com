import * as React from "react";

export type D8SectionTone = "plain" | "glass" | "dark" | "light";

export type D8SectionProps = {
  children?: React.ReactNode;
  className?: string;

  // Optional framing props used by marketing pages
  eyebrow?: string;
  title?: string;
  lead?: string;
  tone?: D8SectionTone;
};

export default function D8Section(props: D8SectionProps): JSX.Element {
  const { children, className, eyebrow, title, lead } = props;

  return (
    <section className={className}>
      {(eyebrow || title || lead) ? (
        <header style={{ marginBottom: 16 }}>
          {eyebrow ? (
            <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.7, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2 style={{ margin: "6px 0 0 0" }}>{title}</h2>
          ) : null}
          {lead ? (
            <p style={{ margin: "10px 0 0 0", opacity: 0.85 }}>{lead}</p>
          ) : null}
        </header>
      ) : null}

      {children}
    </section>
  );
}
