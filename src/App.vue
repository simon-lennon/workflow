<template>
  <!-- Previous template content remains the same -->
  <VueFlow
    v-model="elements"
    :nodes="elements"
    :edges="edges"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    class="workflow"
    :default-viewport="{ x: 0, y: 0, zoom: 1.5 }"
    @connect="onConnect"
    @nodedragstop="onNodeDragStop"
    @edge-double-click="onEdgeDoubleClick"
    @edge-click="onEdgeClick"
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
  </template>

<script setup>
// Previous imports remain the same

const store = useStore()
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
  const newEdge = store.addEdge(params)
  edges.value = store.getEdges()
}

// Fixed node drag handler
const onNodeDragStop = (nodeData) => {
  if (nodeData && nodeData.node) {
    store.updateNodePosition(nodeData.node.id, nodeData.node.position)
    // Update the elements to reflect the new position
    elements.value = elements.value.map(el => 
      el.id === nodeData.node.id ? { ...el, position: nodeData.node.position } : el
    )
  }
}

const onEdgeClick = (event, edge) => {
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
/* Previous styles remain the same */
</style>