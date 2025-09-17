<template>
  <section>
    <img v-if="!showPokemon" :src="pokemonImage" alt="" class="brightness-0 h-[200px]" />
    <img v-else :src="pokemonImage" alt="" class="fade-in h-[200px]" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  pokemonId: number;
  showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
});

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style lang="css" scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
</style>
