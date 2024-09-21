import { FC } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";

interface RichTextEditorProps {
  onChange: (content: string) => void;
  content?: string;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: "Write your thoughts here . . . ",
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
  });

  return (
    <div className="h-[75vh] overflow-y-scroll flex flex-col">
      <Toolbar editor={editor} />

      <div className="flex-1 overflow-y-auto">
        <EditorContent className="custom-editor p-4" editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
