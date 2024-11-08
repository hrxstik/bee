import React from 'react';
import logo from './logo.svg';
import { Button } from './components/Button';
import { Window } from './components/Window';
import { addCircle } from './utils/addCircle';

function App() {
  const [circles, setCircles] = React.useState<{ x: number; y: number; diameter: number }[]>([]);

  const handleAddCircle = () => {
    const newCircle = addCircle({ windowX, windowY });
    setCircles([...circles, newCircle]);
  };

  const handleMoveCircle = (index: number, newX: number, newY: number) => {
    const updatedCircles = circles.map((circle, i) =>
      i === index ? { ...circle, x: newX, y: newY } : circle,
    );
    setCircles(updatedCircles);
  };

  const windowX = 1024;
  const windowY = 512;

  return (
    <div className="App min-h-screen grid-center bg-gray-100">
      <div className="wrapper flex flex-col items-center justify-center gap-4">
        <Button onClick={handleAddCircle} className="bg-sky-400 text-white" text="Добавить круг" />
        <Window
          circles={circles}
          className={`min-w-[${windowX}px] min-h-[${windowY}px]`}
          onMoveCircle={handleMoveCircle}
        />
      </div>
    </div>
  );
}

export default App;
