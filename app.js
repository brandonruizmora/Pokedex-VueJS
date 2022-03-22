Vue.createApp({
    data() {
        return {
            image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            name: 'pikachu',
            bg: 'rounded app__bg-electric',
            types: [{name: 'electric'}],
            stats: [{ name: 'hp', base_stat: '--size: calc( 35 / 250 )', value: 35 },
            { name: 'attack', base_stat: '--size: calc( 55 / 250 )', value: 55 },
            { name: 'defense', base_stat: '--size: calc( 40 / 250 )', value: 40 },
            { name: 'special-attack', base_stat: '--size: calc( 50 / 250 )', value: 50 },
            { name: 'special-defense', base_stat: '--size: calc( 50 / 250 )', value: 50 },
            { name: 'speed', base_stat: '--size: calc( 90 / 250 )', value: 90 }],
            moves: [{name: 'mega-punch'}, {name: 'machine'}]
        }
    },
    methods: {
        async searchPokemon() {
            const pokemon = document.getElementById('pokemonInput').value;
            console.log(pokemon)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
            const result = await response.json();
            console.log(result);
            const typesFixed = result.types.map(type => {
                return {
                    name: type.type.name,
                }
            });
            const statsFixed = result.stats.map(stat => {
                return {
                    name: stat.stat.name,
                    base_stat: `--size: calc( ${stat.base_stat} / 250 )`,
                    value: stat.base_stat
                }
            });
            const movesFixed = result.moves.map(move => {
                return {
                    name: move.move.name,
                }
            });
            this.image = result.sprites.front_default;
            this.name = result.name;
            this.bg = `rounded app__bg-${result.types[0].type.name}`;
            this.types = typesFixed;
            this.stats = statsFixed;
            this.moves = movesFixed;
        }
    }
}).mount('#app');