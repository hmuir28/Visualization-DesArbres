import React from 'react';
import { bool, func, string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

import MenuItemStyles from '../../styles/Sidebar/MenuItemStyles';

const styles = StyleSheet.create(MenuItemStyles);

function MenuItemComponent(props) {
  const { active, icon, title, ...otherProps } = props;
  const Icon = icon;
  return (
    <Row className={css(styles.container, active && styles.activeContainer)} vertical="center" {...otherProps}>
      {active && <div className={css(styles.activeBar)}></div>}
      <Icon fill={active && "#DDE2FF"} opacity={!active && "0.4"} />
      <span className={css(styles.title, active && styles.activeTitle)}>{title}</span>
    </Row>
  );
}

MenuItemComponent.propTypes = {
  active: bool,
  icon: func,
  title: string
};

export default MenuItemComponent;
