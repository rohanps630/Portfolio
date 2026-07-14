import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { isValidElement } from "react";
import { slugify } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Flatten heading children to their text content. String() on a React element
// yields "[object Object]", which used to desync heading ids from the TOC for
// any heading containing inline code/bold/links.
function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (isValidElement(children)) {
    return textFromChildren((children.props as { children?: ReactNode }).children);
  }
  return "";
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;

  function HeadingComponent(props: ComponentPropsWithoutRef<"h1">) {
    const id = slugify(textFromChildren(props.children));

    return (
      <Tag id={id} {...props}>
        <a href={`#${id}`} className="anchor-link no-underline hover:underline">
          {props.children}
        </a>
      </Tag>
    );
  }

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

function CustomLink(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isExternal = href.startsWith("http") || href.startsWith("//");

  if (isExternal) {
    return (
      <a {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }

  // In-page anchors keep native behavior; other internal links go through the
  // router instead of triggering full page reloads.
  if (href.startsWith("#")) {
    return <a {...props}>{props.children}</a>;
  }

  return (
    <Link {...props} href={href}>
      {props.children}
    </Link>
  );
}

import { DecisionLink } from "@/components/mdx/DecisionLink";
import { ExplorerLink } from "@/components/mdx/ExplorerLink";

const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  DecisionLink,
  ExplorerLink,
};

interface NoteContentProps {
  source: string;
}

export async function NoteContent({ source }: NoteContentProps) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  });

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border">
      {content}
    </article>
  );
}
