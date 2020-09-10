<template>
  <q-list class="row full-width justify-between items-baseline no-margin no-padding">
    <q-item class="col-1 no-margin no-padding">
      <i class="material-icons q-mr-md" @click="deleteIncome(income_item._id)">delete</i>
    </q-item>
    <q-item class="col-4 no-margin no-padding">
      <q-input label="Title" v-model="income_item.title"></q-input>
    </q-item>
    <q-item class="col-3 no-margin no-padding">
      <q-input label="Amount" v-model="income_item.amount"></q-input>
    </q-item>
    <q-item class="col-3 no-margin no-padding">
      <q-input label="Day of Month" v-model="income_item.duedate"></q-input>
    </q-item>
    <q-item class="col-1 no-margin no-padding">
      <i
        class="material-icons q-ml-md"
        @click="
                  updateIncome(income_item._id, {
                    title: income_item.title,
                    duedate: income_item.duedate,
                    amount: income_item.amount,
                    type: meta
                  })
                "
      >update</i>
    </q-item>
  </q-list>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  props: {
    income_item: Object,
    meta: String
  },
  methods: {
    updateIncome(id, income) {
      ControlPanelService.updateIncome(id, income)
        .then(() => this.$emit("income_updated", 1))
        .catch(err => console.log(err));
    },
    deleteIncome(id) {
      ControlPanelService.deleteIncome(id)
        .then(() => this.$emit("income_updated", 1))
        .catch(err => console.log(err));
    }
  }
};
</script>
