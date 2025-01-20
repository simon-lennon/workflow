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
        type: 'default',
        position,
        class: `node-${type}`,
        draggable: true,
        connectable: true,
        selectable: true,
      }

      switch (type) {
        case 'start':
          return {
            ...baseNode,
            data: { label: 'Start' },
          }
        case 'task':
          return {
            ...baseNode,
            data: { label: `Task ${this.nodeCount}` },
          }
        case 'condition':
          return {
            ...baseNode,
            data: { label: `Condition ${this.nodeCount}` },
          }
        default:
          return baseNode
      }
    },
  },
})