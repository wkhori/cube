import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useState } from 'react';

interface DragRotateHook {
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp: (e: ThreeEvent<PointerEvent>) => void;
}

export const useDragRotate = (onDragEnd: (direction: 'horizontal' | 'vertical') => void): DragRotateHook => {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onPointerUp = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (startPos) {
        const endPos = { x: e.clientX, y: e.clientY };
        const dx = endPos.x - startPos.x;
        const dy = endPos.y - startPos.y;

        if (Math.abs(dx) > Math.abs(dy)) {
          onDragEnd('horizontal');
        } else {
          onDragEnd('vertical');
        }
        setStartPos(null);
      }
    },
    [startPos, onDragEnd]
  );

  return { onPointerDown, onPointerUp };
};
