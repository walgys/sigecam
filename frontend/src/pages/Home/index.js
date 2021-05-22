import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import MediaCard from '../../components/MediaCard';
import {
  AccountBoxTwoTone,
  AssessmentTwoTone,
  EditLocationTwoTone,
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  container: {
    padding: '5%',
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const Home = () => {
  const classes = useStyles();
  const { colors, accessByUserType } = useSelector((state) => state.constants);

  return (
    <Container className={classes.container}>
      <MediaCard
        title="GESTIONES"
        text="Realizar gestiones de Pacientes y recursos"
        component={Link}
        to="/gestiones"
        Icon={AccountBoxTwoTone}
        iconColor={colors.blue}
      />
      <MediaCard
        title="ESTADÍSTICAS"
        text="Genere estadísticas relevantes al seguimiento COVID-19"
        component={Link}
        to="/estadisticas"
        Icon={AssessmentTwoTone}
        iconColor={colors.green}
      />
      <MediaCard
        title="MAPA INTERACTIVO"
        text="Visualize un HeatMap o busque instituciones por Geolocalización"
        component={Link}
        to="/mapa"
        Icon={EditLocationTwoTone}
        iconColor={colors.darkViolet}
      />
    </Container>
  );
};

export default Home;
