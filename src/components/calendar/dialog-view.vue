<template>
  <div>
    <q-list>
      <q-item class="row justify-between">
        <q-item-section class="col">Summary</q-item-section>
        <q-item-section class="col">{{viewData.summary}}</q-item-section>
      </q-item>
      <q-item class="row justify-between">
        <q-item-section class="col">Description</q-item-section>
        <q-item-section class="col">{{viewData.description}}</q-item-section>
      </q-item>
      <q-item class="row justify-between">
        <q-item-section class="col">Location</q-item-section>
        <q-item-section class="col">{{viewData.location}}</q-item-section>
      </q-item>
      <!-- <q-item>
        <q-item-label>Start</q-item-label>
        <q-item-label>{{viewData.start.dateTime || new Date()}}</q-item-label>
      </q-item>
      <q-item>
        <q-item-label>Start</q-item-label>
        <q-item-label>{{viewData.end.dateTime || new Date()}}</q-item-label>
      </q-item>-->

      <q-item>
        <q-btn
          @click="$emit('dialog-close')"
          color="purple"
          class="col q-my-lg"
          style="float:right"
          label="Close"
        ></q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["viewData"]
};
</script>
