import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TabButton } from '@aloompa/mobile-first-components';

storiesOf('Text', module).add('with text', () => <p>Hello</p>);

storiesOf('TabButton', module).add('unselected', () => (
  <TabButton
    selected={false}
    iconUnselectedColor={'#ccc'}
    iconHeight={18}
    iconWidth={20}
    iconSelectedColor={'#FF00FF'}
    title={'Browse'}
    iconUrl={
      'https://s3.amazonaws.com/assets.aloompa.com/TestFolder/reservations-tab-icon-browse.svg'
    }
  />
));
