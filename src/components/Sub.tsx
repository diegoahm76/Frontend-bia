import { Box, Typography } from '@mui/material';
interface Props {
  title: string;
  width?: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Sub: React.FC<Props> = ({ title, width }: Props) => {
  return (
    <Box
      className={`border px-4 text-white fs-5 p-1`}
      sx={{
        display: 'grid',
        background:
          'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
        margin: '0 auto',
        width: (width || '95%'),
        height: '40px',
        color: '#fff',
        borderRadius: '10px',
        pl: '20px',
        mt: '10px',
        alignContent: 'center',
        marginTop: '10px',
      }}
    >
      <Typography
        sx={{
          fontSize: '.8rem',
          fontWeight: '900',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
