<template>
  <div class="approval-node">
    <div class="approval-header">
      <span class="approval-icon">✓</span>
      {{ data.label }}
    </div>
    <div class="approval-body">
      <div class="approval-info">
        <div class="info-row">
          <span class="info-label">Approver:</span>
          <span class="info-value">{{ data.approver || 'Not Set' }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Level:</span>
          <span class="info-value">{{ data.level || '1' }}</span>
        </div>
      </div>
    </div>
    <div class="approval-handles">
      <Handle type="target" position="top" :style="{ top: '0px' }" />
      <Handle type="source" position="bottom" :style="{ bottom: '0px' }" />
    </div>
  </div>
</template>

<script setup>
import { Handle } from '@vue-flow/core'

defineProps({
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
.approval-node {
  background: #fff;
  border: 2px solid #9c27b0;
  border-radius: 8px;
  padding: 10px;
  min-width: 200px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.approval-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #9c27b0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.approval-icon {
  background: #9c27b0;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
}

.approval-body {
  font-size: 0.9em;
}

.approval-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  color: #666;
}

.info-value {
  font-weight: 500;
}

.approval-node.selected {
  border-color: #7b1fa2;
  box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.3);
}
</style>