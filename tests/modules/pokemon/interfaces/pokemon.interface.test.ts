import type { Pokemon } from '@/modules/pokemon/interfaces';

describe('Pokemon interface', () => {
  const pokemon: Pokemon = { id: 1, name: 'bulbasaur' };
  test('should have and id property of type number', () => {
    expect(pokemon.id).toEqual(expect.any(Number));
  });
  test('should have a name property of type string', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });
});
