"use client";
import React, { useMemo, useCallback, useState, useRef } from "react";
import { createEditor, Descendant, Editor, BaseElement, Transforms } from "slate";

// Define a custom element type for Slate
export type CustomElement =
  | { type: 'paragraph'; align?: string; children: Descendant[] }
  | { type: 'heading-one' | 'heading-two' | 'heading-three'; align?: string; children: Descendant[] }
  | { type: 'bulleted-list' | 'numbered-list'; align?: string; children: Descendant[] }
  | { type: 'list-item'; align?: string; children: Descendant[] }
  | { type: 'blockquote'; align?: string; children: Descendant[] }
  | { type: 'link'; url: string; children: Descendant[] }
  | { type: 'image'; url: string; align?: string; children: Descendant[] }
  | { type: 'code-block'; align?: string; children: Descendant[] }
  | { type: 'hr'; align?: string; children: Descendant[] }
  | { type: 'table'; align?: string; children: CustomElement[] }
  | { type: 'table-row'; align?: string; children: CustomElement[] }
  | { type: 'table-cell'; align?: string; children: Descendant[] }
  | { type: 'callout'; align?: string; children: Descendant[] }
  | { type: 'highlight'; align?: string; children: Descendant[] }
  | { type: 'media'; url: string; align?: string; children: Descendant[] }
  | { type: 'dropcap'; align?: string; children: Descendant[] }
  | { type: 'anchor'; id: string; align?: string; children: Descendant[] }
  | { type: 'custom-css'; css: string; align?: string; children: Descendant[] }
  | { type: 'indent'; align?: string; children: Descendant[] }
  | { type: 'line-spacing'; spacing: string; align?: string; children: Descendant[] }
  | { type: 'font-size'; size: string; align?: string; children: Descendant[] }
  | { type: 'font-style'; style: string; align?: string; children: Descendant[] }
  | { type: string; align?: string; children: Descendant[] };
declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement;
  }
}
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const TOOLTIP_MAP: Record<string, string> = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  'heading-one': 'Heading 1',
  'heading-two': 'Heading 2',
  'heading-three': 'Heading 3',
  'bulleted-list': 'Bulleted List',
  'numbered-list': 'Numbered List',
  blockquote: 'Blockquote',
  'align-left': 'Align Left',
  'align-center': 'Align Center',
  'align-right': 'Align Right',
  'align-justify': 'Align Justify',
  link: 'Insert Link',
  image: 'Insert Image',
  'code-block': 'Code Block',
  hr: 'Horizontal Rule',
  table: 'Table',
  callout: 'Callout Box',
  highlight: 'Highlight',
  media: 'Embed Media',
  dropcap: 'Drop Cap',
  anchor: 'Anchor',
  'custom-css': 'Custom CSS',
  indent: 'Indent',
};
// NOTE: This file uses Slate v0.82+ API
const ToolbarButton = ({ format, icon, onClick, active = false }: { format: string; icon: string; onClick: () => void; active?: boolean }) => (
  <button
    type="button"
    className={`px-2 py-1 rounded border text-sm font-medium mr-2 ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
    title={TOOLTIP_MAP[format] || format}
    onMouseDown={e => {
      e.preventDefault();
      onClick();
    }}
  >
    {icon}
  </button>
);

const SlateToolbar = () => {
  const editor = useSlate();
  // Mark buttons
  // These call toggleMark
  const markActive = (format: string) => isMarkActive(editor, format);
  const blockActive = (format: string) => isBlockActive(editor, format);
  const alignActive = (align: string) => {
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n: any) => n.align === align,
      })
    );
    return !!match;
  };
  // Handler for inserting image
  const insertImage = () => {
    const url = window.prompt("Enter the image URL:");
    if (!url) return;
    const image = { type: "image", url, children: [{ text: "" }] };
    editor.insertNode(image);
  };
  // Handler for inserting link
  const insertLink = () => {
    const url = window.prompt("Enter the URL:");
    if (!url) return;
    const text = window.prompt("Enter link text:") || url;
    editor.insertText(text);
    editor.addMark("link", url);
  };
  // Handler for inserting code block
  const insertCodeBlock = () => {
    editor.insertNode({ type: "code-block", children: [{ text: "" }] });
  };
  // Handler for inserting horizontal rule
  const insertHr = () => {
    editor.insertNode({ type: "hr", children: [{ text: "" }] });
  };
  // Handler for inserting table
  const insertTable = () => {
    const rows = 3, cols = 3;
    const table = {
      type: "table",
      children: Array.from({ length: rows }).map(() => ({
        type: "table-row",
        children: Array.from({ length: cols }).map(() => ({
          type: "table-cell",
          children: [{ text: "" }],
        })),
      })),
    };
    editor.insertNode(table);
  };
  // Handler for inserting callout
  const insertCallout = () => {
    editor.insertNode({ type: "callout", children: [{ text: "Callout!" }] });
  };
  // Handler for inserting highlight
  const insertHighlight = () => {
    editor.insertNode({ type: "highlight", children: [{ text: "Highlighted text" }] });
  };
  // Handler for inserting embedded media
  const insertMedia = () => {
    const url = window.prompt("Enter media URL (YouTube, audio, etc.):");
    if (!url) return;
    editor.insertNode({ type: "media", url, children: [{ text: "" }] });
  };
  // Handler for inserting drop cap
  const insertDropCap = () => {
    editor.insertNode({ type: "dropcap", children: [{ text: "Drop cap paragraph" }] });
  };
  // Handler for inserting anchor
  const insertAnchor = () => {
    const id = window.prompt("Enter anchor ID:");
    if (!id) return;
    editor.insertNode({ type: "anchor", id, children: [{ text: "" }] });
  };
  // Handler for inserting custom CSS
  const insertCustomCSS = () => {
    const css = window.prompt("Enter custom CSS:");
    if (!css) return;
    editor.insertNode({ type: "custom-css", css, children: [{ text: "Custom CSS block" }] });
  };
  // Handler for inserting H3
  const insertHeadingThree = () => {
    editor.insertNode({ type: "heading-three", children: [{ text: "Heading 3" }] });
  };
  // Handler for inserting horizontal rule
  // Handler for indentation
  const indent = () => {
    editor.insertNode({ type: "indent", children: [{ text: "Indented paragraph" }] });
  };
  // Handler for line spacing
  const setLineSpacing = (spacing: string) => {
    editor.insertNode({ type: "line-spacing", spacing, children: [{ text: `Line spacing: ${spacing}` }] });
  };
  // Handler for font size
  const setFontSize = (size: string) => {
    editor.insertNode({ type: "font-size", size, children: [{ text: `Font size: ${size}` }] });
  };
  // Handler for font style
  const setFontStyle = (style: string) => {
    editor.insertNode({ type: "font-style", style, children: [{ text: `Font style: ${style}` }] });
  };
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
      <ToolbarButton format="bold" icon="B" onClick={() => toggleMark(editor, "bold")} active={markActive('bold')} />
      <ToolbarButton format="italic" icon="I" onClick={() => toggleMark(editor, "italic")} active={markActive('italic')} />
      <ToolbarButton format="underline" icon="U" onClick={() => toggleMark(editor, "underline")} active={markActive('underline')} />
      <ToolbarButton format="heading-one" icon="H1" onClick={() => toggleBlock(editor, "heading-one")} active={blockActive('heading-one')} />
      <ToolbarButton format="heading-two" icon="H2" onClick={() => toggleBlock(editor, "heading-two")} active={blockActive('heading-two')} />
      <ToolbarButton format="heading-three" icon="H3" onClick={insertHeadingThree} active={blockActive('heading-three')} />
      <ToolbarButton format="bulleted-list" icon="• List" onClick={() => toggleBlock(editor, "bulleted-list")} active={blockActive('bulleted-list')} />
      <ToolbarButton format="numbered-list" icon="1. List" onClick={() => toggleBlock(editor, "numbered-list")} active={blockActive('numbered-list')} />
      <ToolbarButton format="blockquote" icon="❝" onClick={() => toggleBlock(editor, "blockquote")} active={blockActive('blockquote')} />
      <ToolbarButton format="align-left" icon="⬅" onClick={() => toggleAlign(editor, "left")} active={alignActive('left')} />
      <ToolbarButton format="align-center" icon="↔" onClick={() => toggleAlign(editor, "center")} active={alignActive('center')} />
      <ToolbarButton format="align-right" icon="➡" onClick={() => toggleAlign(editor, "right")} active={alignActive('right')} />
      <ToolbarButton format="align-justify" icon="⎯" onClick={() => toggleAlign(editor, "justify")} active={alignActive('justify')} />
      <ToolbarButton format="link" icon="🔗" onClick={insertLink} />
      <ToolbarButton format="image" icon="🖼" onClick={insertImage} />
      <ToolbarButton format="code-block" icon="</>" onClick={insertCodeBlock} />
      <ToolbarButton format="hr" icon="―" onClick={insertHr} />
      <ToolbarButton format="table" icon="▦" onClick={insertTable} />
      <ToolbarButton format="callout" icon="💡" onClick={insertCallout} />
      <ToolbarButton format="highlight" icon="🖍" onClick={insertHighlight} />
      <ToolbarButton format="media" icon="🎥" onClick={insertMedia} />
      <ToolbarButton format="dropcap" icon="🅓" onClick={insertDropCap} />
      <ToolbarButton format="anchor" icon="#" onClick={insertAnchor} />
      <ToolbarButton format="custom-css" icon="{CSS}" onClick={insertCustomCSS} />
      <ToolbarButton format="indent" icon="→" onClick={indent} />
      <select onChange={e => setLineSpacing(e.target.value)} className="ml-2 px-1 rounded">
        <option value="">Line Spacing</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
      </select>
      <select onChange={e => setFontSize(e.target.value)} className="ml-2 px-1 rounded">
        <option value="">Font Size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="x-large">X-Large</option>
      </select>
      <select onChange={e => setFontStyle(e.target.value)} className="ml-2 px-1 rounded">
        <option value="">Font Style</option>
        <option value="serif">Serif</option>
        <option value="sans-serif">Sans Serif</option>
        <option value="monospace">Monospace</option>
      </select>
    </div>
  );
};

const toggleMark = (editor: any, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Normalize marks on block/align changes
const withMarks = (editor: any) => {
  const { apply } = editor;
  editor.apply = (operation: any) => {
    if (operation.type === 'set_node' && operation.newProperties && operation.newProperties.type) {
      const marks = Editor.marks(editor);
      apply(operation);
      if (marks) {
        Object.entries(marks).forEach(([k, v]) => {
          if (v) Editor.addMark(editor, k, v);
        });
      }
      return;
    }
    apply(operation);
  };
  return editor;
};

const isMarkActive = (editor: any, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null;
  return marks ? marks[format] === true : false;
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    isActive ? { type: "paragraph" } : { type: format },
    {
      match: (n: any) => {
        // Only apply to block elements with type and children
        return n && typeof n === 'object' && typeof n.type === 'string' && Array.isArray(n.children);
      },
      split: true,
    }
  );
};

const toggleAlign = (editor: Editor, align: string) => {
  Transforms.setNodes(
    editor,
    { align },
    {
      match: (n: any) => {
        // Only apply to block elements (with children array)
        return n && typeof n === 'object' && Array.isArray(n.children);
      },
      split: true,
    }
  );
};

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n: any) => n.type === format,
    })
  );
  return !!match;
};

const Element = ({ attributes, children, element }: any) => {
  // Handle alignment
  const style = element.align ? { textAlign: element.align } : {};
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes} style={style}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes} style={style}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes} style={style}>{children}</h3>;
    case "bulleted-list":
      return <ul {...attributes} style={style}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes} style={style}>{children}</ol>;
    case "list-item":
      return <li {...attributes} style={style}>{children}</li>;
    case "blockquote":
      return <blockquote {...attributes} className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 my-2 italic" style={style}>{children}</blockquote>;
    case "link":
      return <a {...attributes} href={element.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{children}</a>;
    case "image":
      return (
        <div {...attributes} style={{ textAlign: element.align || 'left' }}>
          <img src={element.url} alt="" style={{ maxWidth: '100%', margin: '0.5em 0' }} />
          {children}
        </div>
      );
    case "code-block":
      return <pre {...attributes} className="bg-gray-900 text-green-300 rounded p-3 my-2 overflow-x-auto"><code>{children}</code></pre>;
    case "hr":
      return <hr {...attributes} className="my-4 border-t-2 border-gray-400 dark:border-gray-700" />;
    case "table":
      return <table {...attributes} className="border-collapse border border-gray-400 my-3"><tbody>{children}</tbody></table>;
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes} className="border border-gray-400 px-2 py-1">{children}</td>;
    case "callout":
      return <div {...attributes} className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 px-4 py-2 my-2 rounded shadow-inner">{children}</div>;
    case "highlight":
      return <span {...attributes} className="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">{children}</span>;
    case "media":
      // Render as iframe for YouTube, else try audio/video
      if (element.url && element.url.includes('youtube')) {
        return <div {...attributes} className="my-4"><iframe width="560" height="315" src={element.url.replace('watch?v=', 'embed/')} frameBorder="0" allowFullScreen className="w-full max-w-xl h-64"></iframe>{children}</div>;
      } else if (element.url && (element.url.endsWith('.mp3') || element.url.endsWith('.wav'))) {
        return <div {...attributes} className="my-4"><audio controls src={element.url} className="w-full" />{children}</div>;
      } else if (element.url && (element.url.endsWith('.mp4') || element.url.endsWith('.webm'))) {
        return <div {...attributes} className="my-4"><video controls src={element.url} className="w-full max-w-xl h-64" />{children}</div>;
      }
      return <div {...attributes}>{children}</div>;
    case "dropcap":
      // Render first letter as drop cap
      return <p {...attributes}><span className="float-left text-4xl font-extrabold mr-2 text-blue-700 drop-shadow-md">{children[0]?.props?.children?.[0]?.[0] || ''}</span>{typeof children === 'string' ? children.slice(1) : children}</p>;
    case "anchor":
      return <span {...attributes} id={element.id} className="text-blue-400">{children}</span>;
    case "custom-css":
      return <div {...attributes} style={{ ...element.css ? { ...Object.fromEntries(element.css.split(';').map((rule: string) => rule.trim() ? (rule.split(':').map((s: string) => s.trim())) : []).filter((a: string[]) => a.length === 2)) } : {} }}>{children}</div>;
    case "indent":
      return <div {...attributes} style={{ marginLeft: '2em' }}>{children}</div>;
    case "line-spacing":
      return <div {...attributes} style={{ lineHeight: element.spacing }}>{children}</div>;
    case "font-size":
      let fontSize = '1em';
      switch (element.size) {
        case 'small': fontSize = '0.85em'; break;
        case 'medium': fontSize = '1em'; break;
        case 'large': fontSize = '1.4em'; break;
        case 'x-large': fontSize = '2em'; break;
      }
      return <span {...attributes} style={{ fontSize }}>{children}</span>;
    case "font-style":
      let fontFamily = 'inherit';
      switch (element.style) {
        case 'serif': fontFamily = 'serif'; break;
        case 'sans-serif': fontFamily = 'sans-serif'; break;
        case 'monospace': fontFamily = 'monospace'; break;
      }
      return <span {...attributes} style={{ fontFamily }}>{children}</span>;
    default:
      return <p {...attributes} style={style}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  // Add support for other marks if needed
  if (leaf.link) {
    children = <a href={leaf.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{children}</a>;
  }
  if (leaf.highlight) {
    children = <span className="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};

interface SlateEditorProps {
  title: string;
  setTitle: (title: string) => void;
  handleSave: (content: string) => void;
  saving: boolean;
  initialValue?: string | null;
  setEditorValue?: (val: string) => void;
  slug?: string | null;
  editId?: string | null;
}

import { useEffect } from "react";

const DEFAULT_INITIAL_VALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default function SlateEditor({ title, setTitle, handleSave, saving, initialValue, setEditorValue, slug, editId }: SlateEditorProps) {
  const editor = useMemo(() => withMarks(withHistory(withReact(createEditor()))), []);
  const parseValue = (val: string | null | undefined): Descendant[] => {
    if (!val) return DEFAULT_INITIAL_VALUE;
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
      return DEFAULT_INITIAL_VALUE;
    } catch {
      return DEFAULT_INITIAL_VALUE;
    }
  };
  const [value, setValue] = useState<Descendant[]>(() => parseValue(initialValue));

  const lastInitialValue = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (initialValue !== lastInitialValue.current) {
      setValue(parseValue(initialValue));
      lastInitialValue.current = initialValue;
    }
  }, [initialValue]);

  // Call setEditorValue on every value change
  useEffect(() => {
    if (setEditorValue) {
      setEditorValue(JSON.stringify(value));
    }
  }, [value, setEditorValue]);

  // Get up-to-date slug and id from local state if available
  const [localSlug, setLocalSlug] = useState(slug || '');
  const [localEditId, setLocalEditId] = useState(editId || '');
  useEffect(() => { if (slug) setLocalSlug(slug); }, [slug]);
  useEffect(() => { if (editId) setLocalEditId(editId); }, [editId]);

  // Live preview state
  let previewValue: any[] = value;
  try {
    previewValue = Array.isArray(value) ? value : JSON.parse(value as any);
  } catch { previewValue = DEFAULT_INITIAL_VALUE; }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <Slate editor={editor} initialValue={value || DEFAULT_INITIAL_VALUE} onChange={setValue}>
          <SlateToolbar />
          <Editable
            renderElement={(props: any) => <Element {...props} />}
            renderLeaf={(props: any) => <Leaf {...props} />}
            placeholder="Write your blog post here..."
            spellCheck
            autoFocus
            style={{ minHeight: '300px', minWidth: '100%', resize: 'vertical', overflowX: 'hidden' }}
            className="px-4 py-3 max-h-[600px] focus:outline-none bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700 text-lg transition-all"
          />
        </Slate>
      </div>

      <button
        onClick={() => handleSave(JSON.stringify(value))}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
      >
        {saving ? "Saving..." : "Save Post"}
      </button>
      {/* Preview Button */}
      <button
        type="button"
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold ml-2"
        title="Preview this post in a new tab"
        disabled={!(localSlug || localEditId)}
        onClick={() => {
          const url = localSlug ? `/blog/${localSlug}` : (localEditId ? `/blog/${localEditId}` : null);
          if (url) window.open(url, '_blank', 'noopener');
        }}
      >
        Preview
      </button>
    </>
  );
}
