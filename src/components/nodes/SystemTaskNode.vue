<template>
  <BaseTaskNode
    :id="id"
    type="systemTask"
    :selected="selected"
    :icon="systemIcon"
  >
    <div class="system-info">
      <div class="info-row">
        <span class="info-label">Task Type:</span>
        <select 
          v-model="nodeData.taskType" 
          class="info-select"
          @change="updateNode"
        >
          <option value="api">API Call</option>
          <option value="database">Database Operation</option>
          <option value="script">Script Execution</option>
          <option value="service">Service Integration</option>
        </select>
      </div>
      <div class="info-row">
        <span class="info-label">Endpoint/Path:</span>
        <input 
          v-model="nodeData.endpoint" 
          class="info-input"
          placeholder="Enter endpoint"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Retry:</span>
        <div class="retry-config">
          <input 
            type="number"
            v-model="nodeData.retryCount"
            class="info-input-small"
            min="0"
            max="5"
            @change="updateNode"
          />
          <span class="info-unit">times</span>
        </div>
      </div>
      <div class="info-row">
        <span class="info-label">Timeout:</span>
        <div class="timeout-config">
          <input 
            type="number"
            v-model="nodeData.timeout"
            class="info-input-small"
            min="0"
            @change="updateNode"
          />
          <span class="info-unit">sec</span>
        </div>
      </div>
    </div>
  </BaseTaskNode>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTaskNode from './BaseTaskNode.vue'
import { useStore } from '../../stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useStore()
const nodeData = ref({
  taskType: 'api',
  endpoint: '',
  retryCount: 3,
  timeout: 30
})

const systemIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#607D8B" stroke-width="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6" y2="6" />
    <line x1="10" y1="6" x2="10" y2="6" />
    <line x1="6" y1="18" x2="6" y2="18" />
    <line x1="10" y1="18" x2="10" y2="18" />
  </svg>
`

const updateNode = () => {
  store.updateNode(props.id, nodeData.value)
}

onMounted(() => {
  const node = store.getNode(props.id)
  if (node) {
    nodeData.value = { ...node.data }
  }
})
</script>

<style scoped>
.system-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-label {
  font-size: 0.9em;
  color: #666;
}

.info-input, .info-select {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  width: 140px;
  font-size: 0.9em;
}

.info-input-small {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  width: 60px;
  font-size: 0.9em;
}

.info-input:focus, .info-select:focus, .info-input-small:focus {
  outline: none;
  border-color: #607D8B;
}

.retry-config, .timeout-config {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-unit {
  font-size: 0.9em;
  color: #666;
}
</style>