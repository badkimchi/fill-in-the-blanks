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

            //prevent duplicate
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
        const randomIdx = Math.floor(Math.random() * itemsArr.length);
        return itemsArr[randomIdx];
    }

    /**
     * Returns the array with its items re-ordered (The Fisher–Yates shuffle)
     *
     * @param items array that will be shuffled
     */
    static shuffle(items: Array<any>): Array<any> {
        let currentIndex = items.length, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [items[currentIndex], items[randomIndex]] = [
                items[randomIndex], items[currentIndex]];
        }
        return items;
    }
}