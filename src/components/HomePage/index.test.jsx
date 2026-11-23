import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '../HomePage'
import * as QrReadModule from '../QrcodeRead'

describe('HomePage', () => {
  vi.spyOn(QrReadModule, 'default').mockImplementation(() => <div>QrCode</div>)

  it('renders correctly the component', () => {
    const { container } = render(<HomePage />)
    expect(container).toMatchSnapshot()
  })

  it('renders the login form correctly', () => {
    render(<HomePage />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('User')).toBeInTheDocument()
  })

  describe('when click the button Login with Qr Code', () => {
    it('renders the component QrRead', async () => {
      render(<HomePage />)
      await userEvent.click(screen.getByText('Login with Qr Code'))
      expect(screen.getByText('QrCode')).toBeInTheDocument()
    })
  })
})