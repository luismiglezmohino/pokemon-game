import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const indexrandom = Math.floor(Math.random() * pokemonsOptions.value.length);

    //console.log(indexrandom, pokemonsOptions.value);
    return pokemonsOptions.value[indexrandom];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;

      return {
        name: pokemon.name,
        id: +id,
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howmay: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.splice(0, howmay);
    pokemons.value = pokemons.value.slice(howmay);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: {
          y: 0.6,
        },
      });
      return;
    } else {
      gameStatus.value = GameStatus.Lost;
    }
  };

  onMounted(async () => {
    console.log('onMounted');
    await new Promise((r) => setTimeout(r, 1000));
    pokemons.value = await getPokemons();
    //console.log(pokemons);
    getNextRound();
    console.log(pokemons, pokemonsOptions);
    console.log('finish onMounted');
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    //Methods
    getNextRound: getNextRound,
    checkAnswer,
  };
};
