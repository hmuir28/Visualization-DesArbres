import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';

import ContentStyles from '../../styles/Content/ContentStyles';

const styles = StyleSheet.create(ContentStyles);

function ContentComponent() {
  return (
    <Column>
      <Row className={css(styles.cardsContainer)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 768: 'column' }}>
        <Row className={css(styles.cardRow)} wrap flexGrow={1} horizontal="space-between" breakpoints={{ 384: 'column' }}>

        </Row>
      </Row>
    </Column>
  );
}

export default ContentComponent;
