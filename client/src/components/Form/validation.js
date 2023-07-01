
export default function validateForm(
    name, 
    hp, 
    attack, 
    defense, 
    spcatk,
    spcdef,
    speed,
    height,
    weight,
    image, 
    types
) {
    let errors = {};

    if (!name) {
        errors.name = "Name is required";
    } else if (name.length < 3) {
        errors.name = "This Name is too Short (min. 3 characters)";
    } else if (name.length > 40) {
        errors.name = "This Name is too Long (max. 40 characters)";
    };

    if (!hp) {
        errors.hp = "Stats are required";
    } else if (Number.isInteger(hp)) {
        errors.hp = "Stats must be Integer Numbers";
    } else if (hp <= 0) {
        errors.hp = "Stats cannot be Negative or equal to 0";
    } else if (hp > 300) {
        errors.hp = "This is Terrifying! No Pokémon have that Power"
    };

    if (!attack) {
        errors.attack = "Stats are required";
    } else if (Number.isInteger(attack)) {
        errors.attack = "Stats must be Integer Numbers";
    } else if (attack <= 0) {
        errors.attack = "Stats cannot be Negative or equal to 0";
    } else if (attack > 300) {
        errors.attack = "This is Terrifying! No Pokémon have that Power"
    };

    if (!defense) {
        errors.defense = "Stats are required";
    } else if (Number.isInteger(defense)) {
        errors.defense = "Stats must be Integer Numbers";
    } else if (defense <= 0) {
        errors.defense = "Stats cannot be Negative or equal to 0"
    } else if (defense > 300) {
        errors.defense = "This is Terrifying! No Pokémon have that Power"
    };

    if (!spcatk) {
        errors.spcatk = "Stats are required";
    } else if (Number.isInteger(spcatk)) {
        errors.spcatk = "Stats must be Integer Numbers";
    } else if (spcatk <= 0) {
        errors.spcatk = "Stats cannot be Negative or equal to 0"
    } else if (spcatk > 300) {
        errors.spcatk = "This is Terrifying! No Pokémon have that Power"
    };

    if (!spcdef) {
        errors.spcdef = "Stats are required";
    } else if (Number.isInteger(spcdef)) {
        errors.spcdef = "Stats must be Integer Numbers";
    } else if (spcdef <= 0) {
        errors.spcdef = "Stats cannot be Negative or equal to 0"
    } else if (spcdef > 300) {
        errors.spcdef = "This is Terrifying! No Pokémon have that Power"
    };

    if (!speed) {
        errors.speed = "Stats are required";
    } else if (Number.isInteger(speed)) {
        errors.speed = "Stats must be Integer Numbers";
    } else if (speed <= 0) {
        errors.speed = "Stats cannot be Negative or equal to 0"
    } else if (speed > 300) {
        errors.speed = "This is Terrifying! No Pokémon have that Power"
    };

    const numberHeight = parseFloat(height)
    if (!numberHeight) {
        errors.height = "Height are required";
    } else if (typeof numberHeight !== 'number') {
        errors.height = "Height must be Number";
    } else if (numberHeight <= 0) {
        errors.height = "Height cannot be Negative or exactly equal to 0"
    };

    const numberWeight = parseFloat(weight)
    if (!numberWeight) {
        errors.weight = "Weight are required";
    } else if (typeof numberWeight !== 'number') {
        errors.weight = "Weight must be Number";
    } else if (numberWeight <= 0) {
        errors.weight = "Weight cannot be Negative or exactly equal to 0"
    };

    if (!image) {
        errors.image = "The Photo is required";
    } else {
        const imageRegex = /\.(jpg|jpeg|png|gif)(\/.*)?$/i;
        if (!imageRegex.test(image)) {
          errors.image = "Please enter a Valid Image URL";
        }
    };

    if (types.length === 0) {
        errors.types = "Please select at least one Type.";
    } else if (types.length > 2) {
        errors.types = "Pokémon only have a max of 2 Types"
    };

    return errors
}
