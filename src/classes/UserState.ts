import {BookInfo} from "./BookInfo";

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
     * @param bookId
     * @constructor
     */
    public static GetBookProgressLineNo(bookId: string | undefined): number {
        if (!bookId) {
            console.error('book name cannot be undefined!')
            return 0;
        }

        let num = UserState.storage.getItem(bookKey + bookId);
        if (num) {
            return parseInt(num);
        }
        return 0;
    }


    /**
     * returns progress in percentage
     *
     * @constructor
     * @param book
     */
    public static GetBookProgressPercentage(book: BookInfo): string {
        if (!book) {
            return '0%';
        }
        const lineRead = UserState.GetBookProgressLineNo(book.id)
        const progress = lineRead * 100 / book.lineCnt
        return Math.min(progress, 100).toFixed(2) + '%'
    }


    /**
     * resets the current progress by the user for the book.
     *
     * @param bookId
     * @constructor
     */
    public static ResetBookProgress(bookId: string | undefined): void {
        if (!bookId) {
            console.error('book name cannot be undefined!')
            return;
        }
        UserState.storage.setItem(bookKey + bookId, '0');
    }

    /**
     * saves the line number that needs to be read next for the book.
     *
     * @param bookId
     * @param line
     * @constructor
     */
    public static SaveBookProgress(bookId: string | undefined, line: number): void {
        if (!bookId) {
            console.error('book name cannot be undefined!')
            return;
        }
        UserState.storage.setItem(bookKey + bookId, String(line));
    }
}

