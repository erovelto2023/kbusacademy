"use client";
import React, { useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";

function Element({ attributes, children, element }: any) {
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    default:
      return <p {...attributes}>{children}</p>;
  }
}

function Leaf({ attributes, children, leaf }: any) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
}

interface SlateRendererProps {
  value: string | Descendant[];
}

const SlateRenderer: React.FC<SlateRendererProps> = ({ value }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  let parsedValue: Descendant[] = [];
  try {
    parsedValue = typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    parsedValue = [{ type: "paragraph", children: [{ text: "" }] }];
  }
  return (
    <Slate editor={editor} initialValue={parsedValue} onChange={() => {}}>
      <Editable
        renderElement={props => <Element {...props} />}
        renderLeaf={props => <Leaf {...props} />}
        readOnly
        className="prose dark:prose-invert min-h-[200px] max-w-none"
      />
    </Slate>
  );
};

export default SlateRenderer;
