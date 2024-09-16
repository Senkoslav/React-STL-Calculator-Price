import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import MaterialSelector from './components/MaterialSelector';
import { calculateVolume } from './utils/utils';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [material, setMaterial] = useState<string>('PLA');
  const [cost, setCost] = useState<number | null>(null);
  const [fillPercentage, setFillPercentage] = useState<number>(100);

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
    const fileBuffer = await file.arrayBuffer();
    const modelVolume = calculateVolume(fileBuffer);
    setVolume(modelVolume);
    calculateCost(modelVolume, fillPercentage, material);
  };

  const calculateCost = (volume: number, fillPercentage: number, material: string) => {
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
    
    const effectiveVolume = volume * (fillPercentage / 100);
    let calculatedCost = effectiveVolume * pricePerCm3;

    if (calculatedCost < 5) {
      calculatedCost += 5;
    } else if (calculatedCost > 10) {
      calculatedCost += 3;
    }
    setCost(calculatedCost);
  };

  const handleMaterialChange = (material: string) => {
    setMaterial(material);
    if (volume) {
      calculateCost(volume, fillPercentage, material);
    }
  };

  const handleFillPercentageChange = (percentage: number) => {
    setFillPercentage(percentage);
    if (volume) {
      calculateCost(volume, percentage, material);
    }
  };

  return (
    <div className="container">
      <h1>Калькулятор стоимости 3D печати</h1>
      <FileUpload onFileSelected={handleFileSelected} />
      {volume && <p>Объем модели: {volume.toFixed(1)} см³</p>}
      <MaterialSelector
        selectedMaterial={material}
        onMaterialChange={handleMaterialChange}
        fillPercentage={fillPercentage}
        onFillPercentageChange={handleFillPercentageChange}
      />
      <button onClick={() => calculateCost(volume!, fillPercentage, material)} hidden>Рассчитать стоимость</button>
      {cost && <p>Ориентировочная стоимость: {cost.toFixed(2)} BYN</p>}
    </div>
  );
}

export default App;