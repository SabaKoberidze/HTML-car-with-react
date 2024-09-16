import React from 'react';
import './wheel.scss'; 

interface WheelProps {
  type?: string; // Optional type prop
  movement?: 'movingForward' | 'reversing'; // Movement state
  rotation?: 'left' | 'right'; // Rotation direction
}

const Wheel: React.FC<WheelProps> = ({ type, movement, rotation }) => {
  const stripCount = 24; 
  const strips = Array.from({ length: stripCount }, (_, i) => i + 1);

  const rimRodCount = 8;
  const rimRods = Array.from({ length: rimRodCount }, (_, i) => i + 1);
  
  // Construct classes based on props
  const wheelClass = `wheel ${type || ''} ${movement || ''} ${rotation || ''}`;
  
  return (
    <div id="container" className={wheelClass}>
      <div id="frame">      
        <div className='disk'>
          <div className='diskCenter'>
            {rimRods.map((_, index) => {
              const rotation = index * (360 / rimRodCount);
              const style = {
                transform: `rotate(${rotation}deg)`,
              };
              return <div key={index} className='rod' style={style}> </div>
            })}
          </div>
        </div>
        <div className='sideWheel'>
          <div className='wheelBorder'></div>
        </div>
        <div className='sideWheel'>
          <div className='wheelBorder'></div>
        </div>
        <div className="strips">
          {strips.map((_, index) => {
            const rotation = index * (360 / stripCount);
            const style = {
              transform: `rotateY(${rotation}deg) translateZ(5mm)`,
            };
            return <div key={index} className="strip" style={style}></div>;
          })}
          {strips.map((_, index) => {
            const rotation = index * (360 / stripCount);
            const style = {
              transform: `rotateY(${rotation}deg) translateZ(3mm)`,
            };
            return <div key={index} className="strip" style={style}></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
