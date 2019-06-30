import axios, { AxiosResponse } from 'axios';

interface Story {
    by: string,
    descendants: number,
    id: number,
    kids: [number],
    score: number,
    time: Date,
    title: string,
    type: string,
    url: string
}

class Hackernews {
    limit: number;
    order: string;
    rootURL: string;

    constructor(limit: number = 50, order: string = "new") {
        this.limit = limit;
        this.order = order;
        this.rootURL = `https://hacker-news.firebaseio.com/v0`;
    }

    async getStories() {
        const storyIdObjects = await axios.get(`${this.rootURL}/${this.order}stories.json?print=pretty`);
        const promises = <AxiosResponse<Story>[]>storyIdObjects.data.map((sid: string) => axios.get(`${this.rootURL}/item/${sid}.json`));
        const stories = await Promise.all(promises);
        return stories.map((story: AxiosResponse<Story>) => story.data);
    }
}

export default Hackernews;
