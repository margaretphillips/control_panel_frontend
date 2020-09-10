<template>
  <q-list class="full-width">
    <q-item
      class="row full-width justify-between no-margins no-padding"
      style="border-bottom:1px solid #ccc"
    >
      <q-item class="col-10">
        <h5 class="text-grey">Credit</h5>
      </q-item>
      <q-item
        class="col row justify-end"
        v-if="budgetView && budgetView.type === 'credit' && budgetView.show === true"
      >
        <q-btn label="cancel" color="secondary" raised @click="setBudgetView('credit', false)"></q-btn>
      </q-item>
      <q-item class="col row justify-end" v-else>
        <q-btn label="create" color="secondary" raised @click="setBudgetView('credit',true)"></q-btn>
      </q-item>
    </q-item>
    <q-item
      class="row full-width"
      v-if="budgetView && budgetView.type=='credit' && budgetView.show === true"
    >
      <add-credit />
    </q-item>
    <q-item class="row nowrap justify-between border-bottom">
      <h6 class="col-5 q-mb-sm text-grey">Revolving lines of credit</h6>
      <balance-item
        style="position:relative;top:-12px"
        class="col-7"
        type="revolving"
        :credit="credit"
      />
    </q-item>
    <q-item class="row nowrap justify-between border-bottom">
      <h6 class="col-5 q-mb-sm text-grey">Credit Owed</h6>
      <balance-item
        style="position:relative;top:-12px"
        class="col-7"
        type="revolving_active"
        :credit="activeCredit"
      />
    </q-item>
    <q-item class="row q-pa-sm" v-for="c in activeCredit" :key="c._id">
      <credit-item :credit_item="c" slug="revolving" />
    </q-item>
    <q-item class="row nowrap justify-between border-bottom">
      <h6 class="col-5 q-mb-sm text-grey">Credit Paid Off / Unused</h6>
      <balance-item
        style="position:relative;top:-12px"
        class="col-7"
        type="revolving_archived"
        :credit="archivedCredit"
      />
    </q-item>
    <q-item class="row q-pa-sm" v-for="c in archivedCredit" :key="c._id">
      <credit-item :credit_item="c" slug="revolving" />
    </q-item>
    <q-item class="row nowrap justify-between border-bottom">
      <h6 class="col-5 q-mb-sm text-grey">Loans and Debt</h6>
      <balance-item style="position:relative;top:-12px" class="col-7" type="loans" :credit="loans" />
    </q-item>
    <q-item v-for="(c, index) in loans" :key="index">
      <credit-item :credit_item="c" slug="loan" />
    </q-item>
  </q-list>
</template>

<script>
import AddCredit from "./../../components/forms/addCredit.vue";
import CreditItem from "./../../components/modules/lists/line-card.vue";
import balanceItem from "./../../components/modules/lists/balance-item.vue";

export default {
  components: {
    "credit-item": CreditItem,
    "add-credit": AddCredit,
    "balance-item": balanceItem
  },
  data() {
    return {
      payoff: 0
    };
  },
  computed: {
    budgetView() {
      return this.$store.state.budgetView;
    },
    credit() {
      return this.$store.state.credit;
    },
    activeCredit() {
      if (this.credit) {
        let credit = this.credit
          .filter(i => i.revolving === "yes")
          .sort((a, b) => (a.label < b.label ? -1 : 1));

        return credit.filter(i => i.creditbalance > 0);
      }
    },
    archivedCredit() {
      if (this.credit) {
        let credit = this.credit
          .filter(i => i.revolving === "yes")
          .sort((a, b) => (a.label < b.label ? -1 : 1));

        return credit.filter(i => parseInt(i.creditbalance) <= 0);
      }
    },
    loans() {
      if (this.credit) {
        return this.credit
          .filter(i => i.revolving === "no")
          .sort((a, b) => (a.label < b.label ? -1 : 1));
      }
    }
  },
  methods: {
    setBudgetView(type, show) {
      this.$store.commit("setBudgetView", { type: type, show: show });
    }
  },
  created() {
    this.$store.dispatch("getCredit");
  }
};
</script>

<style>
.border-bottom {
  border-bottom: 1px solid #ccc;
}
</style>
