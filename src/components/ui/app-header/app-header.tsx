import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `${styles.link} text text_type_main-default ml-2 mr-10 ${isActive ? styles.link_active : null}`
          }
        >
          <BurgerIcon type={'primary'} />
          <span
            style={{
              marginLeft: 'calc(var(--offset-base-size)  * 2)',
              lineHeight: '1.5'
            }}
          >
            Конструктор
          </span>
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            `${styles.link} text text_type_main-default ml-2 ${isActive ? styles.link_active : null}`
          }
        >
          <ListIcon type={'primary'} className={styles.link} />
          <span
            style={{
              marginLeft: 'calc(var(--offset-base-size)  * 2)',
              lineHeight: '1.5'
            }}
          >
            Лента заказов
          </span>
        </NavLink>
      </div>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `${styles.logo} ${styles.link} ${styles.link_position_last} text text_type_main-default ml-2 ${isActive ? styles.link_active : null}`
        }
      >
        <Logo className='' />
      </NavLink>
      <NavLink
        to='/profile'
        className={({ isActive }) =>
          `${styles.link} ${styles.link_position_last} text text_type_main-default ml-2 ${isActive ? styles.link_active : null}`
        }
      >
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </p>
      </NavLink>
    </nav>
  </header>
);
