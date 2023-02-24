import { equal, throws } from 'assert';
import { fibonacci } from '../src/index';

describe('Typescript usage suite', function () {
    it('fibonacci(1) should return 1', async () => {
        equal(fibonacci(1), 1);
    });
    it('fibonacci(2) should return 1', async () => {
        equal(fibonacci(2), 1);
    });
    it('fibonacci(3) should return 2', async () => {
        equal(fibonacci(3), 2);
    });
    it('fibonacci(4) should return 3', async () => {
        equal(fibonacci(4), 3);
    });
});