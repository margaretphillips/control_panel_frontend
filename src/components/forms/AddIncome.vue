<template>
  <q-list class="row justify-between full-width">
    <q-field class="col q-pa-md" label="Title">
      <q-input class="full-width" v-model="income_title"></q-input>
    </q-field>
    <q-field class="col q-pa-md" label="Amount">
      <q-input class="full-width" v-model="income_amount"></q-input>
    </q-field>
    <q-field class="col q-pa-md" label="Day of Month">
      <q-input class="full-width" v-model="income_duedate"></q-input>
    </q-field>
    <q-field class="col q-pa-md" label="Income Type">
      <q-select class="full-width" v-model="income_type" :options="income_options" />
    </q-field>
    <q-item class="row justify-end full-width">
      <i class="material-icons" @click="addIncome">post_add</i>
    </q-item>
  </q-list>
</template>

<script>
import ControlPanelService from "./../../services/ControlPanelService.js";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  data() {
    return {
      show: false,
      income_title: null,
      income_duedate: null,
      income_amount: null,
      income_type: null,
      income_options: ["actual", "projected"],
      exp_remaining: [],
      exp_date: [],
      exp_all: [],
      periodEnd: 0
    };
  },
  computed: {
    expenses() {
      return this.$store.state.expenses;
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
      this.$store.commit("setBudgetView", { type: type, show: show });
    },
    addIncome() {
      this.$store.dispatch("getExpenses");

      this.$nextTick(() => {
        let income = {
          title: this.income_title,
          duedate: this.income_duedate,
          amount: this.income_amount,
          type: this.income_type,
          transtype: "income",
          paidon: new Date()
        };

        //console.log("INCOME  " + this.income_type);

        if (this.income_type == "actual") {
          this.$store.dispatch("addTransaction", income);
        }

        ControlPanelService.addIncome(income)
          .then(() => {
            this.updateExpenses(this.income_duedate);
            this.resetFields();
          })
          .catch(err => console.log(err));
      });
      this.setBudgetView("income", false);
    },
    resetFields() {
      this.show = false;
      this.income_title = "";
      //this.income_duedate = "";
      this.income_amount = "";
      this.income_type = "";
      this.$emit("income_updated");
      this.$router.replace("/budget");
    },
    updateExpenses(day) {
      if (this.expenses) {
        this.exp_remaining = [];
        this.exp_date = [];
        this.exp_all = [];
        //find the expenses that should be rolled over
        this.expenses.forEach(i => {
          if (i.paid == "no" && i.active == "yes") {
            this.exp_remaining.push(i._id);
          }
        });
        //find the expenses that fit within our date range
        this.expenses.forEach(i => {
          if (
            parseInt(i.duedate) >= parseInt(this.income_duedate) &&
            parseInt(i.duedate) <= parseInt(this.income_duedate) + 14
          ) {
            this.exp_date.push(i._id);
          }
        });

        //pull out any duplicates
        let final = [];
        this.exp_date.forEach(i => {
          if (this.exp_remaining.indexOf(i) < 0) {
            final.push(i);
          }
        });

        this.exp_date = final;

        this.expenses.forEach(i => {
          let paid = "no";
          let active = "no";

          if (this.exp_date.indexOf(i._id) >= 0) {
            //if this is a roll over item keep it active
            active = "yes";
          } else if (this.exp_remaining.indexOf(i._id) >= 0) {
            //if this is within the date range set it to active
            active = "yes";
          }

          let expense = {
            _id: i._id,
            category: i.category,
            label: i.label,
            projected: i.projected,
            actual: i.actual,
            duedate: i.duedate,
            recurrance: i.recurrance,
            paid: paid,
            active: active,
            notes: i.notes
          };

          this.$store.dispatch("updateExpense", expense);
        });
      }
    },
    setBudgetView(type, show) {
      this.budgetView = { type: type, show: show };
    }
  }
};
</script>
