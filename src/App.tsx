import React from 'react';
import { Button } from './components/Button';
import { Window } from './components/Window';
import { addCircle } from './utils/addCircle';

function App() {
  const [circles, setCircles] = React.useState<{ x: number; y: number; diameter: number }[]>([]);
  const windowX = 1024;
  const windowY = 512;

  /**
   * Handles the addition of a new circle to the list.
   *
   * This function generates a new circle using the `addCircle` utility function,
   * based on the current dimensions of the window. It then updates the state
   * to include the newly created circle in the list of circles.
   *
   * @returns {void} This function does not return a value.
   */
  const handleAddCircle = () => {
    const newCircle = addCircle({ windowX, windowY });
    setCircles([...circles, newCircle]);
  };

  /**
   * Handles the movement of a circle by updating its position.
   *
   * This function takes the index of the circle to be moved and its new coordinates,
   * then creates a new array of circles with the updated position for the specified circle.
   * Finally, it updates the state to reflect the changes.
   *
   * @param {number} index - The index of the circle to be moved.
   * @param {number} newX - The new x-coordinate for the circle.
   * @param {number} newY - The new y-coordinate for the circle.
   *
   * @returns {void} This function does not return a value.
   */
  const handleMoveCircle = (index: number, newX: number, newY: number) => {
    const updatedCircles = circles.map((circle, i) =>
      i === index ? { ...circle, x: newX, y: newY } : circle,
    );
    setCircles(updatedCircles);
  };

  /**
   * Handles keyboard events to perform actions based on key presses.
   *
   * This function listens for key down events and checks if the pressed key
   * is the 'Backspace' key. If it is, the function updates the state to remove
   * the last circle from the list of circles.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
   *
   * @returns {void} This function does not return a value.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setCircles((prevCircles) => prevCircles.slice(0, -1));
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App min-h-screen grid-center bg-gray-100">
      <div className="wrapper flex flex-col items-center justify-center gap-4">
        <Button onClick={handleAddCircle} className="bg-sky-400 text-white" text="Добавить круг" />
        <Window
          circles={circles}
          //className={`min-w-[${windowX}px] min-h-[${windowY}px]`} update: tailwind bug occurs -> moved to style attribute
          style={{ minWidth: `${windowX}px`, minHeight: `${windowY}px` }}
          onMoveCircle={handleMoveCircle}
        />
      </div>
    </div>
  );
}

export default App;
