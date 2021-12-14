/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'

// import testing methods
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

// the component to test
// import Fetch from '../fetch'

import Home from '../pages/index'




describe('Home', () => {
  const mocks = [];

  it('renders a heading', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
      )

    const heading = screen.getByText('Increase your productivity')

    expect(heading).toBeInTheDocument()
  })
})