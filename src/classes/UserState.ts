const bookKey = 'book_';
const blanksKey = 'blanks_no';

export class UserState {
    private static storage = localStorage;

    /**
     * returns a number of blanks per page that is set as user preference.
     *
     * @constructor
     */
    public static GetBlanksCnt(): number {
        let num = UserState.storage.getItem(blanksKey);
        if (num) {
            return parseInt(num);
        }
        return 3;
    }

    /**
     * sets a number of blanks per page that is set as user preference.
     *
     * @param num
     * @constructor
     */
    public static SaveBlanksCnt(num: number): void {
        UserState.storage.setItem(blanksKey, String(num));
    }

    /**
     * returns a line number that needs to be read next.
     *
     * @param bookName
     * @constructor
     */
    public static GetBookProgress(bookName: string | undefined): number {
        if (!bookName) {
            console.error('book name cannot be undefined!')
            return 0;
        }

        let num = UserState.storage.getItem(bookKey + bookName);
        if (num) {
            return parseInt(num);
        }
        return 0;
    }


    /**
     * resets the current progress by the user for the book.
     *
     * @param bookName
     * @constructor
     */
    public static ResetBookProgress(bookName: string | undefined): void {
        if (!bookName) {
            console.error('book name cannot be undefined!')
            return;
        }
        UserState.storage.setItem(bookKey + bookName, '0');
    }

    /**
     * saves the line number that needs to be read next for the book.
     *
     * @param bookName
     * @param line
     * @constructor
     */
    public static SaveBookProgress(bookName: string | undefined, line: number): void {
        if (!bookName) {
            console.error('book name cannot be undefined!')
            return;
        }
        UserState.storage.setItem(bookKey + bookName, String(line));
    }
}

