export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  let interval = seconds / 31536000

  switch (true) {
      case interval > 1:
          return `${Math.floor(interval)}년 전`
      case (interval = seconds / 2592000) > 1:
          return `${Math.floor(interval)}달 전`
      case (interval = seconds / 86400) > 1:
          return `${Math.floor(interval)}일 전`
      case (interval = seconds / 3600) > 1:
          return `${Math.floor(interval)}시간 전`
      case (interval = seconds / 60) > 1:
          return `${Math.floor(interval)}분 전`
      default:
          return `방금 전`
  }
}
