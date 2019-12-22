import React, { useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconOverview from '../../assets/icon-overview.js';
import IconTree from '../../assets/icon-tree';

const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 34
    },
    container: {
        backgroundColor: '#363740',
        width: 255,
        paddingTop: 32,
        height: 'calc(100% - 32px)'
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 255,
        height: 'calc(100% - 32px)',
        zIndex: 901
    },
    mainContainer: {
        height: '100%',
        minHeight: '100vh'
    },
    mainContainerMobile: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh',
    },
    menuItemList: {
        marginTop: 52
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
});

const SidebarComponent = (props) => {
  const [state, setState] = useState({
    expanded: false,
  });

  const onItemClicked = (item) => {
    setState({ expanded: false });
    return props.onChange(item);
  }

  let isMobile = () => window.innerWidth <= 768;

  const toggleMenu = () => setState(prevState => ({ expanded: !prevState.expanded }));

  const { expanded } = state;
  isMobile = isMobile();

  return (
    <div style={{ position: 'relative' }}>
      <Row className={css(styles.mainContainer)} breakpoints={{ 768: css(styles.mainContainerMobile, expanded && styles.mainContainerExpanded) }}>
        {(isMobile && !expanded)}
        <Column className={css(styles.container)} breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
          <LogoComponent />
          <Column className={css(styles.menuItemList)}>
            <MenuItemComponent
              title="Overview" icon={IconOverview}
              onClick={() => onItemClicked('Overview')}
              active={props.selectedItem === 'Overview'}
            />
            <MenuItemComponent
              title="Tickets" icon={IconTree}
              onClick={() => onItemClicked('BinaryTree')}
              active={props.selectedItem === 'BinaryTree'}
            />
          </Column>
        </Column>
        {isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={toggleMenu}></div>}
      </Row>
    </div>
  );
}

export default SidebarComponent;
