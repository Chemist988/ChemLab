
import React from "react";
import { FileText } from "lucide-react";

const FileDropzone = () => (
  <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-2xl min-h-[180px] py-8 bg-muted/20">
    <FileText className="w-11 h-11 mb-2 text-primary" />
    <p className="font-bold text-lg text-primary mb-2">Drag & drop files here</p>
    <p className="text-muted-foreground text-xs">or click to browse your device</p>
  </div>
);

export default FileDropzone;
