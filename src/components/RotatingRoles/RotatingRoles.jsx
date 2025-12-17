import { useEffect, useState } from 'react'

export default function RotatingRoles({ className = '' }) {
  const roles = ['UI/UX Designer', 'Web Developer', 'Front End Developer']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, 600)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={className + " inline-block"} aria-live="polite">
      <span
        className={`inline-block transition-all duration-500 ease-in-out transform ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'}`}
      >
        {roles[index]}
      </span>
    </div>
  )
}
