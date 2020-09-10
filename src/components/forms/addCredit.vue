<template>
  <q-list class="row nowrap justify-between full-width">
    <q-field class="col-3 q-pa-md" label="Card Name">
      <q-input class="full-width" v-model="label"></q-input>
    </q-field>

    <q-field class="col-3 q-pa-md" label="Due Date">
      <q-input class="full-width" v-model="paymentduedate"></q-input>
    </q-field>

    <q-field class="col-3 q-pa-md" label="Payment Due">
      <q-input v-model="paymentdue" />
    </q-field>
    <q-field class="col-3 q-pa-md" label="Available">
      <q-input v-model="creditavailable" />
    </q-field>
    <q-field class="col-3 q-pa-md" label="Owed">
      <q-input v-model="creditbalance" />
    </q-field>
    <q-field class="col-3 q-pa-md" label="Limit">
      <q-input v-model="creditlimit" />
    </q-field>
    <q-item class="col-6 q-pa-sm">
      <label>Revolving line of credit?</label>
      <q-radio v-model="revolving" val="yes" label="Yes" />
      <q-radio v-model="revolving" val="no" label="No" />
    </q-item>
    <q-item class="col-12 row justify-end full-width">
      <!-- <i class="material-icons" @click="addIncome">post_add</i> -->
      <q-btn color="purple" raised label="Create" @click="insertCredit()" />
      <q-btn color="purple" raised label="Cancel" @click="setBudgetView('credit', false)" />
    </q-item>
  </q-list>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  data() {
    return {
      label: null,
      creditlimit: null,
      creditbalance: null,
      creditavailable: null,
      paymentdue: null,
      paymentduedate: null,
      paid: true,
      credit_item: null,
      expanded: false,
      revolving: "yes"
    };
  },
  methods: {
    setBudgetView(type, show) {
      this.$store.commit("setBudgetView", { type: type, show: show });
    },
    insertCredit() {
      let credit = {
        label: this.label,
        paymentduedate: this.paymentduedate,
        creditbalance: this.creditbalance,
        creditavailable: this.creditavailable,
        paymentdue: this.paymentdue,
        creditlimit: this.creditlimit,
        revolving: this.revolving
      };
      this.$store.dispatch("insertCredit", credit);
      this.resetFields();
    },
    resetFields() {
      this.label = null;
      this.paymentduedate = null;
      this.creditbalance = null;
      this.creditavailable = null;
      this.paymentdue = null;
      this.creditlimit = null;
      this.revolving = "yes";
      this.expanded = false;
    }
  }
};
</script>
