// FileUpload.tsx
import { FaFileUpload } from "react-icons/fa";
import React, { ChangeEvent, useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name); 
      onFileSelected(file);
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
      {fileName && <p>Выбран файл: {fileName}</p>} {/* Отображаем имя файла */}
    </div>
    </form>
  );
};

export default FileUpload;
