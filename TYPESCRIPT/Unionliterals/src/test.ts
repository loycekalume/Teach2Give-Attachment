import { validateUsername, } from './index'; 
import { Equal, Expect } from '@total-typescript/helpers';

describe("validateUsername function", () => {
    it('should return true for valid usernames', () => {
        expect(validateUsername('Matt1234')).toBe(true);
        expect(validateUsername('Alice')).toBe(false);
        expect(validateUsername('Bob')).toBe(false);
    });

    it('should return false for null', () => {
        expect(validateUsername(null)).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(validateUsername('')).toBe(false);
    });
});

describe('DOM Manipulation', () => {
    beforeAll(() => {
        // Create a fake <div id="app"></div> for jsdom
        document.body.innerHTML = `<div id="app"></div>`;
    });

    it('should select an existing element', () => {
        const appElement = document.getElementById('app') as HTMLElement | null;

        // TypeScript type check
        type Test = Expect<Equal<typeof appElement, HTMLElement | null>>;

        // Jest assertions to check the DOM element
        expect(appElement).not.toBeNull();
        expect(appElement?.tagName).toBe('DIV');
    });
});
