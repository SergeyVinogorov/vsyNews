import React, { Component } from 'react'

const asyncComponent = (importComponent) => class extends Component {
  // eslint-disable-next-line react/state-in-constructor
    state = {
      component: null,
    }

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default })
      })
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      const C = this.state.component
      // eslint-disable-next-line react/jsx-props-no-spreading
      return C ? <C {...this.props} /> : null
    }
}

export default asyncComponent
