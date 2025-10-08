import { mount } from '@vue/test-utils';
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';

describe('<PokemonPicture />', () => {
  test('should render the hidden imagen when showPokemon props is false', () => {
    const pokemonidentificador = 25;
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: pokemonidentificador, showPokemon: false },
    });

    const urlimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonidentificador}.svg`;
    //console.log(wrapper.html());
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe(urlimage);
    expect(image.attributes()).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: urlimage,
      }),
    );
  });

  test('should render the hidden imagen when showPokemon props is true', () => {
    const pokemonidentificador = 25;
    const wrapper = mount(PokemonPicture, {
      props: { pokemonId: pokemonidentificador, showPokemon: true },
    });

    const urlimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonidentificador}.svg`;
    //console.log(wrapper.html());
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe(urlimage);
    expect(image.attributes()).toEqual(
      expect.objectContaining({
        class: 'fade-in h-[200px]',
        src: urlimage,
      }),
    );
  });
});
