<template>
  <div class="full-width full-height">
    <add-task />
  </div>
</template>

<script>
import addTask from "./../components/forms/addTask.vue";

export default {
  components: {
    "add-task": addTask
  },
  data() {
    return {
      component: "todos"
    };
  }
};
</script>

<style>
</style>
