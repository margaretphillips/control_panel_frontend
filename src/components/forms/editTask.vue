<template>
  <div>
    <q-list v-if="task">
      <q-item class="row justify-between">
        <i @click="deleteTask" class="material-icons">delete</i>
        <i @click="updateTask" class="material-icons">update</i>
      </q-item>
      <q-item>
        <div class="row full-width q-mr-lg">
          <div class="col-4">
            <q-input
              type="number"
              label="Priority"
              v-model="task.priority"
              class="full-width q-pa-sm q-pl-md"
            />
          </div>
          <div class="col-8 q-pt-lg">
            <div class="q-mr-lg" style="float:right!important;">
              <q-btn-toggle
                v-model="task.reminder"
                class="q-pl-md toggle"
                no-caps
                rounded
                unelevated
                raised
                toggle-color="secondary"
                color="primary"
                text-color="black"
                :options="[
          {label: 'Yes', value: 1},
          {label: 'No', value: 0}
        ]"
              />
              <label
                class="q-pl-lg full-width toggle-label text-center text-bold text-purple"
              >{{task.reminder == '1' ? 'task reminder on' : 'task reminder off'}}</label>
            </div>
          </div>
        </div>
      </q-item>
      <q-item class="row wrap justify-between items-start">
        <q-input outlined v-model="task.title" label="Title" class="full-width q-pa-sm" />
        <div>
          <q-input
            v-if="showDate == false"
            @click="showDate = !showDate"
            outlined
            v-model="task.duedate"
            label="Due Date"
            class="q-pa-sm"
          />
          <q-date
            @click="showDate = !showDate"
            v-if="showDate == true"
            v-model="task.duedate"
            mask="MM/DD/YYYY"
            minimal
          />
        </div>
      </q-item>
      <q-item>
        <q-input
          type="textarea"
          outlined
          v-model="task.description"
          label="Description"
          class="full-width q-pa-sm"
          rows="4"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";

export default {
  data() {
    return {
      showDate: false,
      description: null
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    tasks() {
      return this.$store.getters.tasks;
    },
    task() {
      let id = this.path.split("/")[3];
      return this.tasks.filter(i => i._id === id)[0];
    }
  },
  methods: {
    deleteTask() {
      ControlPanelService.deleteTask(this.task._id)
        .then(() => {
          this.$router.replace("/todos");
        })
        .catch(e => console.log("error : " + e));
    },
    updateTask() {
      ControlPanelService.updateTask(this.task._id, this.task)
        .then(() => this.$router.replace("/todos"))
        .catch(error => console.log(error));
    }
  },
  mounted() {
    this.$store.dispatch("getTasks");
  }
};
</script>

<style>
</style>
