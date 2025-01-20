<template>
  <div class="container-fluid h-100" @click="closeContextMenu">
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
            @click="closeContextMenu"
          >
            <template #edge-default="{ id, sourceX, sourceY, targetX, targetY }" @mouseup.right.prevent="onEdgeContextMenu">
              <path
                :id="id"
                :d="generatePath(sourceX, sourceY, targetX, targetY)"
                class="vue-flow__edge-path"
                @contextmenu.prevent="(e) => onEdgeContextMenu(e, { id })"
              />
            </template>
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
          <EdgeContextMenu
            v-if="contextMenu.visible"
            :visible="contextMenu.visible"
            :position="contextMenu.position"
            @delete="deleteSelectedEdge"
            @click.stop
          />
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
import EdgeContextMenu from './components/EdgeContextMenu.vue'
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

const generatePath = (sourceX, sourceY, targetX, targetY) => {
  const midX = sourceX + (targetX - sourceX) / 2
  return `M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`
}

const onEdgeContextMenu = (event, edge) => {
  event.preventDefault()
  event.stopPropagation()
  contextMenu.value = {
    visible: true,
    position: {
      x: event.clientX,
      y: event.clientY
    },
    edge: edge
  }
}

const deleteSelectedEdge = () => {
  if (contextMenu.value.edge) {
    store.removeEdge(contextMenu.value.edge.id)
    edges.value = [...edges.value]
    contextMenu.value.visible = false
  }
}

const closeContextMenu = (event) => {
  // Don't close if clicking the menu itself
  if (event?.target?.closest('.edge-context-menu')) {
    return
  }
  contextMenu.value.visible = false
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
.vue-flow__edge-path {
  stroke: #888;
  stroke-width: 2;
  cursor: pointer;
}

.vue-flow__edge-path:hover {
  stroke: #2196F3;
  stroke-width: 3;
}

.vue-flow__edge.animated {
  stroke-dasharray: 5;
  animation: dashdraw 0.5s linear infinite;
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
</style>