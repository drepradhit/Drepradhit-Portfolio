import { useEffect, useState } from 'react'

export default function RotatingRoles({ className = '' }) {
  const roles = ['UI/UX Designer', 'Web Developer', 'Front End Developer']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // cycle every 4.5s, with 600ms fade transition
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
        className={`inline-block transition-all duration-700 ease-in-out transform ${visible ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-4 blur-sm'}`}
      >
        {roles[index]}
      </span>
    </div>
  )
}

