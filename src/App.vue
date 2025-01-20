<template>
  <div class="container-fluid h-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Workflow Builder</a>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">Tasks</div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <button class="btn btn-success" @click="addNode('approval')">
                <span class="task-icon">✓</span> Approval
              </button>
              <button class="btn btn-warning" @click="addNode('review')">
                <span class="task-icon">👁</span> Review
              </button>
              <button class="btn btn-danger" @click="addNode('todo')">
                <span class="task-icon">📋</span> To Do
              </button>
              <button class="btn btn-purple" @click="addNode('notification')">
                <span class="task-icon">🔔</span> Notification
              </button>
              <button class="btn btn-info" @click="addNode('docCollection')">
                <span class="task-icon">📄</span> Doc Collection
              </button>
              <button class="btn btn-secondary" @click="addNode('systemTask')">
                <span class="task-icon">⚙️</span> System Task
              </button>
              <button class="btn btn-brown" @click="addNode('taskCollection')">
                <span class="task-icon">📑</span> Task Collection
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="workflow-container">
          <VueFlow
            v-model="elements"
            :nodes="elements"
            :edges="edges"
            :default-zoom="1.5"
            :min-zoom="0.2"
            :max-zoom="4"
            class="workflow"
            :default-viewport="{ x: 0, y: 0, zoom: 1.5 }"
            @connect="onConnect"
            @node-drag-stop="onNodeDragStop"
            @edge-mousedown="onEdgeMouseDown"
            @pane-click="closeContextMenu"
          >
            <Background v-slot="background" pattern-color="#aaa" gap="8" />
            <MiniMap />
            <Controls />
            <Panel position="top-right">
              <button class="btn btn-primary btn-sm" @click="onResetView">
                Reset View
              </button>
            </Panel>
          </VueFlow>
          
          <!-- Edge context menu overlay -->
          <div 
            v-if="contextMenu.visible" 
            class="edge-context-menu"
            :style="{ left: contextMenu.position.x + 'px', top: contextMenu.position.y + 'px' }"
          >
            <div class="menu-actions">
              <button class="menu-button delete" @click="deleteSelectedEdge">
                <span class="menu-icon">🗑️</span>
                Delete Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useStore } from './stores/workflow'
import {
  ApprovalNode,
  ReviewNode,
  TodoNode,
  NotificationNode,
  DocCollectionNode,
  SystemTaskNode,
  TaskCollectionNode
} from './components/nodes'

const store = useStore()
const elements = ref([])
const edges = computed(() => store.getEdges())
const contextMenu = ref({ visible: false, position: { x: 0, y: 0 }, edge: null })

const { onPaneReady, fitView } = useVueFlow({
  nodeTypes: {
    approval: ApprovalNode,
    review: ReviewNode,
    todo: TodoNode,
    notification: NotificationNode,
    docCollection: DocCollectionNode,
    systemTask: SystemTaskNode,
    taskCollection: TaskCollectionNode
  },
})

const addNode = (type) => {
  const newNode = store.createNode(type)
  elements.value = [...elements.value, newNode]
}

const onConnect = (params) => {
  const newEdge = store.addEdge(params)
  edges.value = [...edges.value]
}

const onNodeDragStop = (event, node) => {
  store.updateNodePosition(node.id, node.position)
}

const onEdgeMouseDown = (event, edge) => {
  // Only show context menu on right click
  if (event.button === 2) {
    event.preventDefault()
    event.stopPropagation()
    contextMenu.value = {
      visible: true,
      position: { x: event.clientX, y: event.clientY },
      edge: edge
    }
  }
}

const deleteSelectedEdge = () => {
  if (contextMenu.value.edge) {
    store.removeEdge(contextMenu.value.edge.id)
    edges.value = [...edges.value]
    contextMenu.value.visible = false
  }
}

const closeContextMenu = () => {
  contextMenu.value.visible = false
}

const onResetView = () => {
  fitView({ padding: 0.2 })
}

onMounted(() => {
  // Initialize with a start node
  const startNode = store.createNode('start')
  elements.value = [startNode]

  // Close context menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.edge-context-menu')) {
      contextMenu.value.visible = false
    }
  })

  // Prevent default context menu
  document.querySelector('.workflow-container').addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
})

onPaneReady(({ fitView }) => {
  fitView()
})
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.workflow-container {
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f9fa;
  position: relative;
}

.workflow {
  height: 100%;
}

.task-icon {
  margin-right: 8px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px;
}

.btn-purple {
  background-color: #9c27b0;
  color: white;
}

.btn-purple:hover {
  background-color: #7b1fa2;
  color: white;
}

.btn-brown {
  background-color: #795548;
  color: white;
}

.btn-brown:hover {
  background-color: #5d4037;
  color: white;
}

/* Vue Flow customization */
.vue-flow__edge {
  stroke: #888;
  stroke-width: 2;
  cursor: pointer;
}

.vue-flow__edge.selected {
  stroke: #2196F3;
}

.vue-flow__edge.animated {
  stroke-dasharray: 5;
  animation: dashdraw 0.5s linear infinite;
}

.vue-flow__edge:hover {
  stroke: #2196F3;
  stroke-width: 3;
}

@keyframes dashdraw {
  from {
    stroke-dashoffset: 10;
  }
}

.vue-flow__handle {
  width: 8px;
  height: 8px;
  background-color: #555;
  border: 2px solid white;
}

.vue-flow__handle:hover {
  background-color: #2196F3;
}

/* Context Menu */
.edge-context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  min-width: 160px;
}

.menu-actions {
  padding: 4px;
}

.menu-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9em;
  gap: 8px;
  border-radius: 4px;
  text-align: left;
}

.menu-button.delete {
  color: #dc3545;
}

.menu-button.delete:hover {
  background-color: #fff5f5;
}

.menu-icon {
  font-size: 1.1em;
}
</style>