<template>
  <q-list class="full-width">
    <q-item class="row full-width no-padding">
      <big class="col-12 row justify-between">
        <span class="text-dark">{{ incomeType }}</span>
        <span>${{ totalIncome }}</span>
      </big>
    </q-item>
    <q-item class="col-12 no-padding" v-for="income in incomes" :key="income._id">
      <income-item :income_item="income" :meta="income.type" v-on:income_updated="checkIncome" />
    </q-item>
  </q-list>
</template>

<script>
import IncomeItem from "components/forms/IncomeItem.vue";
export default {
  props: {
    incomeType: String,
    incomes: Array,
    totalIncome: String
  },
  components: {
    "income-item": IncomeItem
  },
  methods: {
    checkIncome() {
      this.$emit("income_updated");
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
