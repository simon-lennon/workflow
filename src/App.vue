<template>
  <div class="container-fluid h-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Workflow Builder</a>
        <div class="navbar-text text-light">
          <small>Double-click on connections to delete them</small>
        </div>
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
            @edge-double-click="onEdgeDoubleClick"
            @edge-click="onEdgeClick"
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
          
          <!-- Delete confirmation tooltip -->
          <div v-if="selectedEdge" class="edge-tooltip" :style="tooltipStyle">
            Double-click to delete connection
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
const selectedEdge = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })

const tooltipStyle = computed(() => ({
  left: `${tooltipPosition.value.x}px`,
  top: `${tooltipPosition.value.y}px`
}))

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

const onEdgeClick = (event, edge) => {
  selectedEdge.value = edge
  tooltipPosition.value = {
    x: event.clientX + 10,
    y: event.clientY - 30
  }

  // Hide tooltip after 2 seconds
  setTimeout(() => {
    if (selectedEdge.value === edge) {
      selectedEdge.value = null
    }
  }, 2000)
}

const onEdgeDoubleClick = (event, edge) => {
  store.removeEdge(edge.id)
  edges.value = [...edges.value]
  selectedEdge.value = null
}

const onResetView = () => {
  fitView({ padding: 0.2 })
}

onMounted(() => {
  // Initialize with a start node
  const startNode = store.createNode('start')
  elements.value = [startNode]
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

/* Edge Tooltip */
.edge-tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar-text {
  font-size: 0.9em;
  opacity: 0.8;
}
</style>