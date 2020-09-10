<template>
  <div class="q-py-sm breadcrumbs">
    <q-breadcrumbs
      separator=" > "
      class="text-primary"
      active-color="white"
      style="font-size: 1rem"
    >
      <q-breadcrumbs-el label="Tasks" icon="home" />
    </q-breadcrumbs>
    <q-btn-group class="sub-btn-b">
      <router-link to="/detail/tasks/add">
        <q-btn label="Create Task"></q-btn>
      </router-link>
    </q-btn-group>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  width: 100%;
  height: 2%;
  background: #5499c7;
  color: #333;
}

.sub-btn-b {
  background: #ddd !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-right: 44px;
  float: right;
  margin-top: -3%;
  margin-right: 3%;
  color: #333 !important;
  white-space: nowrap;

  .q-btn {
    //width: 120px !important;
    border-right: 1px solid #222;
    padding-left: 14px;
    padding-right: 14px;
  }
  .q-btn:last-child {
    //width: 120px !important;
    border-right: none !important;
  }
}
</style>