import { onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
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
      y = 60,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      ease = 'power3.out',
      scale = 1,
    } = options

    gsap.fromTo(
      selector,
      { y, x, opacity, scale },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  return { animateOnScroll, gsap, ScrollTrigger }
}
