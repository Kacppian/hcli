declare var require:(moduleId:string) => any;
const Mercury = require("@postlight/mercury-parser");

class Article {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getContent() {
        const article = await Mercury.parse(this.url, { contentType: 'markdown' });
        return article.content;
    }
}

export default Article;
