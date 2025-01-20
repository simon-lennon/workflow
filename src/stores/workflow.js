import { defineStore } from 'pinia'

export const useStore = defineStore('workflow', {
  state: () => ({
    nodeCount: 0,
  }),

  actions: {
    createNode(type) {
      this.nodeCount++
      const position = { x: 100, y: 100 + (this.nodeCount * 100) }
      
      const baseNode = {
        id: `${type}-${this.nodeCount}`,
        position,
        type: 'default',
        class: `node-${type}`,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${this.nodeCount}` },
      }

      switch (type) {
        case 'start':
          return {
            ...baseNode,
            data: { label: 'Start' },
            style: { background: '#4CAF50', color: 'white' },
          }
        case 'task':
          return {
            ...baseNode,
            style: { background: '#2196F3', color: 'white' },
          }
        case 'condition':
          return {
            ...baseNode,
            style: { background: '#FFC107' },
          }
        default:
          return baseNode
      }
    },
  },
})