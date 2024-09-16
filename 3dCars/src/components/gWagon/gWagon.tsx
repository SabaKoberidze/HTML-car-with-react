import React, { useState, useEffect, useRef } from 'react';
import './gWagonStyle.scss';
import Wheel from '../wheel/wheel';

const GWagon: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotateZ, setRotateZ] = useState(250);
  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setIsMovingForward(true);
      }

      if (event.key === 'ArrowDown') {
        setIsReversing(true);
      }

      if (event.key === 'ArrowLeft') {
        setIsRotatingLeft(true);
      } else if (event.key === 'ArrowRight') {
        setIsRotatingRight(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setIsMovingForward(false);
      }

      if (event.key === 'ArrowDown') {
        setIsReversing(false);
      }

      if (event.key === 'ArrowLeft') {
        setIsRotatingLeft(false);
      } else if (event.key === 'ArrowRight') {
        setIsRotatingRight(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const updatePositionAndRotation = () => {
    const moveStep = 5; 
    const rotateStep = 2; 

    setRotateZ((prevRotateZ) => {
      if (isMovingForward || isReversing) {
        if (isRotatingLeft) {
          return isReversing ? prevRotateZ - rotateStep : prevRotateZ + rotateStep;
        } else if (isRotatingRight) {
          return isReversing ? prevRotateZ + rotateStep : prevRotateZ - rotateStep;
        }
      }
      return prevRotateZ;
    });

    setPositionX((prevPositionX) => {
      if (isMovingForward || isReversing) {
        const angleInRadians = (rotateZ * Math.PI) / 180;
        const deltaX = moveStep * Math.sin(angleInRadians);
        return isReversing ? prevPositionX - deltaX : prevPositionX + deltaX;
      }
      return prevPositionX;
    });

    setPositionY((prevPositionY) => {
      if (isMovingForward || isReversing) {
        const angleInRadians = (rotateZ * Math.PI) / 180;
        const deltaY = -moveStep * Math.cos(angleInRadians);
        return isReversing ? prevPositionY - deltaY : prevPositionY + deltaY;
      }
      return prevPositionY;
    });

    requestRef.current = requestAnimationFrame(updatePositionAndRotation);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePositionAndRotation);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isMovingForward, isReversing, isRotatingLeft, isRotatingRight, rotateZ]);

  return (
    <div className="gWagon">
      <div
        className="body"
        style={{
          transform: `rotateX(-110deg) translateX(${positionX}px) translateY(${positionY}px) rotateZ(${rotateZ}deg)`,
        }}
      >
        <div className="roof"></div>
        <div className="back">
          <div className="trunk">
            <div className="window"></div>
            <Wheel type="spareTire" />
          </div>
          <div className="tailLights">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="leftSide">
          <div className="frontDoor">
            <div className="mirror"></div>
            <div className="windowCover"></div>
            <div className="window"></div>
          </div>
          <div className="backDoor">
            <div className="windowCover"></div>
            <div className="window"></div>
          </div>
          <div className="window"></div>
          <div className="wheelCoverFront"></div>
          <div className="wheelCoverBack"></div>
        </div>
        <div className="rightSide">
          <div className="frontDoor">
            <div className="mirror"></div>
            <div className="windowCover"></div>
            <div className="window"></div>
          </div>
          <div className="backDoor">
            <div className="windowCover"></div>
            <div className="window"></div>
          </div>
          <div className="window"></div>
          <div className="wheelCoverFront"></div>
          <div className="wheelCoverBack"></div>
        </div>
        <div className="frontLeft">
         
        </div>
        <div className="frontRight">
        
        </div>
        <div className="windShield">
          <div className="glass"></div>
        </div>
        <div className="hood"></div>
        <div className="front">
          <div className="upperSide">
            <div className="headLight"></div>
            <div className="grill">
              <div className="logo">B</div>
            </div>
            <div className="headLight"></div>
          </div>
          <div className="lowerSide">
            <div></div>
          </div>
        </div>
        <div className="wheels">
          <Wheel 
            movement={isMovingForward ? 'movingForward' : isReversing ? 'reversing' : undefined} 
            rotation={isRotatingLeft ? 'left' : isRotatingRight ? 'right' : undefined} 
          />
           <Wheel 
            movement={isMovingForward ? 'movingForward' : isReversing ? 'reversing' : undefined} 
            rotation={isRotatingLeft ? 'left' : isRotatingRight ? 'right' : undefined} 
          />
          <Wheel  movement={isMovingForward ? 'movingForward' : isReversing ? 'reversing' : undefined}  />
          <Wheel  movement={isMovingForward ? 'movingForward' : isReversing ? 'reversing' : undefined} />
        </div>
      </div>
    </div>
  );
};

export default GWagon;
