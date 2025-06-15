
import React from "react";

const files = [
  { name: "lecture-notes.pdf", status: "Processed", size: "2.4MB" },
  { name: "lab-data.xlsx", status: "Failed", size: "315KB" },
];

const statusColor = (status: string) =>
  status === "Processed" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100";

const FilesList = () => (
  <div className="mt-7">
    <h3 className="font-semibold mb-3">Files</h3>
    <div className="flex flex-col gap-3">
      {files.map(file => (
        <div
          key={file.name}
          className="flex items-center justify-between p-4 rounded-xl bg-background border"
        >
          <div>
            <div className="text-base font-medium">{file.name}</div>
            <div className="text-xs text-muted-foreground">{file.size}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(file.status)}`}>
            {file.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default FilesList;
