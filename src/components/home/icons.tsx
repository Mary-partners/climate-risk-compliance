import React from 'react'

type IconName =
  | 'bank'
  | 'building'
  | 'briefcase'
  | 'users'
  | 'trending'
  | 'shield'
  | 'compass'
  | 'alert'
  | 'chart'
  | 'database'
  | 'tag'
  | 'leaf'
  | 'sun'
  | 'tree'
  | 'coins'
  | 'check'
  | 'arrow'
  | 'document'
  | 'scale'
  | 'globe'
  | 'clipboard'
  | 'target'

const paths: Record<IconName, React.ReactNode> = {
  bank: <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 10h16M5 10V6l7-3 7 3v4M7 10v8m5-8v8m5-8v8" />,
  building: <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M4 21h14M9 7h2m-2 4h2m-2 4h2m5-8h2a2 2 0 012 2v10h-4" />,
  briefcase: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V5H9v2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-4-4h-1m-4 5H2v-1a4 4 0 014-4h4a4 4 0 014 4v1zm-4-9a3 3 0 100-6 3 3 0 000 6zm8-1a2.5 2.5 0 100-5" />,
  trending: <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9.5 12l1.8 1.8L15 10" />,
  compass: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm3.5-12.5l-2 5-5 2 2-5 5-2z" />,
  alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.9l-8 13.8A2 2 0 004 21h16a2 2 0 001.7-3.3l-8-13.8a2 2 0 00-3.4 0z" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M8 17V9m5 8V5m5 12v-6" />,
  database: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />,
  tag: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v5.6a2 2 0 00.6 1.4l7.4 7.4a2 2 0 002.8 0l5.6-5.6a2 2 0 000-2.8L12 5.6A2 2 0 0010.6 5H5a2 2 0 00-2 2zm4 1h.01" />,
  leaf: <path strokeLinecap="round" strokeLinejoin="round" d="M5 21c0-9 5-14 15-15 0 9-4 15-13 15m-2 0c1.5-4 4-6.5 8-8" />,
  sun: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7l1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2l-1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z" />,
  tree: <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-6m0 0l-3-2m3 2l3-2M12 16a5 5 0 003-9 4 4 0 00-6-2 4 4 0 00-2 7 5 5 0 005 4z" />,
  coins: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.5c0 1.4-2.7 2.5-6 2.5S3 10.9 3 9.5 5.7 7 9 7s6 1.1 6 2.5zM3 9.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5m0-5v5M21 12v5c0 1.4-2.7 2.5-6 2.5-1.3 0-2.5-.2-3.5-.5" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  arrow: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />,
  document: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2zM13 3v5h5" />,
  scale: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-7-3h14M6 6l-3 6a3 3 0 006 0L6 6zm12 0l-3 6a3 3 0 006 0l-3-6zM6 6l6-1 6 1" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.3 4-5.5 4-9s-1.5-6.7-4-9c-2.5 2.3-4 5.5-4 9s1.5 6.7 4 9zM3.5 9h17M3.5 15h17" />,
  clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
  target: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z" />,
}

interface IconProps {
  name: IconName
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
)

export default Icon
export type { IconName }
