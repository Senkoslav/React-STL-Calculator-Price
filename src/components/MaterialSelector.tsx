// MaterialSelector.tsx
import React from 'react';

interface MaterialSelectorProps {
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
}

const materials = ['ABS', 'PLA', 'PETG'];

const MaterialSelector: React.FC<MaterialSelectorProps> = ({ selectedMaterial, onMaterialChange }) => {
  return (
    <div>
      <label htmlFor="material-select">Выберите материал:</label>
      <select
        id="material-select"
        value={selectedMaterial}
        onChange={(e) => onMaterialChange(e.target.value)}
      >
        {materials.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MaterialSelector;
