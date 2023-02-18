export class Random {
    /**
     * Returns a random set of items from the given pool.
     *
     * @param items the pool of items to choose from
     * @param cnt the number of items to choose
     */
    static chooseManyFrom(items: Set<any>, cnt: number): Set<any> {
        cnt = Math.min(items.size, cnt);
        const set = new Set(items);
        const chosen: Set<any> = new Set<any>();
        while (cnt > 0) {
            const item = Random.choseOneFrom(set);
            chosen.add(item);
            set.delete(item);
            cnt--;
        }
        return chosen;
    }

    /**
     * Returns a random item from a set
     *
     * @param items the pool of items to choose from
     */
    static choseOneFrom(items: Set<any>): any {
        if (items.size === 0) {
            throw Error('cannot choose item from an empty set!')
        }
        const itemsArr: Array<any> = Array.from(items);
        return itemsArr[Math.floor(Math.random() * itemsArr.length)];
    }
}