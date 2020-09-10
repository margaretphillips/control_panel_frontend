<template>
  <div class="q-py-sm breadcrumbs">
    <q-breadcrumbs
      separator=" > "
      class="text-primary"
      active-color="white"
      style="font-size: 1rem"
    >
      <q-breadcrumbs-el label="Budget" icon="home" />
      <q-breadcrumbs-el v-if="tab==='summary'" label="Summary" icon="widgets" />
      <q-breadcrumbs-el v-if="tab==='income'" label="Income" icon="widgets" />
      <q-breadcrumbs-el v-if="tab==='expenses'" label="Expenses" icon="widgets" />
      <q-breadcrumbs-el v-if="tab==='credit'" label="Credit" icon="widgets" />
      <q-breadcrumbs-el v-if="tab==='savings'" label="Savings" icon="widgets" />
    </q-breadcrumbs>
    <q-btn-group class="sub-btn-b">
      <q-btn v-if="tab==='expenses'" @click="setBudgetView('expenses', true)" label="Add Expense"></q-btn>
      <router-link to="detail/expenses/categories/edit" v-if="tab==='expenses'">
        <q-btn label="Categories"></q-btn>
      </router-link>
    </q-btn-group>
  </div>
</template>


<script>
import breadcrumbs from "layouts/breadcrumbs/transactions.vue";

export default {
  props: {
    tab: String
  },
  methods: {
    setBudgetView(type, show) {
      this.$store.commit("setBudgetView", { type: type, show: show });
    }
  }
};
</script>


<style lang="scss">
.breadcrumbs {
  width: 100%;
  height: 2%;
  background: #5499c7;
  color: #333;
}

.sub-btn-b {
  background: #ddd !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-right: 44px;
  float: right;
  margin-top: -3%;
  margin-right: 3%;
  color: #333 !important;
  white-space: nowrap;

  .q-btn {
    //width: 120px !important;
    border-right: 1px solid #222;
    padding-left: 14px;
    padding-right: 14px;
  }
  .q-btn:last-child {
    //width: 120px !important;
    border-right: none !important;
  }
}
</style>