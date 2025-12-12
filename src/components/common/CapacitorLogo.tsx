interface CapacitorLogoProps {
  className?: string
  size?: number
}

export function CapacitorLogo({ className = '', size = 24 }: CapacitorLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Capacitor Logo"
    >
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm115.4 302.7l-36.7-36.7c-5.7-5.7-5.7-14.9 0-20.6l79.4-79.4c5.7-5.7 14.9-5.7 20.6 0l36.7 36.7c5.7 5.7 5.7 14.9 0 20.6l-79.4 79.4c-5.7 5.7-14.9 5.7-20.6 0zM140.6 161.3l36.7 36.7c5.7 5.7 5.7 14.9 0 20.6l-79.4 79.4c-5.7 5.7-14.9 5.7-20.6 0l-36.7-36.7c-5.7-5.7-5.7-14.9 0-20.6l79.4-79.4c5.7-5.7 14.9-5.7 20.6 0z"
        fill="currentColor"
      />
      <path
        d="M350.7 161.3l-79.4 79.4c-5.7 5.7-14.9 5.7-20.6 0l-79.4-79.4c-5.7-5.7-5.7-14.9 0-20.6l79.4-79.4c5.7-5.7 14.9-5.7 20.6 0l79.4 79.4c5.7 5.7 5.7 14.9 0 20.6zM161.3 350.7l79.4-79.4c5.7-5.7 14.9-5.7 20.6 0l79.4 79.4c5.7 5.7 5.7 14.9 0 20.6l-79.4 79.4c-5.7-5.7-14.9-5.7-20.6 0l-79.4-79.4c-5.7-5.7-5.7-14.9 0-20.6z"
        fill="currentColor"
      />
    </svg>
  )
}
