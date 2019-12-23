import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Logo from '../../assets/icon-logo';

import LogoStyles from '../../styles/Sidebar/LogoStyles';

const styles = StyleSheet.create(LogoStyles);

function LogoComponent() {
  return (
    <Row className={css(styles.container)} horizontal="center" vertical="center">
      <Logo />
      <span className={css(styles.title)}>Des Arbres Visualization</span>
    </Row>
  );
}

export default LogoComponent;
