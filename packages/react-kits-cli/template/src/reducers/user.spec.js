import { toggleLogin, userReducer } from './user'

describe('user reducer', () => {
  it('should toggle login correctly', () => {
    const state = userReducer(
      {
        isLoggedIn: false
      },
      toggleLogin()
    )
    expect(state.isLoggedIn).toBeTruthy()
  })

  it('should toggle login correctly - case: reverse', () => {
    const state = userReducer(
      {
        isLoggedIn: true
      },
      toggleLogin()
    )
    expect(state.isLoggedIn).toBeFalsy()
  })

  it('should handle initial state', () => {
    const state = userReducer(undefined, 'default')
    expect(state.isLoggedIn).toBeFalsy()
  })

  it('should handle default', () => {
    const state = userReducer(
      {
        isLoggedIn: false
      },
      'default'
    )
    expect(state.isLoggedIn).toBeFalsy()
  })
})
