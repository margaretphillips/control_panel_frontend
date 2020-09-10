<template>
  <q-list>
    <q-item>
      <q-item-section>
        <div class="row nowrap full-width">
          <div class="col">
            <q-input label="Name" v-model="credit_item.label" />
          </div>
          <div class="col">
            <q-input label="Due Date" v-model="credit_item.paymentduedate" />
          </div>
          <div class="col">
            <q-input label="Payment Due" v-model="credit_item.paymentdue" />
          </div>
          <div class="col" v-if="credit_item.revolving === 'yes'">
            <q-input label="Available" v-model="credit_item.creditavailable" />
          </div>
          <div class="col">
            <q-input label="Owed" v-model="credit_item.creditbalance" />
          </div>
          <div class="col" v-if="credit_item.revolving === 'yes'">
            <q-input label="Limit" v-model="credit_item.creditlimit" />
          </div>
          <div class="col q-pl-lg q-mt-sm text-center" v-if="credit_item.revolving != 'yes'">
            <q-item-label class="q-pb-sm text-grey">Payoff</q-item-label>
            <div v-if="parseFloat(credit_item.paymentdue) != 0">
              <q-item-label
                class="text-dark"
              >{{ Math.floor(credit_item.creditbalance / credit_item.paymentdue) }} months</q-item-label>
            </div>
            <div v-else class="text-dark">0</div>
          </div>
          <div class="col q-pt-md justify-end">
            <q-btn
              style="float:right"
              label="Update"
              color="purple"
              raised
              @click="
                    updateCredit({
                      _id: credit_item._id,
                      label: credit_item.label,
                      paymentduedate: credit_item.paymentduedate,
                      creditbalance: credit_item.creditbalance,
                      creditavailable: credit_item.creditavailable,
                      paymentdue: credit_item.paymentdue,
                      creditlimit: credit_item.creditlimit,
                      paid: credit_item.paid,
                      revolving: credit_item.revolving
                    })
                  "
            ></q-btn>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    "date-picker": Datepicker
  },
  props: { credit_item: Object, slug: String },
  methods: {
    updateCredit(credit) {
      this.$store.dispatch("updateCredit", credit);
    }
  }
};
</script>

<style>
</style>
