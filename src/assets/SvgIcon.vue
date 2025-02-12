<script>
import { iconsSvgs } from "@/assets/iconsSvgs";

export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "24px",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    iconSvg() {
      const svg = iconsSvgs[this.iconName];
      if (!svg) return "";

      // Insertar dinámicamente atributos en el SVG
      return svg.replace(
        /<svg([^>]*)>/,
        `<svg$1 width="${this.size}" height="${this.size}" fill="${this.color}">`
      );
    },
  },
};
</script>

<template>
  <div v-html="iconSvg"></div>
</template>

<style scoped>
div {
  display: inline-block;
  vertical-align: middle;
}
</style>
