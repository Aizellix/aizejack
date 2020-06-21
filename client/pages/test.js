import React, { PureComponent } from 'react';
import { getCard } from '@utility/api';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      adsValueSetting: null
    };
  }

  static async getInitialProps() {
    const userId = 'th';
    const response = await getCard(userId);

    console.log('*--- response', response);
    return { userId };
  }

  render() {
    return (
      <>
        <h1>Test</h1>
      </>
    );
  }
}

export default Index;
