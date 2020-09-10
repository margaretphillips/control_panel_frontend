<template>
  <div class="bg-white" style="overflow:scroll;">
    <breadcrumbs :tab="tab" />

    <q-splitter v-model="splitterModel" style="height: 100vh">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="summary" icon="dashboard" label="Summary" />
          <q-tab name="income" icon="add_circle_outline" label="Income" />
          <q-tab name="expenses" icon="remove_circle" label="Expenses" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="summary">
            <h6>Summary</h6>
          </q-tab-panel>

          <q-tab-panel name="income">
            <q-list>
              <h6>Income</h6>
              <q-item class="row nowrap" v-for="(t,index) in income_transactions" :key="index">
                <q-item class="col">
                  <i class="material-icons" @click="deleteTransaction(t._id)">delete</i>
                </q-item>
                <!-- <q-item class="col">{{t.type}}</q-item> -->
                <q-item class="col">{{t.title}}</q-item>
                <!-- <q-item class="col">{{t.duedate}}</q-item> -->
                <q-item class="col">${{t.amount}}</q-item>
                <q-item class="col">{{paidOn(t.paidon)}}</q-item>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="expenses">
            <q-list>
              <h6>Expenses</h6>
              <q-item class="row nowrap" v-for="(t,index) in expense_transactions" :key="index">
                <q-item class="col">
                  <i class="material-icons" @click="deleteTransaction(t._id)">delete</i>
                </q-item>
                <!-- <q-item class="col">{{t.type}}</q-item> -->
                <q-item class="col">{{t.category}}</q-item>
                <q-item class="col">{{t.label}}</q-item>
                <q-item class="col">${{t.actual}}</q-item>
                <q-item class="col">{{paidOn(t.paidon)}}</q-item>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import moment from "moment";
import breadcrumbs from "layouts/breadcrumbs/transactions.vue";

export default {
  components: {
    breadcrumbs
  },
  data() {
    return {
      tab: "summary",
      splitterModel: 20
    };
  },
  computed: {
    transactions() {
      return this.$store.state.transactions;
    },
    income_transactions() {
      if (this.transactions) {
        return this.transactions.filter(i => i.transtype == "income");
      }
    },
    expense_transactions() {
      if (this.transactions) {
        return this.transactions.filter(i => i.transtype == "expense");
      }
    }
  },
  methods: {
    paidOn(paidon) {
      return moment(paidon).format("MM/DD/YYYY");
    },
    getTransactions() {
      this.$store.dispatch("getTransactions");
    },
    deleteTransaction(id) {
      this.$store.dispatch("deleteTransaction", id);
    }
  },
  mounted() {
    this.getTransactions();
    //this.setComponentType();
  }
};
</script>

<style>
</style>
