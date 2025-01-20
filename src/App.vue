<template>
  <div class="container-fluid">
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
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="workflow-container">
          <VueFlow v-model="elements" class="workflow" :default-viewport="{ zoom: 1.5 }">
            <Background pattern-color="#aaa" gap="8" />
            <MiniMap />
            <Controls />
          </VueFlow>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow, Background, MiniMap, Controls } from '@vue-flow/core'
import { useStore } from './stores/workflow'

const store = useStore()
const elements = ref([])

const addNode = (type) => {
  const newNode = store.createNode(type)
  elements.value = [...elements.value, newNode]
}

onMounted(() => {
  // Initialize with a start node
  const startNode = store.createNode('start')
  elements.value = [startNode]
})
</script>

<script>
export default {
  name: 'App'
}
</script>

<style>
.workflow-container {
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.workflow {
  height: 100%;
}
</style>