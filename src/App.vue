<template>
  <!-- ... rest of the template remains the same ... -->
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useWorkflowStore } from '@/stores/workflow'
import {
  ApprovalNode,
  ReviewNode,
  TodoNode,
  NotificationNode,
  DocCollectionNode,
  SystemTaskNode,
  TaskCollectionNode
} from '@/components/nodes'

const store = useWorkflowStore()
const elements = ref([])
const edges = computed(() => store.getEdges())
const selectedEdge = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })

const tooltipStyle = computed(() => ({
  left: `${tooltipPosition.value.x}px`,
  top: `${tooltipPosition.value.y}px`
}))

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
  if (params?.source && params?.target) {
    const newEdge = store.addEdge(params)
    edges.value = store.getEdges()
  }
}

const onNodeDragStop = (nodeData) => {
  if (nodeData?.node?.id) {
    store.updateNodePosition(nodeData.node.id, nodeData.node.position)
    elements.value = elements.value.map(el => 
      el.id === nodeData.node.id ? { ...el, position: nodeData.node.position } : el
    )
  }
}

const onEdgeClick = (event, edge) => {
  if (!edge) return
  
  selectedEdge.value = edge
  tooltipPosition.value = {
    x: event.clientX + 10,
    y: event.clientY - 30
  }

  setTimeout(() => {
    if (selectedEdge.value === edge) {
      selectedEdge.value = null
    }
  }, 2000)
}

const onEdgeDoubleClick = (event, edge) => {
  if (!edge?.id) return
  
  store.removeEdge(edge.id)
  edges.value = store.getEdges()
  selectedEdge.value = null
}

const onResetView = () => {
  fitView({ padding: 0.2 })
}

onMounted(() => {
  const startNode = store.createNode('start')
  elements.value = [startNode]
})

onPaneReady(({ fitView }) => {
  fitView()
})
</script>

<style>
/* ... rest of the styles remain the same ... */
</style>