import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AssignmentIndTwoTone,
  FaceTwoTone,
  GroupTwoTone,
  BusinessTwoTone,
  ExtensionTwoTone,
} from '@material-ui/icons';
import Menu from 'components/Menu';

const GestRecursos = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'RECURSOS GENERALES',
      text: 'Crear o modificar recursos del sistema',
      component: Link,
      to: '/gestiones/recursos/generales',
      icon: GroupTwoTone,
      iconColor: colors.blue,
    },
    {
      title: 'RECURSOS DE INTITUCIÓN',
      text: 'Crear, modificar o eliminar usuarios del sistema',
      component: Link,
      to: '/gestiones/recursos/instituciones',
      icon: AssignmentIndTwoTone,
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

export default GestRecursos;
