/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useRef } from 'react';

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('right');
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const [food, setFood] = useState({ x: 15, y: 10 });

  const canvasWidth = 20;
  const canvasHeight = 20;
  const boxSize = 20;

  useEffect(() => {
    const context =  canvasRef?.current?.getContext('2d') as CanvasRenderingContext2D;

    const handleKeyDown = (event: { keyCode: number; }) => {
      if (event.keyCode === 37 && direction !== 'right') {
        setDirection('left');
      } else if (event.keyCode === 38 && direction !== 'down') {
        setDirection('up');
      } else if (event.keyCode === 39 && direction !== 'left') {
        setDirection('right');
      } else if (event.keyCode === 40 && direction !== 'up') {
        setDirection('down');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const gameLoop = setInterval(() => {
      moveSnake();
      checkCollision();
      checkFood();
      drawCanvas(context);
    }, 200);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoop);
    };
  }, []);

  const moveSnake = () => {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
      case 'left':
        head.x--;
        break;
      case 'up':
        head.y--;
        break;
      case 'right':
        head.x++;
        break;
      case 'down':
        head.y++;
        break;
      default:
        break;
    }

    const newSnake = [head, ...snake.slice(0, -1)];
    setSnake(newSnake);
  };

  const checkCollision = () => {
    const head = snake[0];

    // Verificar colisión con las paredes
    if (
      head.x < 0 ||
      head.x >= canvasWidth ||
      head.y < 0 ||
      head.y >= canvasHeight
    ) {
      setGameOver(true);
    }

    // Verificar colisión con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
      }
    }
  };

  const checkFood = () => {
    const head = snake[0];

    // Verificar si la serpiente alcanza la comida
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      generateFood();
      growSnake();
    }
  };

  const growSnake = () => {
    const tail = { ...snake[snake.length - 1] };
    setSnake([...snake, tail]);
  };

  const generateFood = (): any => {
    const newFood = {
      x: Math.floor(Math.random() * canvasWidth),
      y: Math.floor(Math.random() * canvasHeight)
    };

    // Verificar que la comida no aparezca en el cuerpo de la serpiente
    for (let i = 0; i < snake.length; i++) {
      if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
        return generateFood();
      }
    }

    setFood(newFood);
  };

  const drawCanvas = (context: any) => {
    // Limpiar el canvas
    context.clearRect(0, 0, canvasWidth * boxSize, canvasHeight * boxSize);

    // Dibujar la serpiente
    snake.forEach(({ x, y }) => {
      context.fillStyle = 'green';
      context.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    });

    // Dibujar la comida
    context.fillStyle = 'red';
    context.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Mostrar puntuación
    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 20);

    // Mostrar mensaje de fin de juego
    if (gameOver) {
      context.fillStyle = 'black';
      context.font = '30px Arial';
      context.fillText('Game Over', 80, 200);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth * boxSize}
        height={canvasHeight * boxSize}
      />
    </div>
  );
};