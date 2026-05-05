import { onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const triggers: ScrollTrigger[] = []

  const animateOnScroll = (
    selector: string,
    options: {
      y?: number
      x?: number
      opacity?: number
      duration?: number
      stagger?: number
      delay?: number
      ease?: string
      scale?: number
    } = {}
  ) => {
    const {
      y = 30,
      x = 0,
      opacity = 0,
      duration = 0.9,
      stagger = 0.06,
      delay = 0,
      ease = 'power2.out',
      scale = 1,
    } = options

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.set(selector, { y, x, opacity, scale })

    const tween = gsap.to(selector, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    })

    // Track the ScrollTrigger instance for cleanup
    const st = tween.scrollTrigger
    if (st) triggers.push(st)
  }

  onUnmounted(() => {
    triggers.forEach(trigger => trigger.kill())
  })

  return { animateOnScroll, gsap, ScrollTrigger }
}
