<template>
  <div class="task-node" :class="[`task-node-${type}`, { selected }]">
    <div class="task-header">
      <span class="task-icon" v-html="icon"></span>
      <input 
        v-model="nodeData.label" 
        class="header-input"
        @change="updateNode"
        :placeholder="`Enter ${type} name`"
      />
    </div>
    <div class="task-body">
      <slot></slot>
    </div>
    <div class="task-handles">
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Handle } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import { useWorkflowStore } from '@/stores/workflow';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const store = useWorkflowStore();
const nodeData = ref({
  label: '',
  type: props.type
});

const updateNode = () => {
  store.updateNode(props.id, nodeData.value);
};

onMounted(() => {
  const node = store.getNode(props.id);
  if (node) {
    nodeData.value = { ...node.data };
  }
});
</script>

<style scoped>
.task-node {
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  min-width: 200px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.task-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
}

.header-input {
  border: none;
  font-weight: 500;
  width: 100%;
  background: transparent;
  padding: 4px;
}

.header-input:focus {
  outline: none;
  background: #f8f9fa;
  border-radius: 4px;
}

.task-node.selected {
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
}

/* Node type specific styles */
.task-node-approval {
  border-color: #4CAF50;
}

.task-node-review {
  border-color: #FF9800;
}

.task-node-todo {
  border-color: #F44336;
}

.task-node-notification {
  border-color: #9C27B0;
}

.task-node-docCollection {
  border-color: #2196F3;
}

.task-node-systemTask {
  border-color: #607D8B;
}

.task-node-taskCollection {
  border-color: #795548;
}
</style>