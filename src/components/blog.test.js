import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'simple paper',
  author: 'xue',
  url: 'empty',
  likes: 5,
  user: { username: 'xjyssg', name: 'xue', id: '5f6bf86a6c71eaadbcbfe7ad' }
}

const user = {
  name: 'jia',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhqeSIsImlkIjoiNWY2YmZlMjcwZjFlMjUzMzZjM2M2MWQ2IiwiaWF0IjoxNjAxMDE2NjI2fQ.30JhS8tgSPSrusbzQ_FbFXmLskOczohBCHpHg8Xe8X0',
  username: 'xjy'
}


test('render title & author', () => {
  const component = render(
    <Blog
      user={user}
      blog={blog}
    />
  )

  expect(component.container).toHaveTextContent('simple paper')
  expect(component.container).toHaveTextContent('xue')

  const details = component.container.querySelector('.details')
  expect(details).toHaveTextContent('empty')
  expect(details).toHaveTextContent('5')
  expect(details).toHaveStyle('display:none')
})

test('render details after clicking', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      user={user}
      blog={blog}
      testfcn={mockHandler}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const details = component.container.querySelector('.details')
  expect(details).toHaveTextContent('empty')
  expect(details).toHaveTextContent('5')
  expect(details).not.toHaveStyle('display:none')
})

test('click twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      user={user}
      blog={blog}
      testfcn={mockHandler}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})