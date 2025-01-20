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
        draggable: true,
        connectable: true,
        selectable: true,
      }

      switch (type) {
        case 'start':
          return {
            ...baseNode,
            type: 'default',
            class: 'node-start',
            data: { label: 'Start' },
          }
        case 'task':
          return {
            ...baseNode,
            type: 'default',
            class: 'node-task',
            data: { label: `Task ${this.nodeCount}` },
          }
        case 'condition':
          return {
            ...baseNode,
            type: 'default',
            class: 'node-condition',
            data: { label: `Condition ${this.nodeCount}` },
          }
        case 'approval':
          return {
            ...baseNode,
            type: 'approval',
            data: {
              label: `Approval ${this.nodeCount}`,
              approver: '',
              level: '1'
            },
          }
        default:
          return baseNode
      }
    },
  },
})