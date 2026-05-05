import { ref, onMounted, onUnmounted } from 'vue'

export function useTypingEffect(text: string, speed = 50, startDelay = 1200) {
  const displayText = ref('')
  const isComplete = ref(false)
  let timeout: ReturnType<typeof setTimeout> | null = null
  let charIndex = 0

  const type = () => {
    if (charIndex < text.length) {
      displayText.value += text[charIndex]
      charIndex++
      timeout = setTimeout(type, speed)
    } else {
      isComplete.value = true
    }
  }

  onMounted(() => {
    timeout = setTimeout(type, startDelay)
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { displayText, isComplete }
}
