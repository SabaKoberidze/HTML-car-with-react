import './ui.scss';
import { useState, useEffect } from 'react';

const Ui = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (!activeKeys.includes(key)) {
        setActiveKeys((prevKeys) => [...prevKeys, key]);
        const button = document.querySelector(`.${key}`) as HTMLElement;
        if (button) button.classList.add('active');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      if (activeKeys.includes(key)) {
        setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
        const button = document.querySelector(`.${key}`) as HTMLElement;
        if (button) button.classList.remove('active');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys]);

  const handlePointerDown = (key: string) => {
    if (!activeKeys.includes(key)) {
      setActiveKeys((prevKeys) => [...prevKeys, key]);
      simulateKeyPress(key);
      const button = document.querySelector(`.${key}`) as HTMLElement;
      if (button) button.classList.add('active');
    }
  };

  const handlePointerUp = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      simulateKeyRelease(key);
      const button = document.querySelector(`.${key}`) as HTMLElement;
      if (button) button.classList.remove('active');
    }
  };

  const handlePointerLeave = (key: string) => {
    if (activeKeys.includes(key)) {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
      simulateKeyRelease(key);
      const button = document.querySelector(`.${key}`) as HTMLElement;
      if (button) button.classList.remove('active');
    }
  };

  const simulateKeyPress = (key: string) => {
    const event = new KeyboardEvent('keydown', { key });
    window.dispatchEvent(event);
  };

  const simulateKeyRelease = (key: string) => {
    const event = new KeyboardEvent('keyup', { key });
    window.dispatchEvent(event);
  };

  return (
    <div className='ui'>
      <div className='hints'>
        <p className='hint1'>Use keyboard for this device</p>
        <p className='hint2'>Hover/tap on car parts to open them</p>
      </div>
      <div className='indicators'>
        <div className='vertical'>
          <div
            className='ArrowUp'
            onPointerDown={() => handlePointerDown('ArrowUp')}
            onPointerUp={() => handlePointerUp('ArrowUp')}
            onPointerLeave={() => handlePointerLeave('ArrowUp')}
          ></div>
          <div
            className='ArrowDown'
            onPointerDown={() => handlePointerDown('ArrowDown')}
            onPointerUp={() => handlePointerUp('ArrowDown')}
            onPointerLeave={() => handlePointerLeave('ArrowDown')}
          ></div>
        </div>
        <div className='horizontal'>
          <div
            className='ArrowLeft'
            onPointerDown={() => handlePointerDown('ArrowLeft')}
            onPointerUp={() => handlePointerUp('ArrowLeft')}
            onPointerLeave={() => handlePointerLeave('ArrowLeft')}
          ></div>
          <div
            className='ArrowRight'
            onPointerDown={() => handlePointerDown('ArrowRight')}
            onPointerUp={() => handlePointerUp('ArrowRight')}
            onPointerLeave={() => handlePointerLeave('ArrowRight')}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Ui;
