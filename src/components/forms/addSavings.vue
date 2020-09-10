<template>
  <q-list class="row full-width no-padding no-margins">
    <q-item class="col-12 q-pa-md">
      <q-input class="full-width" label="account" v-model="account" />
    </q-item>
    <q-item class="row justify-end full-width">
      <i class="material-icons" @click="insertAccount()">post_add</i>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      expanded: false
    };
  },
  computed: {
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
      set: function(type, show) {
        this.$store.commit("setBudgetView", { type: "savings", show: false });
      }
    }
  },
  methods: {
    setBudgetView(type, show) {
      this.budgetView = { type: type, show: show };
    },
    insertAccount() {
      let savings = {
        account: this.account,
        amount: 0,
        payment_type: ""
      };
      this.$store.dispatch("insertSavings", savings).then(() => {
        this.account = null;
        //this.savings = res;
        //console.log("SAVINGS   " + JSON.stringify(res));
        this.budgetView = { type: "savings", show: false };
      });
    }
  }
};
</script>
