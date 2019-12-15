import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import HeaderComponent from './components/Header/HeaderComponent';
import SidebarComponent from './components/Sidebar/SidebarComponent';
import './index.css';

const styles = StyleSheet.create({
    container: {
      height: '100%',
      minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
      backgroundColor: '#F7F8FC',
      padding: 30
    }
});

const useForceUpdate = () => useState()[1];

const App = () => {

  const [state, setState] = useState({
    selectedItem: 'Tickets',
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
        </div>
      </Column>
    </Row>
  );
}

export default App;
