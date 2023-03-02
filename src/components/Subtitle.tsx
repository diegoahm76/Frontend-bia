import { Box, Typography } from '@mui/material';
interface Props {
  title: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Subtitle: React.FC<Props> = ({ title }: Props) => {
  return (
    <Box
      className={`border px-4 text-white fs-5 p-1`}
      sx={{
        display: 'grid',
        width: '100%',
        height: '40px',
        color: '#fff',
        fontSize: '15px',
        fontWeight: '900',
        alignContent: 'center',
      }}
    >
      <Typography>{title}</Typography>
    </Box>
  );
};
