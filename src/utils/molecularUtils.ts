
export const getElementColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'alkali-metal': '#ff6b6b',
    'alkaline-earth-metal': '#4ecdc4',
    'transition-metal': '#45b7d1',
    'post-transition-metal': '#f9ca24',
    'metalloid': '#6c5ce7',
    'nonmetal': '#a29bfe',
    'halogen': '#fd79a8',
    'noble-gas': '#fdcb6e',
    'lanthanide': '#74b9ff',
    'actinide': '#e17055',
    'unknown': '#636e72'
  };
  return colors[category] || '#636e72';
};

export const generateRandomPosition = (): [number, number, number] => {
  return [
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8
  ];
};

export const calculateDistance = (
  pos1: [number, number, number], 
  pos2: [number, number, number]
): number => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) +
    Math.pow(pos1[1] - pos2[1], 2) +
    Math.pow(pos1[2] - pos2[2], 2)
  );
};
