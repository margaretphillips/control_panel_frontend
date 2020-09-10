<template>
  <q-list class="row full-width no-borders">
    <q-item
      class="col-6 text-center row justify-between"
      style="font-size:1.1rem;border-bottom:1px solid #ccc;height:2.5rem"
    >
      <q-item-label class="col">Paid</q-item-label>
      <q-item-label class="col">$ {{ total_expenses_paid }}</q-item-label>
    </q-item>
    <q-item
      class="col-6 text-center row justify-between"
      style="font-size:1.1rem;border-bottom:1px solid #ccc;height:2.5rem"
    >
      <q-item-label class="col">Unpaid</q-item-label>
      <q-item-label class="col">$ {{ total_expenses_unpaid }}</q-item-label>
    </q-item>

    <q-item class="row no-margins no-padding full-width">
      <q-item class="col-6" style="border-right:1px solid #ccc;height:2.5rem">
        <div class="row full-width items-start">
          <q-item
            style="border-bottom:1px solid #ccc"
            class="no-margins no-padding col-12 row"
            v-for="e in expenses_paid"
            :key="e._id"
          >
            <q-item-section class="col-9">
              <router-link :to="`detail/expenses/${e._id}`">{{ e.label }}</router-link>
            </q-item-section>
            <q-item-section class="col text-right q-pr-md">${{ e.actual }}</q-item-section>
          </q-item>
        </div>
      </q-item>
      <q-item class="col-6">
        <div class="row full-width items-start">
          <q-item
            style="border-bottom:1px solid #ccc;height:2.5rem"
            class="no-margins no-padding col-12 row"
            v-for="e in expenses_unpaid"
            :key="e._id"
          >
            <q-item-section class="col-9">
              <router-link :to="`detail/expenses/${e._id}`">{{ e.label }}</router-link>
            </q-item-section>
            <q-item-section class="col text-right q-pr-md">${{ e.projected }}</q-item-section>
          </q-item>
        </div>
      </q-item>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      expenses_paid: [],
      expenses_unpaid: [],
      total_expenses_paid: 0,
      total_expenses_unpaid: 0
    };
  },
  watch: {
    active_expenses() {
      this.total_expenses_paid = 0;
      this.total_expenses_unpaid = 0;
      this.expenses_paid = [];
      this.expenses_unpaid = [];

      this.expenses_paid = this.active_expenses
        .filter(i => i.paid === "yes")
        .sort((a, b) => (a.label > b.label ? 1 : -1));
      this.expenses_unpaid = this.active_expenses
        .filter(i => i.paid === "no")
        .sort((a, b) => (a.label > b.label ? 1 : -1));

      this.expenses_paid.forEach(i => {
        this.total_expenses_paid += Number(i.actual);
      });

      this.total_expenses_paid = Number(this.total_expenses_paid).toFixed(2);
      this.expenses_unpaid.forEach(i => {
        this.total_expenses_unpaid += Number(i.projected);
      });

      this.total_expenses_unpaid = Number(this.total_expenses_unpaid).toFixed(
        2
      );
    }
  },
  computed: {
    active_expenses() {
      return this.$store.state.active_expenses;
    }
  },
  mounted() {
    this.$store.dispatch("getExpenses");
  }
};
</script>

<style>
</style>
