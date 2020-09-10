<template>
  <div>
    <q-card class="row full-width bg-primary q-pa-lg">
      <q-card-section class="col-12">
        <h5 class="text-grey q-ml-lg q-mb-lg">Create a New Task</h5>
        <q-card>
          <q-card-section>
            <div class="row wrap justify-between">
              <q-field class="col-12 q-pa-md">
                <q-input class="full-width" v-model="title" label="Title" />
              </q-field>
              <q-field class="col-12 q-pa-md">
                <q-input
                  class="textarea"
                  v-model="description"
                  label="Details"
                  type="textarea"
                  rows="3"
                />
              </q-field>
            </div>
          </q-card-section>

          <q-card-section class="row justify-around"></q-card-section>
          <q-card-section>
            <div class="row justify-end">
              <div class="col text-right">
                <i class="material-icons q-mr-lg" @click="addTask">save</i>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";

export default {
  data() {
    return {
      title: null,
      description: null
    };
  },
  methods: {
    addTask() {
      const task = {
        title: this.title,
        description: this.description
      };
      ControlPanelService.addTask(task)
        .then(() => {
          this.$router.replace("/todos");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.form-box {
  position: absolute;
  top: 10vh;
  margin-left: 10vw;
  width: 80vw;
  height: 60vh;
  background: #fff;
}
</style>
