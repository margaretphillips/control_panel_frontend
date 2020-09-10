<template>
  <q-list class="row full-width" style="font-size:1.1rem;border-bottom:1px solid #ccc">
    <q-item class="col-12 full-width row justify-between">
      <q-item-label class="col">Income</q-item-label>
      <q-item-label class="col">${{total_actual_income}}</q-item-label>
    </q-item>
    <q-item class="col-12 full-width row justify-between">
      <q-item-label class="col">Expense</q-item-label>
      <q-item-label class="col">${{expense_total}}</q-item-label>
    </q-item>
    <q-item class="col-12 full-width row justify-between">
      <q-item-label class="col">Balance</q-item-label>
      <q-item-label class="col">${{final_balance}}</q-item-label>
    </q-item>
    <q-item class="col-12 full-width row justify-between">
      <q-item-label class="col">Paid</q-item-label>
      <q-item-label class="col">${{expense_total_paid}}</q-item-label>
    </q-item>
    <q-item class="col-12 full-width row justify-between">
      <q-item-label class="col">Unpaid</q-item-label>
      <q-item-label class="col">${{expense_total_unpaid}}</q-item-label>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      expense_total: 0,
      expense_total_paid: 0,
      expense_total_unpaid: 0,
      final_balance: 0
    };
  },
  watch: {
    active_expenses() {
      // paid
      let total = 0;
      this.expense_total_paid = this.active_expenses.filter(
        i => i.paid === "yes"
      );
      this.expense_total_paid.forEach(i => {
        total += Number(i.actual);
      });
      this.expense_total_paid = Number(total).toFixed(2);
      // unpaid
      total = 0;
      this.expense_total_unpaid = this.active_expenses.filter(
        i => i.paid === "no"
      );
      this.expense_total_unpaid.forEach(i => {
        total += Number(i.projected);
      });
      this.expense_total_unpaid = Number(total).toFixed(2);
      this.expense_total =
        Number(this.expense_total_paid) + Number(this.expense_total_unpaid);
      this.expense_total = Number(this.expense_total).toFixed(2);
      this.getBalance();
    }
  },
  methods: {
    getBalance() {
      this.final_balance = this.total_actual_income - this.expense_total;
      this.final_balance = Number(this.final_balance).toFixed(2);
    },
    calculateTotals() {}
  },
  computed: {
    total_actual_income() {
      return Number(this.$store.state.total_actual_income).toFixed(2);
    },
    income_actual() {
      return this.$store.state.income_actual;
    },
    active_expenses() {
      return this.$store.state.active_expenses;
    }
  },
  mounted() {
    console.log("mounted");
    // this.calculateTotals()
    this.$store.dispatch("getIncomes");
    this.$store.dispatch("getExpenses");
  }
};
</script>
