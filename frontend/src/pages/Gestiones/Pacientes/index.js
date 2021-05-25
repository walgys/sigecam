import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AssignmentIndTwoTone,
  FaceTwoTone,
  GroupTwoTone,
  BusinessTwoTone,
  ExtensionTwoTone,
  ContactsTwoTone,
  AccountTreeTwoTone,
  TransferWithinAStationTwoTone,
} from '@material-ui/icons';
import Menu from 'components/Menu';

const Pacientes = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'DATOS DE PACIENTE',
      text: 'Alta o modificación de datos de pacientes',
      component: Link,
      to: '/gestiones/pacientes/datos',
      icon: ContactsTwoTone,
      iconColor: colors.blue,
    },
    {
      title: 'RECURSOS DEL PACIENTE',
      text: 'Asignar o quitar recursos a un paciente',
      component: Link,
      to: '/gestiones/pacientes/recursos',
      icon: AccountTreeTwoTone,
      iconColor: colors.red,
    },
    {
      title: 'ESTADO DE PACIENTE',
      text: 'Modificar el estado del paciente',
      component: Link,
      to: '/gestiones/pacientes/estado',
      icon: TransferWithinAStationTwoTone,
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

export default Pacientes;
