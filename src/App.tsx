import React from 'react';
import { Button } from './components/Button';
import { Window } from './components/Window';
import { addCircle } from './utils/addCircle';

function App() {
  const [circles, setCircles] = React.useState<{ x: number; y: number; diameter: number }[]>([]);
  const [selectedCircles, setSelectedCircles] = React.useState<number[]>([]);

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
    setCircles((prevCircles) => {
      const updatedCircles = [...prevCircles, newCircle];
      return updatedCircles;
    });
  };

  /**
   * Handles the movement of selected circles by updating their position.
   *
   * This function takes the new coordinates for the selected circles and updates their
   * positions in the state. It creates a new array of circles with the updated positions
   * for all selected circles, while leaving non-selected circles unchanged. Finally, it
   * updates the state to reflect these changes.
   *
   * @param {number} newX - The new x-coordinate for the selected circles.
   * @param {number} newY - The new y-coordinate for the selected circles.
   *
   * @returns {void} This function does not return a value.
   */
  const handleMoveCircle = (newX: number, newY: number) => {
    const updatedCircles = circles.map((circle, i) => {
      if (selectedCircles.includes(i)) {
        return { ...circle, x: newX, y: newY };
      }
      return circle;
    });
    setCircles(updatedCircles);
  };

  /**
   * Handles keyboard events to perform actions based on key presses.
   *
   * This function listens for key down events and checks if the pressed key
   * is the 'Backspace' key. If it is, the function removes the selected circles
   * from the list. If no circles are selected, it will remove the last circle
   * from the list instead. After removing the selected circles, it clears the
   * selection.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
   *
   * @returns {void} This function does not return a value.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setCircles((prevCircles) => {
        if (selectedCircles.length > 0) {
          const updatedCircles = prevCircles.filter((_, index) => !selectedCircles.includes(index));
          setSelectedCircles([]);
          return updatedCircles;
        } else {
          return prevCircles.slice(0, -1);
        }
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCircles]);

  /**
   * Handles the click event on a circle, managing the selection state.
   *
   * This function updates the selection of circles based on user interaction.
   * If the Ctrl key is held down during the click, it toggles the selection
   * of the clicked circle (adding to selected circles array it if it's not selected, or removing it if it is).
   * If the Ctrl key is not held, it sets the selection to only include the clicked circle.
   *
   * @param {number} index - The index of the circle that was clicked.
   * @param {React.MouseEvent} event - The mouse event triggered by the click action.
   *
   * @returns {void} This function does not return a value.
   */
  const handleCircleClick = (index: number, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      setSelectedCircles((prevSelected) => {
        const updatedCircles = prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index];
        return updatedCircles;
      });
    } else {
      setSelectedCircles([index]);
    }
  };

  return (
    <div className="App min-h-screen grid-center bg-gray-100">
      <div className="wrapper flex flex-col items-center justify-center gap-4">
        <Button onClick={handleAddCircle} className="bg-sky-400 text-white" text="Добавить круг" />
        <Window
          circles={circles}
          selectedCircles={selectedCircles}
          //className={`min-w-[${windowX}px] min-h-[${windowY}px]`} update: tailwind bug occurs -> moved to style attribute
          style={{ minWidth: `${windowX}px`, minHeight: `${windowY}px` }}
          onMoveCircle={handleMoveCircle}
          onClickCircle={handleCircleClick}
        />
      </div>
    </div>
  );
}

export default App;
