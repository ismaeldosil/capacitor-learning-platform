import {
  Rocket,
  Plug,
  Hammer,
  Store,
  Layers,
  Sprout,
  Crown,
  Target,
  Zap,
  Award,
  Flame,
  GraduationCap,
  Brain,
  Gamepad2,
  type LucideIcon,
} from 'lucide-react'

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  // Modules
  rocket: Rocket,
  plug: Plug,
  hammer: Hammer,
  store: Store,
  layers: Layers,
  // Levels
  sprout: Sprout,
  crown: Crown,
  // Badges
  target: Target,
  zap: Zap,
  award: Award,
  flame: Flame,
  'graduation-cap': GraduationCap,
  brain: Brain,
  gamepad: Gamepad2,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = '', size }: IconProps) {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    // Fallback for unknown icons
    return <span className={className}>{name}</span>
  }

  return <IconComponent className={className} size={size} />
}

// Export icon names for type safety
export type IconName = keyof typeof iconMap
