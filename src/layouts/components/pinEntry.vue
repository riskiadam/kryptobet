<script>
export default {
  props: {
    isShown: {
      type: Boolean,
    },
    numbers: {
      type: Array,
    },
  },
  data: () => {
    return {
      pin: "",
    };
  },
  methods: {
    doInput(number) {
      if (this.pin.length < 4) this.pin += number;
    },
    clear() {
      this.pin = "";
    },
    submit() {
      this.showLocal = false;
    },
  },
  computed: {
    showLocal: {
      get() {
        return this.isShown;
      },
      set(val) {
        if (!val) {
          this.$emit("submitPin", this.pin);
          this.clear();
        }
      },
    },
  },
};
</script>

<template>
  <b-modal
    size="sm"
    centered
    v-model="showLocal"
    body-bg-variant="dark"
    class="pin-modal"
    hide-footer
    hide-header
    :no-close-on-backdrop="true">

    <b-row class="mb-3">
      <b-col sm="12">
        <b-input id="pin-input" type="password" class="text-center form-control" readonly v-model="pin"></b-input>
      </b-col>
    </b-row>

    <b-row no-gutters id="pin-container">
      <b-col sm="4" v-for="(num, index) in numbers" :key="index" class="text-center mb-2">
        <b-btn class="button" pill @click="doInput(num)">{{ num }}</b-btn>
      </b-col>
      <b-col sm="4" class="text-center">
        <b-btn variant="primary" pill @click="clear()">Clear</b-btn>
      </b-col>
      <b-col sm="4" class="text-center">
        <b-btn variant="success" pill @click="submit()">Submit</b-btn>
      </b-col>      
    </b-row>
    
  </b-modal>
</template>
