import { defineStore } from 'pinia'

export const useStore = defineStore('workflow', {
  state: () => ({
    nodeCount: 0,
    nodes: new Map(),
    edges: new Map()
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
        handles: {
          source: true,
          target: true
        }
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
        case 'review':
          node = {
            ...baseNode,
            type: 'review',
            data: {
              label: `Review ${this.nodeCount}`,
              reviewer: '',
              dueDate: '',
              status: 'pending',
              comments: ''
            },
          }
          break
        case 'todo':
          node = {
            ...baseNode,
            type: 'todo',
            data: {
              label: `Todo ${this.nodeCount}`,
              assignee: '',
              priority: 'medium',
              dueDate: ''
            },
          }
          break
        case 'notification':
          node = {
            ...baseNode,
            type: 'notification',
            data: {
              label: `Notification ${this.nodeCount}`,
              recipients: [],
              message: ''
            },
          }
          break
        case 'docCollection':
          node = {
            ...baseNode,
            type: 'docCollection',
            data: {
              label: `Document Collection ${this.nodeCount}`,
              documents: [],
              requiredDocs: []
            },
          }
          break
        case 'systemTask':
          node = {
            ...baseNode,
            type: 'systemTask',
            data: {
              label: `System Task ${this.nodeCount}`,
              action: '',
              parameters: {}
            },
          }
          break
        case 'taskCollection':
          node = {
            ...baseNode,
            type: 'taskCollection',
            data: {
              label: `Task Collection ${this.nodeCount}`,
              tasks: [],
              owner: '',
              dueDate: ''
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
    },

    addEdge(edge) {
      const id = `e${edge.source}-${edge.target}`
      const newEdge = {
        ...edge,
        id,
        animated: true,
        type: 'smoothstep'
      }
      this.edges.set(id, newEdge)
      return newEdge
    },

    removeEdge(id) {
      this.edges.delete(id)
    },

    getEdges() {
      return Array.from(this.edges.values())
    }
  },
})