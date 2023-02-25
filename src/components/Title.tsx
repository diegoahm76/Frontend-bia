import { Box, Typography } from '@mui/material';
interface Props {
  title: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Title: React.FC<Props> = ({ title }: Props) => {
  return (
    <Box
      className={`border px-4 text-white fs-5 p-1`}
      sx={{
        display: 'grid',
        background:
          'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
        width: '100%',
        height: '40px',
        color: '#fff',
        borderRadius: '10px',
        pl: '20px',
        fontSize: '17px',
        fontWeight: '900',
        alignContent: 'center',
      }}
    >
      <Typography>{title}</Typography>
    </Box>
  );
};
