<template>
  <div ref="tick" class="tick">
    <div data-repeat="true" aria-hidden="true">
      <span data-view="flip"></span>
    </div>
  </div>
</template>

<script>
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

export default {
  name: "Flip",
  props: ["value"],
  watch: {
    value(newValue) {
      this._tick.value = newValue;      
    }
  },
  mounted() {
    this._tick = Tick.DOM.create(this.$refs.tick, {
      value: this.$options.propsData.value
    });
  },
  destroyed() {
    Tick.DOM.destroy(this.$refs.tick);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tick {
  font-size: 3em;
}
</style>
