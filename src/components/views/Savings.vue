<template>
  <q-list class="full-width">
    <q-item
      class="row full-width justify-between no-margins no-padding"
      style="border-bottom:1px solid #ccc"
    >
      <q-item class="col-10">
        <h5 class="text-grey">Savings</h5>
      </q-item>
      <q-item
        class="col row justify-end"
        v-if="budgetView && budgetView.type === 'savings' && budgetView.show === true"
      >
        <q-btn label="cancel" color="secondary" raised @click="setBudgetView('savings', false)"></q-btn>
      </q-item>
      <q-item class="col row justify-end" v-else>
        <q-btn label="create" color="secondary" raised @click="setBudgetView('savings',true)"></q-btn>
      </q-item>
    </q-item>
    <q-item class="col-12 row justify-between q-mr-sm">
      <h5 class="text-dark">Total</h5>
      <h5 class="text-dark">${{totalSavings}}</h5>
    </q-item>

    <q-item
      class="col-12"
      v-if="budgetView && budgetView.type === 'savings' && budgetView.show === true"
    >
      <q-card class="row full-width bg-white no-padding no-margins">
        <q-card-section class="col-12">
          <h5 class="text-dark q-ml-lg q-mb-lg">Add Savings</h5>
          <add-savings />
        </q-card-section>
      </q-card>
    </q-item>
    <q-item class="col-12">
      <savings-item />
    </q-item>
  </q-list>
</template>

<script>
import addSavings from "./../../components/forms/addSavings.vue";
import savingsItem from "./../../components/modules/lists/line-card-savings.vue";
import savingsEdit from "./../../components/forms/editSavings.vue";

export default {
  components: {
    "add-savings": addSavings,
    "savings-item": savingsItem,
    "savings-edit": savingsEdit
  },
  computed: {
    totalSavings() {
      if (this.savings) {
        let total = 0;
        this.savings.forEach(i => {
          total += parseInt(i.amount);
        });

        return total;
      }
    },
    savings: {
      get: function() {
        return this.$store.state.savings;
      },
      set: function() {
        this.$store.commit("setSavings", this.savings);
      }
    },
    budgetView: {
      get: function() {
        return this.$store.state.budgetView;
      },
      set: function(view) {
        this.$store.commit("setBudgetView", view);
      }
    }
  },
  methods: {
    setBudgetView(type, show) {
      this.budgetView = { type: type, show: show };
    }
  },
  mounted() {
    this.$store.dispatch("getSavings");
  }
};
</script>

<style>
input[type="text"] {
  width: 100%;
}
input[type="number"] {
  width: 100%;
  min-height: 39px;
  border: 1px solid #eee;
}
</style>
