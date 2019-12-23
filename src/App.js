import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import HeaderComponent from './components/Header/HeaderComponent';
import SidebarComponent from './components/Sidebar/SidebarComponent';
import ContentComponent from './components/Content/ContentComponent';

import AppStyles from './styles/AppStyles';

import './index.css';
import './d3.css';

const styles = StyleSheet.create(AppStyles);

const useForceUpdate = () => useState()[1];

const App = () => {

  const [state, setState] = useState({
    selectedItem: 'BinaryTree',
  });

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [])

  const resize = () => useForceUpdate;

  const { selectedItem } = state;
  return (
    <Row className={css(styles.container)}>
      <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => setState({ selectedItem })} />
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title={selectedItem} />
        <div className={css(styles.content)}>
          <ContentComponent />
        </div>
      </Column>
    </Row>
  );
}

export default App;
