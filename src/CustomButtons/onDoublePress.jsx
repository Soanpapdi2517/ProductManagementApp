import { useRef } from 'react';
import { Pressable, Text } from 'react-native';

const DoublePressable = ({ onDoublePress, children, style }) => {
  const lastPress = useRef(0);

  const handlePress = () => {
    console.log(lastPress.current);
    const time = new Date().getTime();
    const delta = time - lastPress.current;

    if (delta < 300) {
      // 300ms threshold for double press
      onDoublePress && onDoublePress();
    }
    lastPress.current = time;
  };

  return (
    <Pressable style={style} onPress={handlePress}>
      {children}
    </Pressable>
  );
};

export default DoublePressable;
