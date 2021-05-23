import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AssessmentTwoTone } from '@material-ui/icons';
import Menu from '../../components/Menu';

const Estadisticas = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'ESTADÍSTICA TOTAL',
      text: 'Módulo completo de estadística',
      component: Link,
      to: '/estadisticas/total',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'ESTADÍSTICA INSTITUCIONAL',
      text: 'Ver estadísticas de la institución',
      component: Link,
      to: '/estadisticas/institucional',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'ESTADÍSTICA NACIONAL',
      text: 'Ver estadísticas nacionales',
      component: Link,
      to: '/estadisticas/nacional',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'ESTADÍSTICA PROVINCIAL',
      text: 'Ver estadísticas provinciales',
      component: Link,
      to: '/estadisticas/provincial',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'ESTADÍSTICA REGIONAL',
      text: 'ver estadísticas regionales',
      component: Link,
      to: '/estadisticas/regional',
      icon: AssessmentTwoTone,
      iconColor: colors.green,
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

export default Estadisticas;
