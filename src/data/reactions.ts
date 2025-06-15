
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
  h2: {
    name: 'Hydrogen Gas',
    formula: 'H₂',
    atoms: [
      { symbol: 'H', position: new THREE.Vector3(0.37, 0, 0), ...atomInfo.H },
      { symbol: 'H', position: new THREE.Vector3(-0.37, 0, 0), ...atomInfo.H },
    ],
    bonds: [
      { from: 0, to: 1, style: 'single' },
    ],
  },
  o2: {
    name: 'Oxygen Gas',
    formula: 'O₂',
    atoms: [
      { symbol: 'O', position: new THREE.Vector3(0.6, 0, 0), ...atomInfo.O },
      { symbol: 'O', position: new THREE.Vector3(-0.6, 0, 0), ...atomInfo.O },
    ],
    bonds: [
      { from: 0, to: 1, style: 'double' },
    ],
  },
};

export type ReactionData = {
  name: string;
  equation: string;
  reactants: { key: string; count: number }[];
  products: { key: string; count: number }[];
};

export const reactions: { [key: string]: ReactionData } = {
  water_formation: {
    name: "Water Formation",
    equation: "2H₂ + O₂ ⟶ 2H₂O",
    reactants: [ { key: 'h2', count: 2 }, { key: 'o2', count: 1 } ],
    products: [ { key: 'water', count: 2 } ],
  },
  methane_combustion: {
    name: "Methane Combustion",
    equation: "CH₄ + 2O₂ ⟶ CO₂ + 2H₂O",
    reactants: [ { key: 'methane', count: 1 }, { key: 'o2', count: 2 } ],
    products: [ { key: 'co2', count: 1 }, { key: 'water', count: 2 } ],
  }
};
