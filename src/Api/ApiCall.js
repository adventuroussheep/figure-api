import axios from 'axios';

export const baseUrl = "https://hacker-news.firebaseio.com/v0/";
export const newsUrl = `${baseUrl}newstories.json`;
export const storyUrl = `${baseUrl}item/`

export let ApiCall = async (storyId) => {
    // const result = await axios.get(`${storyUrl +storyId}.json`);
    const result = await axios.get(newsUrl);
    console.log(result.data);
    return (result.data)
}