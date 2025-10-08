import { mount } from '@vue/test-utils';
import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import type { Mock } from 'vitest';
import { GameStatus } from '@/modules/pokemon/interfaces';

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
  {
    name: 'bulbasaur',
    id: 1,
  },
  {
    name: 'ivysaur',
    id: 2,
  },
  {
    name: 'venusaur',

    id: 3,
  },
  {
    name: 'charmander',
    id: 4,
  },
];

describe('<Pokemon Game/>', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: undefined,
      isLoading: true,
      gameStatus: GameStatus.Playing,
      pokemonsOptions: [],
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    expect(wrapper.get('h1').text()).toBe('Espere por favor');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl']);

    expect(wrapper.get('h3').text()).toBe('Cargando pokemons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
  });

  test('should render <PokemonPicture /> and <PokemonOptions/>', () => {
    (usePokemonGame as Mock).mockReturnValue({
      randomPokemon: pokemonsOptions.at(0),
      isLoading: false,
      gameStatus: GameStatus.Playing,
      pokemonsOptions: pokemonsOptions,
      checkAnswer: vi.fn(),
      getNextRound: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    console.log(wrapper.html());
    //expect(wrapper.get('h1').text()).toBe('¿Quién es este Pokémon?');
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    );

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
    //expect(wrapper.findAll('cap'))
    console.log(buttons.length);
    expect(buttons).length(4);
    buttons.forEach((button) => {
      expect(pokemonsOptions.map((p) => p.name)).toContain(button.text());
    });
  });
});
