import { compileMDX } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;

  function HeadingComponent(props: ComponentPropsWithoutRef<"h1">) {
    const text =
      typeof props.children === "string"
        ? props.children
        : String(props.children ?? "");
    const id = slugify(text);

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

  return <a {...props}>{props.children}</a>;
}

const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
};

interface BlogContentProps {
  source: string;
}

export async function BlogContent({ source }: BlogContentProps) {
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
