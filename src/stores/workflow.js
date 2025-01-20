import { defineStore } from 'pinia'

export const useStore = defineStore('workflow', {
  state: () => ({
    nodeCount: 0,
    nodes: new Map(),
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

      let node
      switch (type) {
        case 'start':
          node = {
            ...baseNode,
            type: 'default',
            class: 'node-start',
            data: { label: 'Start' },
          }
          break
        case 'task':
          node = {
            ...baseNode,
            type: 'default',
            class: 'node-task',
            data: { label: `Task ${this.nodeCount}` },
          }
          break
        case 'condition':
          node = {
            ...baseNode,
            type: 'default',
            class: 'node-condition',
            data: { label: `Condition ${this.nodeCount}` },
          }
          break
        case 'approval':
          node = {
            ...baseNode,
            type: 'approval',
            data: {
              label: `Approval ${this.nodeCount}`,
              approver: '',
              level: '1'
            },
          }
          break
        default:
          node = baseNode
      }

      this.nodes.set(node.id, node)
      return node
    },

    getNode(id) {
      return this.nodes.get(id)
    },

    updateNode(id, data) {
      const node = this.nodes.get(id)
      if (node) {
        node.data = { ...node.data, ...data }
        this.nodes.set(id, node)
      }
    },

    updateNodePosition(id, position) {
      const node = this.nodes.get(id)
      if (node) {
        node.position = position
        this.nodes.set(id, node)
      }
    }
  },
})