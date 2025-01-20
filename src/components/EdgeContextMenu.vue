<template>
  <div 
    v-if="visible" 
    class="edge-context-menu"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <div class="menu-item" @click="onDelete">
      <span class="menu-icon">🗑️</span>
      Delete Connection
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  }
})

const emit = defineEmits(['delete'])

const onDelete = () => {
  emit('delete')
}
</script>

<style scoped>
.edge-context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 4px;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  color: #dc3545;
  gap: 8px;
  font-size: 0.9em;
  border-radius: 4px;
}

.menu-item:hover {
  background: #fff5f5;
}

.menu-icon {
  font-size: 1.1em;
}
</style>