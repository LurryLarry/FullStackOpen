import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Meikäläisen blogi',
    author: 'Maija Huu',
    url: 'www.semmone.fi',
    likes: 10
  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
    component.debug()
  })

  test('render only title when not opened', () => {
    expect(
      component.container.querySelector('.onlyTitle')
    ).toBeDefined()
  })
})