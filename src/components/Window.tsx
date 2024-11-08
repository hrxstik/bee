import React from 'react';
import { Circle } from './Circle';

interface Props {
  style?: React.CSSProperties;
  circles: { x: number; y: number; diameter: number }[];
  onMoveCircle: (index: number, newX: number, newY: number) => void;
}

/**
 * Window component that displays a collection of draggable circles.
 *
 * This component serves as a container for multiple `Circle` components. It
 * allows for the rendering of circles at specified positions and handles
 * their movement through the provided callback function.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.CSSProperties} [props.style] - Optional additional CSS classes for custom styling.
 * @param {Array<{ x: number; y: number; diameter: number }>} props.circles - An array of circles to be displayed,
 *   where each circle is defined by its x and y coordinates and diameter.
 * @param {function} props.onMoveCircle - Callback function to handle the movement of a circle.
 *   It receives the index of the circle being moved and its new coordinates.
 *
 * @returns {JSX.Element} The rendered Window component containing the circles.
 */
export const Window: React.FC<Props> = ({ style, circles, onMoveCircle }) => {
  return (
    <div style={style} className={'relative bg-white rounded-xl shadow-xl overflow-hidden'}>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          x={circle.x}
          y={circle.y}
          diameter={circle.diameter}
          onMove={(newX, newY) => onMoveCircle(index, newX, newY)}
          zIndex={index}
        />
      ))}
    </div>
  );
};
