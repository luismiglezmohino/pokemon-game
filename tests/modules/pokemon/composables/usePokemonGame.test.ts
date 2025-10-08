import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonlist } from '../../../data/fake-pokemons';
import confetti from 'canvas-confetti';

const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonlist,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', async () => {
  test('should initialize with the correct defaults values', async () => {
    //const { checkAnswer, gameStatus, getNextRound, isLoading, pokemonsOptions, randomPokemon } = usePokemonGame();

    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonsOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    //No es necesario por que se ha creado arriba un mock, para que carge los dos datos
    await new Promise((r) => setTimeout(r, 3000));
    await flushPromises();

    console.log(results.isLoading.value);
    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonsOptions.value.length).toEqual(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correcty handle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise((r) => setTimeout(r, 3000));
    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    //estimulo
    results.getNextRound(5);
    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonsOptions.value).toHaveLength(5);
  });

  test('should correcty handle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise((r) => setTimeout(r, 3000));
    await flushPromises();

    const firstOptions = [...results.pokemonsOptions.value].map((p) => p.name);

    //estimulo
    results.getNextRound();
    const secondOptions = [...results.pokemonsOptions.value];
    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name);
    });
  });

  test('should correcty handle a incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise((r) => setTimeout(r, 3000));
    await flushPromises();

    const { checkAnswer, gameStatus } = results;
    expect(gameStatus.value).toBe(GameStatus.Playing);
    checkAnswer(10000000000); //id no existe
    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correcty handle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise((r) => setTimeout(r, 3000));
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;
    expect(gameStatus.value).toBe(GameStatus.Playing);
    checkAnswer(randomPokemon.value.id);
    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: {
        y: 0.6,
      },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
