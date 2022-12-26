import { nouns } from "./data/nouns";
import { adjectives } from "./data/adjectives";

function cpaitalize(str: string): string {
    return str[0].toUpperCase() + str.substring(1)
}

function generateUsername() {
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let username;

    username = cpaitalize(adjective) + cpaitalize(noun)

    return username;
}

export default generateUsername;