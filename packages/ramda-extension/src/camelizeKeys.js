import { T, cond, identity, juxt, map, o, head, last } from 'ramda';
import mapKeysAndValues from './mapKeysAndValues';
import toCamelCase from './toCamelCase';
import isNotNilObject from './isNotNilObject';
import isArray from './isArray';
import isFunction from './isFunction';

// Must be written as arrow `x => camelizeKeys(x)` due to recursion
// prettier-ignore
const camelizeObj = mapKeysAndValues(
	juxt([
		o(toCamelCase, head),
		o((x) => camelizeKeys(x), last),
	])
);

const camelizeArray = map((x) => camelizeKeys(x));

/**
 * Recursively camelize all keys within an object or array
 *
 * @func
 * @category Object
 *
 * @param {any} x Object to transform
 * @return {any}
 * @example
 *
 *      camelizeKeys({
 *          'co-obj': { co_string: 'foo' },
 *          'co-array': [0, null, { 'f-f': 'ff' }],
 *          'co-number': 1,
 *          'co-string': '1',
 *          'co-fn': head,
 *      });
 *
 *      // {
 *      //     coArray: [
 *      //         0,
 *      //         null,
 *      //         {
 *      //             fF: 'ff'
 *      //         }
 *      //     ],
 *      //     coFn: [Function],
 *      //     coNumber: 1,
 *      //     coObj: {
 *      //         coString: 'foo'
 *      //     },
 *      //     coString: '1'
 *      // }
 *
 */
// prettier-ignore
const camelizeKeys = cond([
	[isArray, camelizeArray],
	[isFunction, identity],
	[isNotNilObject, camelizeObj],
	[T, identity],
]);

export default camelizeKeys;
