import {BookInfo} from "./BookInfo";

const splitByLines = (text: string): Array<string> => {
    return text.split('\n').filter((t: string) => t !== '')
}

/**
 * key for localStorage to retrieve the list of local book (user's custom books) names
 */
const localBookList = 'localBookList';

export class BookRepository {
    private static storage = localStorage;

    /**
     * return combined book infos from the server and local storage
     * @constructor
     */
    public static async GetBookInfos(): Promise<Array<BookInfo>> {
        const localBooks = BookRepository.GetLocalBookNames();
        const localInfos = localBooks.map(name => {
            return new BookInfo(name, name, true, "1.jpg", "", 200)
        })

        const remoteBooks = await fetch('/books/list.json')
            .then(res => res.json())
            .then(data => data.books)
        return [...remoteBooks, ...localInfos];
    }


    /**
     * return book data strings.
     * @constructor
     */
    public static async GetBookData(id: string): Promise<Array<string>> {
        const list = BookRepository.GetLocalBookNames();
        if (list.includes(id)) {
            return BookRepository.GetLocalBookData(id);
        }

        return await fetch(`/books/${id}.json`)
            .then(res => res.json())
            .then(data => splitByLines(data.text))
    }


    /**
     * Save user's custom book in local storage.
     *
     * @param name is treated as id
     * @param text
     * @constructor
     */
    public static CreateLocalBook(name: string, text: string) {
        let filteredText = text.replace('\n\n', '\n');
        filteredText = filteredText.replace('. ', '. \n');
        filteredText = filteredText.replace('; ', '; \n');
        filteredText = filteredText.replace(': ', ': \n');
        this.storage.setItem(name, filteredText);
        this.storage.setItem(name + 'LineCnt', String(splitByLines(filteredText).length));
        const list = BookRepository.GetLocalBookNames();
        list.push(name);
        const dupRemovedlist = Array.from(new Set(list));
        this.storage.setItem(localBookList, JSON.stringify(dupRemovedlist));
    }

    /**
     * returns text data of the local book
     * @constructor
     * @private
     */
    private static GetLocalBookData(id: string): Array<string> {
        let data = this.storage.getItem(id)
        if (!data) {
            console.error('unable to retrieve local book data');
            return [];
        }
        return splitByLines(data);
    }

    /**
     * returns a list of custom books of the user.
     * @constructor
     * @private
     */
    private static GetLocalBookNames(): Array<string> {
        const res = this.storage.getItem(localBookList);
        let list: Array<string> = [];
        try {
            if (res) {
                list = JSON.parse(res) as Array<string>;
            }
        } catch (e) {
            console.error(e)
        }
        return list;
    }
}

