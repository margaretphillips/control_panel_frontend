<template>
  <q-list class="full-width">
    <q-item
      class="row full-width justify-between no-margins no-padding"
      style="border-bottom:1px solid #ccc"
    >
      <q-item class="col-10">
        <h5 class="text-grey">Income</h5>
      </q-item>
      <q-item
        class="col row justify-end"
        v-if="budgetView && budgetView.type === 'income' && budgetView.show === true"
      >
        <q-btn label="cancel" color="secondary" raised @click="setBudgetView('income', false)"></q-btn>
      </q-item>
      <q-item class="col row justify-end" v-else>
        <q-btn label="create" color="secondary" raised @click="setBudgetView('income',true)"></q-btn>
      </q-item>
    </q-item>
    <q-item
      class="row full-width"
      v-if="budgetView && budgetView.type === 'income' && budgetView.show === true"
    >
      <add-income />
    </q-item>
    <q-item class="row full-width" v-if="income_projected.length > 0">
      <form-card
        class="col-12"
        incomeType="Projected"
        :incomes="income_projected"
        :totalIncome="total_projected_income"
        v-if="income_projected.length > 0"
        v-on:income_updated="checkIncome"
      />
    </q-item>
    <q-item class="row full-width" v-if="income_actual.length > 0">
      <form-card
        class="col-12"
        incomeType="Actual"
        :incomes="income_actual"
        :totalIncome="total_actual_income"
        v-if="income_actual.length > 0"
        v-on:income_updated="checkIncome"
      />
    </q-item>
  </q-list>
</template>

<script>
import formCard from "components/modules/lists/form-card.vue";
import addIncome from "pages/IncomeDetail.vue";

export default {
  components: {
    "form-card": formCard,
    "add-income": addIncome
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
    income: {
      get: function() {
        return this.$store.state.income;
      },
      set: function() {
        this.$store.commit("setIncome", this.income);
      }
    },
    budgetView: {
      get: function() {
        return this.$store.state.budgetView;
      },
      set: function(view) {
        this.$store.commit("setBudgetView", view);
      }
    },
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
  methods: {
    setBudgetView(type, show) {
      this.budgetView = { type: type, show: show };
    }
  },
  mounted() {
    this.$store.dispatch("getIncomes");
  }
};
</script>
