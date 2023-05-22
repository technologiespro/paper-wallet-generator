<script>
import { layoutComputed } from "@/state/helpers";
import Horizontal from "./horizontal";

/**
 * Main layout
 */
export default {
  components: {
    Horizontal,
  },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed,
  },
};
</script>

<template>
  <div>
    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
