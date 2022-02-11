<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  }
};
</script>

<template>
  <div :class="amount > 0 ? 'text-primary' : 'text-danger'">{{ amount | decimal }}</div>
</template>
