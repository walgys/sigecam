import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AccountBoxTwoTone,
  AssessmentTwoTone,
  EditLocationTwoTone,
} from '@material-ui/icons';
import Menu from '../../components/Menu';

const Home = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'GESTIONES',
      text: 'Realizar gestiones de Pacientes y recursos',
      component: Link,
      to: '/gestiones',
      icon: AccountBoxTwoTone,
      iconColor: colors.blue,
    },
    {
      title: 'ESTADÍSTICAS',
      text: 'Genere estadísticas relevantes al seguimiento COVID-19',
      component: Link,
      to: '/estadisticas',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'MAPA INTERACTIVO',
      text: 'Visualice un HeatMap o busque instituciones por Geolocalización',
      component: Link,
      to: '/mapa',
      icon: EditLocationTwoTone,
      iconColor: colors.red,
    },
  ];

  const allowedRoutes = accessByUserType?.filter(
    (a) => a.id === user?.userData?.tipoUsuario
  )[0]?.allowedRoutes;

  const allowedButtons = buttonArray.filter((ba) =>
    allowedRoutes.find((ar) => ar.route === ba.to)
  );

  return <Menu allowedButtons={allowedButtons} />;
};

export default Home;
