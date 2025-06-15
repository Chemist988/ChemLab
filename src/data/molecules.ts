import * as THREE from 'three';

export type AtomData = {
  symbol: string;
  position: THREE.Vector3;
  color: string;
  radius: number;
};

export type BondStyle = 'single' | 'double' | 'triple';

export type BondData = {
  from: number; // index in atoms array
  to: number; // index in atoms array
  style: BondStyle;
};

export type Molecule = {
  name: string;
  formula: string;
  atoms: AtomData[];
  bonds: BondData[];
};

const atomInfo = {
  H: { color: '#ffffff', radius: 0.35 },
  C: { color: '#222222', radius: 0.7 },
  N: { color: '#3b82f6', radius: 0.65 },
  O: { color: '#ef4444', radius: 0.6 },
};

export const molecules: { [key: string]: Molecule } = {
  water: {
    name: 'Water',
    formula: 'H₂O',
    atoms: [
      { symbol: 'O', position: new THREE.Vector3(0, 0, 0), ...atomInfo.O },
      { symbol: 'H', position: new THREE.Vector3(0.757, 0.586, 0), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(-0.757, 0.586, 0), ...atomInfo.H },
    ],
    bonds: [
      { from: 0, to: 1, style: 'single' },
      { from: 0, to: 2, style: 'single' },
    ],
  },
  methane: {
    name: 'Methane',
    formula: 'CH₄',
    atoms: [
      { symbol: 'C', position: new THREE.Vector3(0, 0, 0), ...atomInfo.C },
      { symbol: 'H', position: new THREE.Vector3(0.63, 0.63, 0.63), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(-0.63, -0.63, 0.63), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(-0.63, 0.63, -0.63), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(0.63, -0.63, -0.63), ...atomInfo.H },
    ],
    bonds: [
      { from: 0, to: 1, style: 'single' },
      { from: 0, to: 2, style: 'single' },
      { from: 0, to: 3, style: 'single' },
      { from: 0, to: 4, style: 'single' },
    ],
  },
  ammonia: {
    name: 'Ammonia',
    formula: 'NH₃',
    atoms: [
        { symbol: 'N', position: new THREE.Vector3(0, 0.1, 0), ...atomInfo.N },
        { symbol: 'H', position: new THREE.Vector3(0, -0.3, 0.94), ...atomInfo.H },
        { symbol: 'H', position: new THREE.Vector3(0.81, -0.3, -0.47), ...atomInfo.H },
        { symbol: 'H', position: new THREE.Vector3(-0.81, -0.3, -0.47), ...atomInfo.H },
    ],
    bonds: [
        { from: 0, to: 1, style: 'single' },
        { from: 0, to: 2, style: 'single' },
        { from: 0, to: 3, style: 'single' },
    ]
  },
  co2: {
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    atoms: [
      { symbol: 'C', position: new THREE.Vector3(0, 0, 0), ...atomInfo.C },
      { symbol: 'O', position: new THREE.Vector3(-1.16, 0, 0), ...atomInfo.O },
      { symbol: 'O', position: new THREE.Vector3(1.16, 0, 0), ...atomInfo.O },
    ],
    bonds: [
      { from: 0, to: 1, style: 'double' },
      { from: 0, to: 2, style: 'double' },
    ]
  },
  hydrogenPeroxide: {
    name: 'Hydrogen Peroxide',
    formula: 'H₂O₂',
    atoms: [
      { symbol: 'O', position: new THREE.Vector3(0, 0.74, 0.05), ...atomInfo.O },
      { symbol: 'O', position: new THREE.Vector3(0, -0.74, 0.05), ...atomInfo.O },
      { symbol: 'H', position: new THREE.Vector3(0.84, 0.9, -0.37), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(-0.84, -0.9, -0.37), ...atomInfo.H },
    ],
    bonds: [
      { from: 0, to: 1, style: 'single' },
      { from: 0, to: 2, style: 'single' },
      { from: 1, to: 3, style: 'single' },
    ],
  },
};
