<template>
  <section
    v-if="isLoading || randomPokemon?.id == null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl mg-5">¿Quién es este Pokémon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus != GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nuevo?
      </button>
    </div>
    <!-- Pokemon Picture-->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus != GameStatus.Playing"
    ></PokemonPicture>
    <!--Pokemon Options-->
    <PokemonOptions
      :options="options"
      @selected-options="checkAnswer"
      :block-selection="gameStatus != GameStatus.Playing"
      :correct-answer="randomPokemon.id"
    ></PokemonOptions>
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonsOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame();
const onSelectedOption = (value: number) => {
  console.log({ value });
};
</script>
