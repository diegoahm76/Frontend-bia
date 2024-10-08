/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IVisualTexto {
  elements: string[];
}

export function VisaulTexto({ elements }: IVisualTexto) {
  const [expanded, setExpanded] = React.useState(true);

  const elementsFromIndexOne = elements?.slice(1, elements.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '95%' }}>
      <CardContent>
        <Typography
          sx={{
            textAlign: 'center',
          }}
          paragraph
        >
          {elements ? elements[0] : '...'}
        </Typography>
      </CardContent>

      {elementsFromIndexOne.length > 0 && (
        <>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {elements?.map((element, index) => {
                if (index > 0) {
                  return (
                    <Typography
                      sx={{
                        textAlign: 'center',
                      }}
                      paragraph
                      key={index}
                    >
                      {element}
                    </Typography>
                  );
                }
              })}
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
}
