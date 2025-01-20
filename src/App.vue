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
          <div class="card-header">Tools</div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="addNode('task')">Add Task</button>
              <button class="btn btn-secondary" @click="addNode('condition')">Add Condition</button>
              <button class="btn btn-purple" @click="addNode('approval')">Add Approval</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="workflow-container">
          <VueFlow
            v-model="elements"
            :default-zoom="1.5"
            :min-zoom="0.2"
            :max-zoom="4"
            class="workflow"
            :default-viewport="{ x: 0, y: 0, zoom: 1.5 }"
            :nodes="elements"
            :edges="[]"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useStore } from './stores/workflow'
import ApprovalNode from './components/ApprovalNode.vue'

const store = useStore()
const elements = ref([])
const { onPaneReady, fitView } = useVueFlow({
  nodeTypes: {
    approval: ApprovalNode,
  },
})

const addNode = (type) => {
  const newNode = store.createNode(type)
  elements.value = [...elements.value, newNode]
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
}

.workflow {
  height: 100%;
}

.vue-flow__node {
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  min-width: 150px;
}

.vue-flow__node.node-task {
  background-color: #2196F3;
  color: white;
}

.vue-flow__node.node-condition {
  background-color: #FFC107;
  color: black;
}

.vue-flow__node.node-start {
  background-color: #4CAF50;
  color: white;
}

.btn-purple {
  background-color: #9c27b0;
  color: white;
}

.btn-purple:hover {
  background-color: #7b1fa2;
  color: white;
}
</style>