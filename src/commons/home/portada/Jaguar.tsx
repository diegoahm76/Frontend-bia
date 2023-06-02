/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line @typescript-eslint/naming-convention

import {motion} from 'framer-motion';

/* const styles = {
  maxHeight: '298px',
  width: '100%',
  height: '220%',
  marginLeft: '-20px',
  marginTop: '-120px',
} */



export const Jaguar: React.FC = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1.2, 1, 1],
      }}
      transition={{
        duration: 2,
      }}
    >
    <img src='../image/imagenes/Jaguar.png' style={{
  maxHeight: '298px',
  // width: '100%',
  height: '220%',
  position: 'absolute',
  zIndex: 1,
  left: '-10px',
  bottom: '-5px  ',
}}
    />
    </motion.div>
  );
}
