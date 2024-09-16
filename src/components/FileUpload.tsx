// FileUpload.tsx
import { FaFileUpload } from "react-icons/fa";
import React, { ChangeEvent } from 'react';
import './FileUpload.css';

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
    <form action="form"
    onClick={() => document.querySelector<HTMLInputElement>(".inpit-field")?.click()}
    >
    <div>
      <label htmlFor="stl-upload">Загрузите STL файл:</label>
      <FaFileUpload size={50}/>
      <input type="file" id="stl-upload" accept=".stl" onChange={handleFileChange} className="inpit-field" hidden/>
    </div>
    </form>
  );
};

export default FileUpload;
