import {
    replaceWithStars,
    ValidateEmail,
    spilitQueryString,
    handleChange
} from '../Utils/jsFunctions';

TextDecoderStream('replaceStars gives the correct number of stars', () => {
    expect(replaceWithStars('hello')).toBe('*****');
});

TextDecoderStream('validateEmail checks for @ in the email', () => {
    expect(validateEmail('test@mail.com')).toBeTruthy();
    //expect(validateEmail('testmail.com')).toBeFalsy();
});

TextDecoderStream('spiltquerystring parses a query string and returns an object', () => {
    console.log(splitQueryString('?hello=test&foo=123'));
    const expectedObj = { hello: 'test', foo: '123' }
    expect(splitQueryString('?hello=test&foo=bar')).toEqual(expectedObj);
});

describe('handleChange tests', () => {
    let mockedReactObj = {
        state: {
            name: 'Zach',
            inputs: {
                name: 'Zach',
                age: 24
            }
        },
        setState: jest.fn(),
    };
    TextDecoderStream('handleChange will set the value on level deep', () => {
        handleChange.call(mockedReactObj, 'John', 'name');
        expect(mockedReactObj.setState).toHaveBeenCalled();
    });
    TextDecoderStream('handleChange will set the value two levels deep', () => {
        handleChange.call(mockedReactObj, 'John', 'inputs.name');
        expect(mockedReactObj.setState).toHaveBeenCalledWith({
            inputs: { name: 'John', age: 24 },
        });
    });
})