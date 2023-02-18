import {Random} from "./Random";

test('choose an item from a set', () => {
    const set = new Set([1, 2, 3, 4]);
    expect(set.has(Random.choseOneFrom(set))).toBe(true);
});

test('choose 3 items from a set', () => {
    const set = new Set([1, 2, 3, 4, 5, 6]);
    const originalSize = set.size;
    const chooseCnt = 2;
    const chosen = Random.chooseManyFrom(set, chooseCnt);

    //don't mutate input set
    expect(set.size).toBe(originalSize);
    expect(chosen.size).toBe(chooseCnt);
    for (const entry of Array.from(chosen)) {
        expect(set.has(entry)).toBe(true);
    }
});

test('choosing more items from a set returns all items', () => {
    const set = new Set([1, 2]);
    const originalSize = set.size;
    const chosen = Random.chooseManyFrom(set, 5);

    //don't mutate input set
    expect(set.size).toBe(originalSize);
    expect(chosen.size).toBe(originalSize);
    for (const entry of Array.from(chosen)) {
        expect(set.has(entry)).toBe(true);
    }
});