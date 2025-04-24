"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";

function TiptapMenuBar({ editor }: { editor: any }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('bold') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('italic') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('strike') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Strike</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>H3</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('bulletList') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Bullet List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('orderedList') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Numbered List</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('blockquote') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Blockquote</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Right</button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Justify</button>
      <button onClick={() => editor.chain().focus().setLink({ href: prompt('Enter URL') || '' }).run()} className={`px-2 py-1 rounded border text-sm font-medium transition-all ${editor.isActive('link') ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'}`}>Link</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} className="px-2 py-1 rounded border text-sm font-medium transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700">Unlink</button>
      <button onClick={() => editor.chain().focus().setImage({ src: prompt('Enter image URL') || '' }).run()} className="px-2 py-1 rounded border text-sm font-medium transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700">Image</button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="px-2 py-1 rounded border text-sm font-medium transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700">Table</button>
    </div>
  );
}

export default function TiptapEditor({ title, setTitle, handleSave, saving, successSlug, editorContentRef }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Link,
      Table.configure({ resizable: true }),
    ],
    content: "",
  });

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full px-3 py-2 mb-4 border rounded text-lg"
      />
      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <TiptapMenuBar editor={editor} />
        <div className="min-h-[600px] max-w-full">
          <EditorContent editor={editor} className="prose dark:prose-invert max-w-none min-h-[600px]" />
        </div>
      </div>
      <button
        onClick={() => handleSave(editor?.getHTML() || "")}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
      >
        {saving ? "Saving..." : "Save Post"}
      </button>
      {successSlug && (
        <div className="mt-4 text-green-600">
          Post saved! View it at {" "}
          <a href={`/blog/${successSlug}`} className="underline text-blue-600">/blog/{successSlug}</a>
        </div>
      )}
    </>
  );
}
