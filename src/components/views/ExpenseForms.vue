<template>
  <q-card class="row full-width bg-primary q-pa-lg">
    <q-card-section class="col-12">
      <h5 class="text-grey q-ml-lg q-mb-lg">Income Detail</h5>
      <add-category />
      <edit-categories />
    </q-card-section>
  </q-card>
</template>

<script>
import AddCategory from "components/forms/AddCategory.vue";
import EditCategories from "components/forms/EditCategories.vue";

export default {
  components: {
    "expense-category": ExpenseCategory,
    "add-category": AddCategory
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
