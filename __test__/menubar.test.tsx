import { render, screen } from '@testing-library/react'
import React from 'react'
import MenuBar from '@/views/main/components/menubar'

describe('MenuBar', () => {
  it('should render the menu bar with the correct links', () => {
    render(<MenuBar />)
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /notifications/i })).toHaveAttribute('href', '/notifications')
    expect(screen.getByRole('link', { name: /messages/i })).toHaveAttribute('href', '/messages')
    expect(screen.getByRole('link', { name: /bookmarks/i })).toHaveAttribute('href', '/bookmarks')
  })
})

// pnpm run test
