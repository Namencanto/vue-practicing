<template>
  <header>
    <h1>{{ title }}</h1>
    <SiteButton
      v-show="homePage"
      @btn-click="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
    <SiteButton text="Update Task" color="blue" />
    <SiteButton text="Delete Task" color="pink" />
  </header>
</template>

<script>
import SiteButton from './SiteButton.vue'

export default {
  name: 'SiteHeader',
  props: {
    title: {
      type: String,
      default: 'Hello World'
    },
    showAddTask: Boolean
  },
  components: {
    SiteButton
  },
  computed: {
    homePage() {
      if (this.$route.path === '/') return true
      else return false
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
