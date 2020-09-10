<template>
  <q-card class="row full-width bg-white no-padding no-margins">
    <q-card-section class="col-12">
      <h5 class="text-dark q-ml-lg q-mb-lg">Add Income</h5>
      <add-income v-on:income_updated="checkIncome" />
    </q-card-section>
  </q-card>
</template>

<script>
import AddIncome from "components/forms/AddIncome.vue";
import formCard from "components/modules/lists/form-card.vue";

export default {
  components: {
    "add-income": AddIncome,
    "form-card": formCard
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    checkIncome() {
      this.expanded = false;
      this.$store.dispatch("getIncomes");
    }
  },
  computed: {
    total_actual_income() {
      return Number(this.$store.state.total_actual_income).toFixed(2);
    },
    income_projected() {
      return this.$store.state.income_projected;
    },
    income_actual() {
      return this.$store.state.income_actual;
    },
    total_projected_income() {
      return Number(this.$store.state.total_projected_income).toFixed(2);
    }
  },
  mounted() {
    this.$store.dispatch("getIncomes");
  }
};
</script>
