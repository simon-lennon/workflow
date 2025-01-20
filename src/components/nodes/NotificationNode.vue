<template>
  <BaseTaskNode
    :id="id"
    type="notification"
    :selected="selected"
    :icon="notificationIcon"
  >
    <div class="notification-info">
      <div class="info-row">
        <span class="info-label">Type:</span>
        <select 
          v-model="nodeData.notificationType" 
          class="info-select"
          @change="updateNode"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push</option>
          <option value="slack">Slack</option>
        </select>
      </div>
      <div class="info-row">
        <span class="info-label">Recipients:</span>
        <input 
          v-model="nodeData.recipients" 
          class="info-input"
          placeholder="Enter recipients"
          @change="updateNode"
        />
      </div>
      <div class="info-row">
        <span class="info-label">Template:</span>
        <select 
          v-model="nodeData.template" 
          class="info-select"
          @change="updateNode"
        >
          <option value="approval">Approval Required</option>
          <option value="reminder">Reminder</option>
          <option value="completion">Task Completed</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  </BaseTaskNode>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTaskNode from './BaseTaskNode.vue'
import { useWorkflowStore } from '@/stores/workflow'

const props = defineProps({
  id: { type: String, required: true },
  selected: { type: Boolean, default: false }
})

const store = useWorkflowStore()
const nodeData = ref({
  notificationType: 'email',
  recipients: '',
  template: 'approval'
})

const notificationIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#9C27B0" stroke-width="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
.notification-info {
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
  border-color: #9C27B0;
}

.info-select {
  background-color: white;
}
</style>