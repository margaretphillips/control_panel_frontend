<template>
  <div>
    <breadcrumbs :tab="tab" />

    <div class="full-width full-height bg-primary">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal">
            <q-tab
              name="summary"
              icon="dashboard"
              label="Summary"
              @click="setBudgetView('summary',false)"
            />
            <q-tab
              name="income"
              icon="add_circle_outline"
              label="Income"
              @click="setBudgetView('income',false)"
            />
            <q-tab
              name="expenses"
              icon="remove_circle"
              label="Expenses"
              @click="setBudgetView('expenses',false)"
            />
            <q-tab
              name="credit"
              icon="remove_circle"
              label="Credit"
              @click="setBudgetView('credit',false)"
            />
            <q-tab
              name="savings"
              icon="remove_circle"
              label="Savings"
              @click="setBudgetView('savings',false)"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
            <q-tab-panel name="summary">
              <q-list>
                <q-item>
                  <balance />
                </q-item>
                <q-item>
                  <summary-component />
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="income">
              <q-list>
                <q-item>
                  <income-component />
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="expenses">
              <q-list>
                <q-item>
                  <expense-component />
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="credit">
              <q-list>
                <q-item>
                  <credit-component />
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="savings">
              <q-list>
                <q-item>
                  <savings-component />
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>

      <!-- <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-show="!visible">
          <div class="row full-width full-height q-pt-sm" style="background:#000">
            <div class="col">
              <div class="q-ma-lg q-pa-sm full-height">
                <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
                  <q-tab-panel name="income">
                    <div>
                      <income-component />
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="expenses">
                    <div>
                      <expense-component />
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="credit">
                    <div>
                      <credit-component />
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="savings">
                    <div>
                      <savings-component />
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </div>
        </div>
      </transition>-->
      <q-inner-loading class="loader" :showing="visible">
        <q-spinner-gears class="gears" color="positive" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import menuToggle from "./../components/modules/menu-toggle.vue";
import customCard from "./../components/modules/custom-card.vue";
import balance from "./../components/views/balance.vue";
import summary from "./../components/views/summary.vue";
import income from "./../components/views/income.vue";
import expense from "./../components/views/expense.vue";
import credit from "./../components/views/credit.vue";
import savings from "./../components/views/savings.vue";
import breadcrumbs from "layouts/breadcrumbs/budget.vue";

export default {
  components: {
    "menu-toggle": menuToggle,
    "custom-card": customCard,
    balance,
    "summary-component": summary,
    "income-component": income,
    "expense-component": expense,
    "credit-component": credit,
    "savings-component": savings,
    breadcrumbs
  },
  data() {
    return {
      visible: true,
      tab: "summary",
      splitterModel: 20,
      show_summary: false,
      show_income: false,
      show_expense: false,
      show_credit: false,
      show_savings: false,
      toggleOptions: [
        { label: "yes", value: "yes" },
        { label: "no", value: "no" }
      ],
      menus: [
        {
          slug: "balance",
          label: "Balance",
          status: "yes"
        },
        {
          slug: "summary",
          label: "Summary",
          status: "yes"
        },
        {
          slug: "income",
          label: "Income",
          status: "yes"
        },
        {
          slug: "expense",
          label: "Expense",
          status: "yes"
        },
        {
          slug: "credit",
          label: "Credit",
          status: "yes"
        },
        {
          slug: "savings",
          label: "Savings",
          status: "yes"
        }
      ],
      panel: "summary"
    };
  },
  computed: {
    filteredMenus() {
      return this.menus.filter(i => i.status === "yes");
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
  methods: {
    setBudgetView(type, show) {
      this.budgetView.type = type;
      this.budgetView.show = show;
    },
    updateViews(view) {
      this.menus.map(i => {
        if (i.slug === view.slug) {
          i.status = view.status;
        }
        return {
          slug: i.slug,
          label: i.label,
          status: i.status
        };
      });
    },
    showLoading() {
      this.visible = true;
      setTimeout(() => {
        if (this.filteredMenus.length > 0) {
          this.visible = false;
        }
      }, 800);
    }
  },
  mounted() {
    this.showLoading();
  }
};
</script>

