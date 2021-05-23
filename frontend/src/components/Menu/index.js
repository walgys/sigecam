import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import MediaCard from '../../components/MediaCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  container: {
    padding: '5%',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    rowGap: '2rem',
  },
});

const Menu = (props) => {
  const { allowedButtons } = props;
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {allowedButtons.map((ab, idx) => (
        <MediaCard
          key={`${ab.to}-${idx}`}
          title={ab.title}
          text={ab.text}
          component={ab.component}
          to={ab.to}
          Icon={ab.icon}
          iconColor={ab.iconColor}
        />
      ))}
    </Container>
  );
};

export default Menu;
