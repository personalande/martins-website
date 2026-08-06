// Generates quote protocol number
export function generateProtocol(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  
  // Random 5 chars uppercase
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomStr = ''
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return `FM-${year}${month}${day}-${randomStr}`
}

export function formatProtocol(protocol: string): string {
  // same, for display
  return protocol
}
