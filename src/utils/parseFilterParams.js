const parseValue = value => {
    const isString = typeof value === 'string';

    if (!isString) return;

    const parsedValue = parseInt(value);
    if(Number.isNaN(parsedValue)) return;

    return parsedValue;

};

export const parseFilterParams = ({isFavourite}) => {
    const parsedIsFavourite = parseValue(isFavourite);

    return {
        isFavourite: parsedIsFavourite,
    };
};
