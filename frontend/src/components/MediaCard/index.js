import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    fontSize: '10rem',
    marginTop: '2%',
  },
  blue: {
    filter:
      'invert(28%) sepia(25%) saturate(4197%) hue-rotate(215deg) brightness(90%) contrast(86%)',
  },
  green: {
    filter:
      'invert(55%) sepia(37%) saturate(535%) hue-rotate(86deg) brightness(93%) contrast(90%)',
  },
  red: {
    filter:
      'invert(19%) sepia(85%) saturate(4776%) hue-rotate(335deg) brightness(91%) contrast(93%)',
  },
  black: {
    filter:
      'invert(9%) sepia(70%) saturate(502%) hue-rotate(157deg) brightness(97%) contrast(103%)',
  },
  darkViolet: {
    filter:
      'invert(17%) sepia(32%) saturate(668%) hue-rotate(225deg) brightness(91%) contrast(85%)',
  },
  lightViolet: {
    filter:
      'invert(30%) sepia(4%) saturate(2899%) hue-rotate(231deg) brightness(90%) contrast(82%)',
  },
});

const MediaCard = (props) => {
  const classes = useStyles();
  const { colors } = useSelector((state) => state.constants);

  const { Icon, iconColor, title, text, component, to } = props;
  let iColorClassName = classes.blue;
  if (iconColor === colors.green) iColorClassName = classes.green;
  if (iconColor === colors.red) iColorClassName = classes.red;
  if (iconColor === colors.black) iColorClassName = classes.black;
  if (iconColor === colors.darkViolet) iColorClassName = classes.darkViolet;
  if (iconColor === colors.lightViolet) iColorClassName = classes.lightViolet;

  return (
    <Card className={classes.root}>
      <CardActionArea component={component} to={to}>
        <Icon className={`${classes.icon} ${iColorClassName}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
