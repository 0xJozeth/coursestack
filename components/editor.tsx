"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export const Editor = ({ onChange, value }: EditorProps) => {
  const CustomQuill = useMemo(() => {
    const PatchedQuill = ReactQuill;

    // Mock `findDOMNode` to avoid errors
    if (PatchedQuill.prototype.UNSAFE_componentWillMount) {
      PatchedQuill.prototype.UNSAFE_componentWillMount = () => {};
    }

    return PatchedQuill;
  }, []);

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
