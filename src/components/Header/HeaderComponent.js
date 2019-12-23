import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import IconSearch from '../../assets/icon-search';
import IconBellNew from '../../assets/icon-bell-new';

import HeaderStyles from '../../styles/Header/HeaderStyles';

const styles = StyleSheet.create(HeaderStyles);

function HeaderComponent(props) {
  const { icon, title, ...otherProps } = props;
  return (
    <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
      <span className={css(styles.title)}>{title}</span>
      <Row vertical="center">
        <div className={css(styles.iconStyles)}>
          <IconSearch />
        </div>
        <div className={css(styles.iconStyles)}>
          <IconBellNew />
        </div>
        <div className={css(styles.separator)}></div>
        <Row vertical="center">
          <span className={css(styles.name, styles.cursorPointer)}>Harry Muir</span>
          <img src="https://avatars1.githubusercontent.com/u/20231944?s=460&v=4" alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
        </Row>
      </Row>
    </Row>
  );
}

HeaderComponent.propTypes = {
  title: string
};

export default HeaderComponent;
