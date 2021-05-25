import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AssignmentIndTwoTone,
  FaceTwoTone,
  GroupTwoTone,
  BusinessTwoTone,
  ExtensionTwoTone,
  PersonAddTwoTone,
  AirlineSeatIndividualSuiteTwoTone,
} from '@material-ui/icons';
import Menu from 'components/Menu';

const PacientesDatos = () => {
  const { colors, accessByUserType } = useSelector((state) => state.constants);
  const user = useSelector((state) => state.user);

  const buttonArray = [
    {
      title: 'PACIENTE NUEVO',
      text: 'Asignar o quitar recursos a un paciente',
      component: Link,
      to: '/gestiones/pacientes/datos/nuevo',
      icon: PersonAddTwoTone,
      iconColor: colors.blue,
    },
    {
      title: 'PACIENTE EXISTENTE',
      text: 'Alta o modificación de datos de pacientes',
      component: Link,
      to: '/gestiones/pacientes/datos/existente',
      icon: AirlineSeatIndividualSuiteTwoTone,
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

export default PacientesDatos;
