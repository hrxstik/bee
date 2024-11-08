interface Props {
  windowX: number;
  windowY: number;
}

export const addCircle = ({
  windowX,
  windowY,
}: Props): { x: number; y: number; diameter: number } => {
  const minDiameter = 0.05 * windowX;
  const maxDiameter = 0.2 * windowX;
  const diameter = Math.random() * (maxDiameter - minDiameter) + minDiameter;

  const x = Math.random() * (windowX - diameter);
  const y = Math.random() * (windowY - diameter);
  return { x, y, diameter: diameter };
};
