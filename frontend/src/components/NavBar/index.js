import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import {
  AssessmentTwoTone,
  AccountBoxTwoTone,
  FaceTwoTone,
  ExtensionTwoTone,
  AirlineSeatIndividualSuiteTwoTone,
  PersonPinTwoTone,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      color: 'white',
      display: 'flex',
      alignText: 'center',
      textDecoration: 'none',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  breadcrumbs: {
    color: 'white',
  },
  link: {
    display: 'flex',
    color: 'silver',
  },
  currentLink: {
    display: 'flex',
    color: 'white',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function PrimarySearchAppBar(props) {
  const { isAuth } = props;
  const classes = useStyles();
  const location = useLocation();
  const pathRoutes = location?.pathname?.split('/');
  const routeIconList = useSelector((state) => state.constants.routeIcons);
  const iconList = [
    {
      name: 'AssessmentTwoTone',
      icon: <AssessmentTwoTone className={classes.icon} />,
    },
    {
      name: 'FaceTwoTone',
      icon: <FaceTwoTone className={classes.icon} />,
    },
    {
      name: 'AccountBoxTwoTone',
      icon: <AccountBoxTwoTone className={classes.icon} />,
    },
    {
      name: 'ExtensionTwoTone',
      icon: <ExtensionTwoTone className={classes.icon} />,
    },
    {
      name: 'ContactsTwoTone',
      icon: <AssessmentTwoTone className={classes.icon} />,
    },
    {
      name: 'AirlineSeatIndividualSuiteTwoTone',
      icon: <AirlineSeatIndividualSuiteTwoTone className={classes.icon} />,
    },
    {
      name: 'PersonPinTwoTone',
      icon: <PersonPinTwoTone className={classes.icon} />,
    },
  ];
  const breadcrumbs = pathRoutes?.map((p, idx) => {
    if (p === '' && idx === 0) {
      return (
        <Link
          component={NavLink}
          key={`${idx}-${p}`}
          color="inherit"
          to="/"
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Home
        </Link>
      );
    }
    if (idx === pathRoutes?.length - 1 && p !== '') {
      return (
        <Typography
          key={`${idx}-${p}`}
          color="textPrimary"
          className={classes.currentLink}
        >
          <GrainIcon className={classes.icon} />
          {p}
        </Typography>
      );
    }
    let href = '';
    for (let i = 1; i <= idx; i++) {
      href += `/${pathRoutes[i]}`;
    }

    const Icon = () => {
      if (routeIconList.length > 0 && iconList.length > 0) {
        console.log(routeIconList.filter((r) => r.route == href)[0]);
        const icon = iconList.filter(
          (i) => i.name == routeIconList.filter((r) => r.route == href)[0].icon
        )[0];

        return typeof icon !== 'undefined' ? (
          icon.icon
        ) : (
          <WhatshotIcon className={classes.icon} />
        );
      }
    };

    if (p !== '')
      return (
        <Link
          component={NavLink}
          key={`${idx}-${p}`}
          color="inherit"
          to={href}
          className={classes.link}
        >
          {Icon()}
          {p}
        </Link>
      );
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <NavLink className={classes.title} to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              SIGECAM
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuth && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {isAuth && (
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
