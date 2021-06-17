import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()

  const blog = {
    title: 'Meikäläisen blogi',
    author: 'Maija Huu',
    url: 'www.semmone.fi',
    likes: 10,
    user: {
      username: 'ukko',
      name: 'Joku Ukko'
    }
  }
  const user = {
    user: {
      username: 'ukko'
    }
  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} toggleVisibility={mockHandler}/>
    )
    component.debug()
  })

  test('render only title when not opened', () => {
    expect(
      component.container.querySelector('.onlyTitle')
    ).toBeDefined()
  })

  test('render all info after button click', async () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const div = component.getByText('www.semmone.fi')
    expect(div).toHaveStyle('display: block')
  })
})