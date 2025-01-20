<template>
  <BaseTaskNode
    :id="id"
    type="taskCollection"
    :selected="selected"
    :icon="taskCollectionIcon"
  >
    <div class="task-collection-info">
      <div class="info-row">
        <span class="info-label">Tasks:</span>
        <div class="tasks-list">
          <div v-for="(task, index) in nodeData.tasks" :key="index" class="task-item">
            <input 
              v-model="task.name"
              class="task-input"
              placeholder="Enter task name"
              @change="updateNode"
            />
            <button class="remove-task" @click="removeTask(index)">×</button>
          </div>
        </div>
        <button class="add-task" @click="addTask">+ Add Task</button>
      </div>
      <div class="info-row">
        <span class="info-label">Owner:</span>
        <input 
          v-model="nodeData.owner" 
          class="info-input"
          placeholder="Enter owner"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Due Date:</span>
        <input 
          type="date"
          v-model="nodeData.dueDate"
          class="info-input"
          @change="updateNode"
        />
      </div>
    </div>
  </BaseTaskNode>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTaskNode from './BaseTaskNode.vue'
import { useWorkflowStore } from '../../stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useStore()
const nodeData = ref({
  tasks: [],
  owner: '',
  dueDate: ''
})

const taskCollectionIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#795548" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="16" x2="16" y2="16" />
  </svg>
`

const addTask = () => {
  nodeData.value.tasks.push({ name: '' })
  updateNode()
}

const removeTask = (index) => {
  nodeData.value.tasks.splice(index, 1)
  updateNode()
}

const updateNode = () => {
  store.updateNode(props.id, nodeData.value)
}

onMounted(() => {
  const node = store.getNode(props.id)
  if (node) {
    nodeData.value = { ...node.data }
    if (!nodeData.value.tasks) {
      nodeData.value.tasks = []
    }
  }
})
</script>

<style scoped>
.task-collection-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 0.9em;
  color: #666;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 4px 0;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.task-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.9em;
}

.remove-task {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 4px;
}

.add-task {
  background: none;
  border: 1px dashed #795548;
  color: #795548;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  width: 100%;
  margin-top: 4px;
}

.add-task:hover {
  background: rgba(121, 85, 72, 0.1);
}

.info-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
  font-size: 0.9em;
}

.info-input:focus, .task-input:focus {
  outline: none;
  border-color: #795548;
}
</style>