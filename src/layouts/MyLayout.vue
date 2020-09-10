<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <q-header style="background:#000;">
          <q-toolbar class="row justify-between q-py-lg q-px-md">
            <q-btn-group class="col-6 q-ml-md no-borders">
              <q-btn
                class="q-pa-md menu-btn"
                @click="$router.replace('/dashboard')"
                color="secondary"
                glossy
                label="Dashboard"
              />
              <q-btn
                @click="$router.replace('/todos')"
                color="secondary"
                glossy
                label="Tasks"
                class="menu-btn"
              />
              <q-btn
                @click="$router.replace('/budget')"
                color="secondary"
                glossy
                label="Budget"
                class="menu-btn"
              />
              <q-btn
                @click="$router.replace('/transactions')"
                color="secondary"
                glossy
                label="Finance"
                class="menu-btn"
              />
              <q-btn
                @click="$router.replace('/calendar')"
                color="secondary"
                glossy
                label="Calendar"
                class="menu-btn"
              />
              <q-btn
                @click="$router.replace('/')"
                color="secondary"
                glossy
                label="Profile"
                class="menu-btn"
              />
            </q-btn-group>
            <!-- <q-btn-group class="col-6 q-ml-md no-borders"> -->
            <q-item class="col-5 q-ml-md">
              <q-item-label
                color="light"
                style="white-space:nowrap;font-size:1.6rem!important;color:#fff"
              >{{btnLabel}}</q-item-label>
            </q-item>
            <!-- </q-btn-group> -->
            <!-- <big class="text-secondary text-bold optional-md">{{btnLabel}}</big>
            <q-btn-group class="on-right no-borders">
              <q-btn color="primary" glossy raised class="q-pa-md" @click="$router.replace('/')">
                <i class="material-icons bg-purple">account_circle</i>
              </q-btn>
              <q-btn
                color="purple"
                glossy
                raised
                class="q-pa-md q-ml-sm"
                @click="$router.replace('/calendar')"
              >
                <i class="material-icons bg-purple">calendar_view_day</i>
              </q-btn>
            </q-btn-group>-->
          </q-toolbar>
        </q-header>
        <q-card class="no-borders full-width full-height">
          <q-card-section class="no-margins no-padding full-width">
            <router-view />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    btnLabel() {
      return moment().format("MMMM Do YYYY, h:mm a");
    }
  }
};
</script>
