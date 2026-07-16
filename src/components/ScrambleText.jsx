import { useEffect, useState } from 'react'

const SYMBOLS = 'qwertyuiopasdfghjklzxcvbnm-*?><%_&/~;:+$#@!0'

export default function ScrambleText({
  text,
  speed = 45,
  settleDelay = 90,
  className = '',
}) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let frame = 0
    let interval

    const totalFrames = text.length * settleDelay

    interval = window.setInterval(() => {
      const settledCharacters = Math.floor(frame / settleDelay)

      const nextText = text
        .split('')
        .map((character, index) => {
          if (character === ' ') return ' '

          if (index < settledCharacters) {
            return character
          }

          if (index === settledCharacters) {
            return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
          }

          return ''
        })
        .join('')

      setDisplayText(nextText)
      frame += speed

      if (frame > totalFrames) {
        setDisplayText(text)
        window.clearInterval(interval)
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [text, speed, settleDelay])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  )
}