import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// Функция для расчета объема из файла STL, представленного в виде ArrayBuffer
export function calculateVolume(arrayBuffer: ArrayBuffer): number {
  const loader = new STLLoader();
  const geometry = loader.parse(arrayBuffer);
  
  // Вычисляем ограничивающий параллелепипед для геометрии
  geometry.computeBoundingBox();
  
  // Получаем объем в мм³ и конвертируем в см³
  const volumeInMm3 = getGeometryVolume(geometry);
  const volumeInCm3 = volumeInMm3 / 1000; // Конвертация из мм³ в см³

  return volumeInCm3;
}

// Функция для вычисления объема геометрии
function getGeometryVolume(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  const faces = position.count / 3; // Каждое лицо определяется 3 вершинами

  let volume = 0;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  for (let i = 0; i < faces; i++) {
    // Получаем вершины треугольника
    p1.fromBufferAttribute(position, i * 3 + 0);
    p2.fromBufferAttribute(position, i * 3 + 1);
    p3.fromBufferAttribute(position, i * 3 + 2);

    // Суммируем подписанный объем треугольника
    volume += signedVolumeOfTriangle(p1, p2, p3);
  }
  
  return Math.abs(volume); // Возвращаем абсолютный объем
}

// Функция для вычисления подписанного объема треугольника
function signedVolumeOfTriangle(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3): number {
  return p1.dot(p2.cross(p3)) / 6.0;
}