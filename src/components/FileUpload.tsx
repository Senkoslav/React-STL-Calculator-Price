// FileUpload.tsx
import { FaFileUpload } from "react-icons/fa";
import React, { ChangeEvent } from 'react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div>
      
      <label htmlFor="stl-upload">Загрузите STL файл:</label>
      <FaFileUpload />
      <input type="file" id="stl-upload" accept=".stl" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
