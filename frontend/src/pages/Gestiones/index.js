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
import Menu from '../../components/Menu';

const Gestiones = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'GESTIONAR GRUPOS',
      text: 'Gestionar los grupos de acceso',
      component: Link,
      to: '/gestiones/grupos',
      icon: GroupTwoTone,
      iconColor: colors.blue,
    },
    {
      title: 'GESTIONAR USUARIOS',
      text: 'Crear, modificar o eliminar usuarios del sistema',
      component: Link,
      to: '/gestiones/usuarios',
      icon: AssignmentIndTwoTone,
      iconColor: colors.green,
    },
    {
      title: 'GESTIONAR INSTITUCIONES',
      text: 'Crear, modificar o eliminar las instituciones',
      component: Link,
      to: '/gestiones/instituciones',
      icon: BusinessTwoTone,
      iconColor: colors.red,
    },
    {
      title: 'GESTIONAR RECURSOS',
      text: 'Gestionar la asignación de recursos',
      component: Link,
      to: '/gestiones/recursos',
      icon: ExtensionTwoTone,
      iconColor: colors.lightViolet,
    },
    {
      title: 'ADMINISTRAR PACIENTES',
      text: 'Alta, baja y modificación de datos de pacientes',
      component: Link,
      to: '/gestiones/pacientes',
      icon: FaceTwoTone,
      iconColor: colors.black,
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

export default Gestiones;
