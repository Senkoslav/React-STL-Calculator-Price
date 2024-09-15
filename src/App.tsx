// App.tsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import MaterialSelector from './components/MaterialSelector';
import { calculateVolume } from './utils/utils';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [material, setMaterial] = useState<string>('PLA');
  const [cost, setCost] = useState<number | null>(null);

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
    const fileBuffer = await file.arrayBuffer();
    const modelVolume = calculateVolume(fileBuffer);
    setVolume(modelVolume);
  };

  const handleCalculateCost = () => {
    if (volume) {
      let pricePerCm3 = 0;
      switch (material) {
        case 'ABS':
          pricePerCm3 = 0.40;
          break;
        case 'PLA':
          pricePerCm3 = 0.08;
          break;
        case 'PETG':
          pricePerCm3 = 0.12;
          break;
      }
      setCost(volume * pricePerCm3);
    }
  };

  return (
    <div>
      <h1>Калькулятор стоимости 3D печати</h1>
      <FileUpload onFileSelected={handleFileSelected} />
      {volume && <p>Объем модели: {volume.toFixed(1)} см³</p>}
      <MaterialSelector selectedMaterial={material} onMaterialChange={setMaterial} />
      <button onClick={handleCalculateCost}>Рассчитать стоимость</button>
      {cost && <p>Ориентировочная стоимость: {cost.toFixed(2)} BYN</p>}
    </div>
  );
}

export default App;
