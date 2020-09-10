<template>
  <q-list class="balance-item">
    <q-item class="row full-width nowrap q-pa-sm">
      <div class="col-3 text-center">
        <h6 class="text-grey">Payments</h6>
      </div>
      <div class="col-3 text-center" v-show="type != 'loans'">
        <h6 class="text-grey">Available</h6>
      </div>
      <div class="col-3 text-center">
        <h6 class="text-grey">Owed</h6>
      </div>
      <div class="col-3 text-center" v-show="type != 'loans'">
        <h6 class="text-grey">Limit</h6>
      </div>
    </q-item>
    <q-item class="row full-width q-pa-sm">
      <div class="col-3 text-center">
        <h6 class="text-grey">${{ payment_total }}</h6>
      </div>
      <div class="col-3 text-center" v-show="type != 'loans'">
        <h6 class="text-grey">${{ available_total }}</h6>
      </div>
      <div class="col-3 text-center">
        <h6 class="text-grey">${{ balance_total }}</h6>
      </div>
      <div class="col-3 text-center" v-show="type != 'loans'">
        <h6 class="text-grey">${{ limit_total }}</h6>
      </div>
    </q-item>
  </q-list>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  props: { type: String, credit: Array },
  computed: {
    limit_total() {
      if (this.credit) {
        let limit = [];
        this.credit.map(i =>
          i.creditlimit > 0 ? limit.push(i.creditlimit) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return limit.reduce(reducer, 0);
      }
    },
    available_total() {
      if (this.credit) {
        let available = [];
        this.credit.map(i =>
          i.creditavailable > 0 ? available.push(i.creditavailable) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return available.reduce(reducer, 0);
      }
    },
    balance_total() {
      if (this.credit) {
        let balance = [];
        this.credit.map(i =>
          i.creditbalance > 0 ? balance.push(i.creditbalance) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return balance.reduce(reducer, 0);
      }
    },
    loan_balance_total() {
      if (this.credit) {
        let balance = [];
        this.credit.map(i =>
          i.creditbalance > 0 ? balance.push(i.creditbalance) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return balance.reduce(reducer, 0);
      }
    },
    payment_total() {
      if (this.credit) {
        let paymentsdue = [];
        this.credit.map(i =>
          i.paymentdue > 0 ? paymentsdue.push(i.paymentdue) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return paymentsdue.reduce(reducer, 0);
      }
    },
    loan_payment_total() {
      if (this.credit) {
        let paymentsdue = [];
        this.credit.map(i =>
          i.paymentdue > 0 ? paymentsdue.push(i.paymentdue) : null
        );
        const reducer = (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue);
        return paymentsdue.reduce(reducer, 0);
      }
    }
  }
};
</script>

<style lang="scss">
.balance-item {
  h6 {
    font-size: 1rem !important;
  }
}
</style>

