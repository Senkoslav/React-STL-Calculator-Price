import React from 'react';

interface MaterialSelectorProps {
  selectedMaterial: string;
  onMaterialChange: (material: string) => void;
  fillPercentage: number;
  onFillPercentageChange: (percentage: number) => void;
}

const materials = ['ABS', 'PLA', 'PETG'];

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedMaterial,
  onMaterialChange,
  fillPercentage,
  onFillPercentageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(event.target.value);
    onFillPercentageChange(percentage);
  };

  return (
    <div>
      <label htmlFor="rangeInput">Выберите процент заполнения:</label>
      <input
        type="range"
        id="rangeInput"
        min="0"
        max="100"
        value={fillPercentage}
        onChange={handleChange}
      />
      <div style={{ marginTop: '20px', fontSize: '1.5em' }}>
        Текущее значение: {fillPercentage}%
      </div>
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