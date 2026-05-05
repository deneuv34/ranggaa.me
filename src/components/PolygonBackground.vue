<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const canvasRef = ref<HTMLCanvasElement>()
let animationId: number
let mouse = { x: -1000, y: -1000 }
let points: { x: number; y: number; originX: number; originY: number }[] = []
let width = 0
let height = 0

const GRID_SIZE = 80
const INFLUENCE_RADIUS = 200
const DISPLACEMENT = 30

function initPoints() {
  points = []
  width = window.innerWidth
  height = window.innerHeight

  const cols = Math.ceil(width / GRID_SIZE) + 2
  const rows = Math.ceil(height / GRID_SIZE) + 2

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * GRID_SIZE
      const y = row * GRID_SIZE
      points.push({ x, y, originX: x, originY: y })
    }
  }
}

function getNeighbors(index: number, cols: number): number[] {
  const row = Math.floor(index / cols)
  const col = index % cols
  const neighbors: number[] = []

  // Right
  if (col < cols - 1) neighbors.push(index + 1)
  // Bottom
  if (row < Math.ceil(height / GRID_SIZE) + 1) neighbors.push(index + cols)
  // Bottom-right diagonal
  if (col < cols - 1 && row < Math.ceil(height / GRID_SIZE) + 1) neighbors.push(index + cols + 1)

  return neighbors
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  const cols = Math.ceil(width / GRID_SIZE) + 2

  // Update point positions based on mouse
  for (const point of points) {
    const dx = mouse.x - point.originX
    const dy = mouse.y - point.originY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < INFLUENCE_RADIUS) {
      const force = (1 - dist / INFLUENCE_RADIUS) * DISPLACEMENT
      const angle = Math.atan2(dy, dx)
      point.x = point.originX - Math.cos(angle) * force
      point.y = point.originY - Math.sin(angle) * force
    } else {
      // Ease back to origin
      point.x += (point.originX - point.x) * 0.08
      point.y += (point.originY - point.y) * 0.08
    }
  }

  // Draw polygon connections
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim() || '#2a2a2a'
  ctx.lineWidth = 0.5

  for (let i = 0; i < points.length; i++) {
    const neighbors = getNeighbors(i, cols)
    for (const ni of neighbors) {
      if (ni >= points.length) continue
      const p1 = points[i]
      const p2 = points[ni]

      // Opacity based on distance to mouse
      const midX = (p1.x + p2.x) / 2
      const midY = (p1.y + p2.y) / 2
      const distToMouse = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2)
      const opacity = distToMouse < INFLUENCE_RADIUS * 1.5
        ? 0.15 + (1 - distToMouse / (INFLUENCE_RADIUS * 1.5)) * 0.4
        : 0.08

      ctx.globalAlpha = opacity
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    }
  }

  // Draw points
  for (const point of points) {
    const distToMouse = Math.sqrt((mouse.x - point.x) ** 2 + (mouse.y - point.y) ** 2)
    const opacity = distToMouse < INFLUENCE_RADIUS
      ? 0.3 + (1 - distToMouse / INFLUENCE_RADIUS) * 0.5
      : 0.12
    const size = distToMouse < INFLUENCE_RADIUS
      ? 1.5 + (1 - distToMouse / INFLUENCE_RADIUS) * 1.5
      : 1

    ctx.globalAlpha = opacity
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text-muted').trim() || '#666666'
    ctx.beginPath()
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
  animationId = requestAnimationFrame(draw)
}

function handleMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function handleMouseLeave() {
  mouse.x = -1000
  mouse.y = -1000
}

function handleResize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initPoints()
}

onMounted(() => {
  handleResize()
  draw()
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="polygon-bg" />
</template>
