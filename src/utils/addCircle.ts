interface Props {
  windowX: number;
  windowY: number;
}

/** Generates object with new circle parameters.
 *
 * @param {Object} props - Object containing parameters.
 * @param {number} props.windowX - The width of the window within which the circle is created.
 * @param {number} props.windowY - The height of the window within which the circle is created.
 *
 * @returns {{ x: number, y: number, diameter: number }} An object containing the circle's coordinates (x, y) and diameter.
 * - `x` (number): The horizontal position of the circle center.
 * - `y` (number): The vertical position of the circle center.
 * - `diameter` (number): The diameter of the circle, varying between 5% and 20% of the window's width.
 *
 * @example
 * const circle = addCircle({ windowX: 1024, windowY: 512 });
 * console.log(circle);
 * // Example output: { x: 300, y: 150, diameter: 40 }
 */
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
