const { PUBLIC_URL } = process.env

export const me = 'kev'

export const mobileBreakpoint = 'max-width: 800px'
export const notMobileBreakpount = 'min-width: 801px'

export const routePaths = {
  home: PUBLIC_URL + '/',
  chat: PUBLIC_URL + '/chat',
  dashboard: PUBLIC_URL + '/dashboard'
}

export const getUserChatPath = user => `${routePaths.chat}/${user}`
