"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SelectImage from "@/components/SelectImage/SelectImg";
import "./Ckeditor.css";

interface Props {
  content: string;
  onChange: (data: string) => void;
  placeholder?: string;
}

const CKEditorComponent: React.FC<Props> = ({
  onChange,
  content,
  placeholder = "Nhập nội dung bài viết...",
}) => {
  const editorRef = useRef<any>(null);
  const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  const [showAltModal, setShowAltModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [altText, setAltText] = React.useState<string>("");

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const insertImageToEditor = (url: string, alt: string = "") => {
    if (editorRef.current) {
      editorRef.current.model.change((writer: any) => {
        const imageElement = writer.createElement("imageBlock", {
          src: url,
          alt: alt,
        });
        editorRef.current.model.insertContent(
          imageElement,
          editorRef.current.model.document.selection
        );
      });
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowAltModal(true);
  };

  const editorConfig = useMemo(() => {
    if (!isLayoutReady) return undefined;
    return {
      placeholder,
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "undo",
        "redo",
        "codeBlock",
      ],
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Đoạn văn",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Tiêu đề 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Tiêu đề 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Tiêu đề 3",
            class: "ck-heading_heading3",
          },
        ],
      },
    };
  }, [isLayoutReady, placeholder]);

  return (
    <div className="relative w-full border bg-white border-gray-300 rounded blog-content">
      <div className="flex justify-start p-2 border-b">
        <SelectImage data={handleSelectImage} title="Chèn ảnh" />
      </div>

      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={editorConfig}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(_, editor) => onChange((editor as any).getData())}
      />

      {/* Alt Text Modal */}
      {showAltModal && selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Nhập mô tả ảnh (alt)</h3>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
              placeholder="Mô tả ảnh"
            />
            <div className="text-right space-x-2">
              <button
                onClick={() => {
                  setShowAltModal(false);
                  setSelectedImage(null);
                  setAltText("");
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (selectedImage) {
                    insertImageToEditor(selectedImage, altText);
                  }
                  setShowAltModal(false);
                  setSelectedImage(null);
                  setAltText("");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Chèn ảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CKEditorComponent;
