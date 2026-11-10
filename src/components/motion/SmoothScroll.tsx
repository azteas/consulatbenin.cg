import Lenis from 'lenis'
import { useEffect } from 'react'

// Défilement inertiel. Désactivé si l'utilisateur préfère moins d'animations.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, autoRaf: true })
    return () => lenis.destroy()
  }, [])
  return null
}
