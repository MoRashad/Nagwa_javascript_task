import express, { json, urlencoded } from "express";
import testData from "./TestData.json" assert { type: "json" };
const app = express()
const port = 3500

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json(testData.scoresList));

// Function to get a random element from an array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
const adjectives = testData.wordList.filter(word => word.pos === 'adjective');
const adverbs = testData.wordList.filter(word => word.pos === 'adverb');
const nouns = testData.wordList.filter(word => word.pos === 'noun');
const verbs = testData.wordList.filter(word => word.pos === 'verb');

app.get("/words", (req, res) => {
    try {
        const selectedWords = [
            getRandomElement(adjectives),
            getRandomElement(adverbs),
            getRandomElement(nouns),
            getRandomElement(verbs)
        ];

        while (selectedWords.length < 10) {
            const randomWord = getRandomElement(testData.wordList);
            if (!selectedWords.includes(randomWord)) {
                selectedWords.push(randomWord);
            }
        }

        res.status(200).json(selectedWords);
    } catch (error) {
        res.status(500).json(error.message);
    }

})
app.post("/rank", (req, res) => {
    const { finalScore } = req.body;
    if (!finalScore) return res.status(400).json({ "message": "final score is required" });
    try {
        let count = 0;
        testData.scoresList.forEach((score) => {
            if (score < finalScore) {
                count++;
            }
        });
        let scorePercentage = `${(count / testData.scoresList.length * 100).toFixed(2)}%`;
        res.status(200).json({ "score": scorePercentage })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))