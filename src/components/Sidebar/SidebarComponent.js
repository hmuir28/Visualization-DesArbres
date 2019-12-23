import React, { useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconOverview from '../../assets/icon-overview.js';
import IconTree from '../../assets/icon-tree';

import SidebarStyles from '../../styles/Sidebar/SidebarStyles';

const styles = StyleSheet.create(SidebarStyles);

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
