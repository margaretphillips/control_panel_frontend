<template>
  <div>
    <div class="full-width q-my-lg">
      <q-tabs v-model="tab" narrow-indicator dense align="justify">
        <q-tab
          style="height:80px"
          @click="tab='active'"
          :class="tab === 'active' ? 'active-tab' : 'inactive-tab'"
          :ripple="false"
          name="active"
          label="Active"
        />
        <q-tab
          @click="tab='inactive'"
          :class="tab === 'inactive' ? 'active-tab' : 'inactive-tab'"
          :ripple="false"
          name="inactive"
          label="InActive"
        />
      </q-tabs>
    </div>
    <q-list v-if="tab === 'active'">
      <!-- <q-item>
        <big>Active Expenses</big>
      </q-item>-->
      <q-item class="row justify-between" v-for="expense in active_expenses" :key="expense._id">
        <!-- <input type="checkbox" @click="deleteExpense(expense._id)" /> -->
        <i class="material-icons q-mr-md" @click="deleteExpense(expense._id)">delete</i>
        <!-- <q-input v-model="expense.category" label="Category" /> -->
        <q-input v-model="expense.label" label="Name" />
        <q-input v-model="expense.projected" label="Projected" />
        <q-input v-model="expense.actual" label="Actual" />
        <q-input v-model="expense.duedate" label="Due On" />
        <!-- <date-picker v-model="expense.duedate" /> -->
        <q-toggle
          label="Paid"
          color="pink"
          false-value="no"
          true-value="yes"
          v-model="expense.paid"
        />
        <q-toggle
          label="Active"
          color="pink"
          false-value="no"
          true-value="yes"
          v-model="expense.active"
        />
        <!-- <q-btn
          class="q-ma-sm"
          color="purple"
          raised
          label="Update"
          @click="updateExpense(expense._id,
                  {
                    label: expense.label,
                    category: expense.category,
                    projected: expense.projected,
                    actual: expense.actual,
                    duedate: expense.duedate,
                    //nextdate: expense.nextdate,
                    paid: expense.paid,
                    active: expense.active,
                    recurrance: 0
                  })"
        />-->
        <i
          class="material-icons q-ml-md"
          @click="updateExpense(expense._id,
                  {
                    label: expense.label,
                    category: expense.category,
                    projected: expense.projected,
                    actual: expense.actual,
                    duedate: expense.duedate,
                    //nextdate: expense.nextdate,
                    paid: expense.paid,
                    active: expense.active,
                    recurrance: 0
                  })"
        >update</i>
      </q-item>
    </q-list>
    <q-list v-if="tab === 'inactive'">
      <!-- <q-item>
        <big>InActive Expenses</big>
      </q-item>-->
      <q-item class="row justify-between" v-for="expense in inactive_expenses" :key="expense._id">
        <!-- <input type="checkbox" @click="deleteExpense(expense._id)" /> -->
        <i class="material-icons q-mr-md" @click="deleteExpense(expense._id)">delete</i>
        <!-- <q-input v-model="expense.category" label="Category" /> -->
        <q-input v-model="expense.label" label="Name" />
        <q-input v-model="expense.projected" label="Projected" />
        <q-input v-model="expense.actual" label="Actual" />
        <q-input v-model="expense.duedate" label="Due On" />
        <!-- <date-picker v-model="expense.duedate" /> -->
        <q-toggle
          label="Paid"
          color="pink"
          false-value="no"
          true-value="yes"
          v-model="expense.paid"
        />
        <q-toggle
          label="Active"
          color="pink"
          false-value="no"
          true-value="yes"
          v-model="expense.active"
        />
        <i
          class="material-icons q-ml-md"
          @click="updateExpense(expense._id,
                  {
                    label: expense.label,
                    category: expense.category,
                    projected: expense.projected,
                    actual: expense.actual,
                    duedate: expense.duedate,
                    //nextdate: expense.nextdate,
                    paid: expense.paid,
                    active: expense.active,
                    recurrance: 0
                  })"
        >update</i>
        <!-- <q-btn
          class="q-ma-sm"
          color="purple"
          raised
          label="Update"
          @click="updateExpense(expense._id,
                  {
                    label: expense.label,
                    category: expense.category,
                    projected: expense.projected,
                    actual: expense.actual,
                    duedate: expense.duedate,
                    //nextdate: expense.nextdate,
                    paid: expense.paid,
                    active: expense.active,
                    recurrance: 0
                  })"
        />-->
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  data() {
    return {
      tab: "active"
    };
  },
  computed: {
    expenses() {
      return this.$store.state.expenses;
    },
    active_expenses() {
      return this.expenses
        .filter(i => i.active === "yes")
        .sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    inactive_expenses() {
      return this.expenses
        .filter(i => i.active === "no")
        .sort((a, b) => (a.label > b.label ? 1 : -1));
    }
  },
  methods: {
    updateExpense(id, expense) {
      expense._id = id;
      // expense.duedate = new Date();
      // expense.nextdate = new Date();

      this.$store.dispatch("updateExpense", expense);
      if (expense.paid === "yes" && expense.active === "yes") {
        expense.transtype = "expense";
        this.$store.dispatch("addTransaction", expense);
      }
    },
    deleteExpense(id) {
      this.$store.dispatch("deleteExpense", id);
    }
  }
};
</script>
