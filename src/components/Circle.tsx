import React from 'react';

interface Props {
  x: number;
  y: number;
  diameter: number;
  onMove: (newX: number, newY: number) => void;
  zIndex: number;
}

/**
 * Circle component that represents a draggable circle on the screen.
 *
 * This component renders a circle that can be dragged around the screen.
 * It utilizes mouse events to handle the dragging functionality and updates
 * its position based on user interaction.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.x - The initial x-coordinate of the circle.
 * @param {number} props.y - The initial y-coordinate of the circle.
 * @param {number} props.diameter - The diameter of the circle.
 * @param {function} props.onMove - Callback function to handle the circle's new position.
 * @param {number} props.zIndex - The z-index of the circle for stacking order.
 *
 * @returns {JSX.Element} The rendered Circle component.
 */
export const Circle: React.FC<Props> = ({ x, y, diameter, onMove, zIndex }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const offsetRef = React.useRef({ x: 0, y: 0 });

  /**
   * Handles the mouse down event for initiating a drag.
   *
   * This function sets the dragging state to true and calculates the initial
   * offset between the mouse position and the circle's position. This offset
   * is used to maintain the relative position of the mouse to the circle during
   * dragging.
   *
   * @param {React.MouseEvent} event - The mouse event triggered when the mouse button is pressed down.
   *
   * @returns {void} This function does not return a value.
   */
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    offsetRef.current.x = event.clientX - x;
    offsetRef.current.y = event.clientY - y;
  };

  /**
   * Handles the mouse move event for dragging an element.
   *
   * This function calculates the new position of the element based on the current
   * mouse position, adjusting for the initial offset when the drag started.
   * It calls the provided `onMove` function with the new coordinates.
   *
   * @param {MouseEvent} event - The mouse event triggered when the mouse is moved.
   *
   * @returns {void} This function does not return a value.
   */
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const newX = event.clientX - offsetRef.current.x;
      const newY = event.clientY - offsetRef.current.y;
      onMove(newX, newY);
    }
  };

  /**
   * Handles the mouse up event to stop dragging an element.
   *
   * This function sets the dragging state to false, indicating that the user
   * has released the mouse button and the dragging operation has ended.
   *
   * @returns {void} This function does not return a value.
   */
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
