<template>
  <q-list class="full-width">
    <q-item class="row full-width" v-for="s in savings" :key="s._id">
      <div class="col-1 q-pa-sm q-pt-lg">
        <i class="material-icons" @click="deleteSavings(s._id)">delete</i>
      </div>
      <div class="col-5 q-pa-sm">
        <q-input label="Account" v-model="s.account" />
      </div>
      <div class="col-5 q-pa-sm">
        <q-input label="Amount" v-model="s.amount" />
      </div>
      <div class="col-1 q-pa-sm q-pt-lg">
        <q-btn
          color="secondary"
          raised
          label="Update"
          @click="updateSavings(s._id, { account: s.account, amount: s.amount })"
        />
      </div>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      account: null,
      amount: null
    };
  },
  methods: {
    updateSavings(id, savings) {
      savings._id = id;
      this.$store.dispatch("updateSavings", savings).then(() => {
        this.setBudgetView("savings", false);
      });
    },
    deleteSavings(id) {
      this.$store.dispatch("deleteSavings", id).then(() => {
        this.$store.dispatch("getSavings");
        this.setBudgetView("savings", false);
      });
    },
    setBudgetView(type, show) {
      this.budgetView.type = type;
      this.budgetView.show = show;
    }
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
        this.$store.commit("setBudgetView", { type: type, show: show });
      }
    }
  },

  mounted() {
    this.$store.dispatch("getSavings");
  }
};
</script>
