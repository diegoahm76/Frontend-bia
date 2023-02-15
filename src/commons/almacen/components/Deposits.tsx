import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Deposits: React.FC = () => {
  return (
    <>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#">
          View balance
        </Link>
      </div>
    </>
  );
};
