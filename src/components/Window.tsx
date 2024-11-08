import React from 'react';
import { Circle } from './Circle';

interface Props {
  className?: string;
  circles: { x: number; y: number; diameter: number }[];
  onMoveCircle: (index: number, newX: number, newY: number) => void;
}

export const Window: React.FC<Props> = ({ className, circles, onMoveCircle }) => {
  return (
    <div className={className + ' relative bg-white rounded-xl shadow-xl overflow-hidden'}>
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
