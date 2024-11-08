import React from 'react';

interface Props {
  x: number;
  y: number;
  diameter: number;
  onMove: (newX: number, newY: number) => void;
  zIndex: number;
}

export const Circle: React.FC<Props> = ({ x, y, diameter, onMove, zIndex }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const offsetRef = React.useRef({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    offsetRef.current.x = event.clientX - x;
    offsetRef.current.y = event.clientY - y;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const newX = event.clientX - offsetRef.current.x;
      const newY = event.clientY - offsetRef.current.y;
      onMove(newX, newY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={`absolute bg-sky-700 rounded-full cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      } `}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
        zIndex: zIndex,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};
