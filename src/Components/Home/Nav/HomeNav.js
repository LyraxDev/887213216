import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HomeNav.module.css';
import { ReactComponent as PizzaIcon } from '../../../Assets/pizza-icon.svg';
import { ReactComponent as BurguersIcon } from '../../../Assets/burguers-icon.svg';
import { ReactComponent as CombosIcon } from '../../../Assets/combos-icon.svg';
import { ReactComponent as DessertsIcon } from '../../../Assets/desserts-icon.svg';
import { ReactComponent as DrinksIcon } from '../../../Assets/drinks-icon.svg';

const HomeNav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/Esfihas" activeClassName={styles.active}>
        <PizzaIcon />
        Esfihas
      </NavLink>
      <NavLink to="/Bebidas" activeClassName={styles.active}>
        <DrinksIcon />
        Bebidas
      </NavLink>
    </nav>
  );
};

export default HomeNav;