import { Box, Typography } from '@mui/material';
interface Props {
  title: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubtitleOtros: React.FC<Props> = ({ title }: Props) => {
  return (
    <Box
      className={`border px-4 text-black fs-5 p-1`}
      sx={{
        display: 'grid',
        width: '100%',
        height: '60px',
        color: 'black',
        fontSize: '12px',
        fontWeight: '900',
        alignContent: 'center',
      }}
      alignItems={'center'}
    >
      <Typography>{title}</Typography>
    </Box>
  );
};
