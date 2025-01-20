<template>
  <BaseTaskNode
    :id="id"
    type="docCollection"
    :selected="selected"
    :icon="docIcon"
  >
    <div class="doc-info">
      <div class="info-row">
        <span class="info-label">Required Docs:</span>
        <select 
          v-model="nodeData.docType" 
          class="info-select"
          @change="updateNode"
        >
          <option value="id">ID Documents</option>
          <option value="financial">Financial Documents</option>
          <option value="medical">Medical Records</option>
          <option value="legal">Legal Documents</option>
          <option value="custom">Custom</option>
        </select>
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
      <div class="info-row">
        <span class="info-label">Required:</span>
        <div class="checkbox-wrapper">
          <input 
            type="checkbox"
            v-model="nodeData.required"
            @change="updateNode"
          />
          <label>Mandatory</label>
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
  docType: 'id',
  dueDate: '',
  required: true
})

const docIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2196F3" stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
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
.doc-info {
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

.info-input:focus, .info-select:focus {
  outline: none;
  border-color: #2196F3;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.checkbox-wrapper label {
  font-size: 0.9em;
  color: #666;
}
</style>