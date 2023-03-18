import { type ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress, { type LinearProgressProps } from '@mui/material/LinearProgress';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LinearProgressWithLabel:(props: LinearProgressProps & { value: number;}) => JSX.Element = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 100 }}>
        <Typography variant="body2" color="text.secondary" sx={{ p: '10px' }}>
          {`${ Math.round(props.value) } sales`}
        </Typography>
      </Box>
    </Box>
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LinearWithValueLabel = ():ReactElement => {
  const [progress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     set_progress((prevProgress) => (prevProgress >= 50 ? 0 : prevProgress + 5));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Box sx={{ width: '200%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
