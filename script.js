class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.frequency = 0;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, frequency) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.frequency = frequency;
  }

  search(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node;
  }
}

function calculateWordFrequencies(corpus) {
  let wordFrequencies = {};
  corpus.forEach((word) => {
    wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
  });
  return wordFrequencies;
}

function suggestCompletions(trie, prefix) {
  let node = trie.search(prefix);
  if (!node) {
    return [];
  }

  let suggestions = [];

  function traverse(node, currentPrefix) {
    if (node.isEndOfWord) {
      suggestions.push({ word: currentPrefix, frequency: node.frequency });
    }

    for (let char in node.children) {
      traverse(node.children[char], currentPrefix + char);
    }
  }

  traverse(node, prefix);

  suggestions.sort((a, b) => {
    if (a.word === prefix) return -1; // Move the current prefix to the top
    if (b.word === prefix) return 1;
    return b.frequency - a.frequency;
  });

  return suggestions.map((item) => item.word);
}

let userHistory = {};

function updateUserHistory(user, word) {
  userHistory[user] = userHistory[user] || [];
  userHistory[user].push(word);
}

// Include Trie and functions from previous steps

let trie = new Trie();
let corpusData = [
  "hello",
  "hi",
  "how are you",
  "hello world",
  "hi there",
  "how do you do",
  "programming",
  "javascript",
  "python",
  "machine learning",
  "deep learning",
  "natural language processing",
  "artificial intelligence",
  "web development",
  "computer science",
  "data science",
  "coding",
  "code",
  "developer",
  "programming language",
  "algorithm",
  "data structure",
  "software",
  "open source",
  "version control",
  "git",
  "github",
  "html",
  "css",
  "javascript framework",
  "react",
  "vue",
  "angular",
  "node.js",
  "express",
  "mongodb",
  "sql",
  "database",
  "frontend",
  "backend",
  "full stack",
  "cloud computing",
  "aws",
  "azure",
  "google cloud",
  "serverless",
  "containerization",
  "docker",
  "kubernetes",
  "devops",
  "continuous integration",
  "continuous deployment",
  "agile",
  "scrum",
  "kanban",
  "product owner",
  "sprint",
  "user story",
  "retrospective",
  "bug",
  "feature",
  "release",
  "deployment",
  "testing",
  "unit test",
  "integration test",
  "end-to-end test",
  "automation",
  "framework",
  "library",
  "code review",
  "pull request",
  "merge",
  "conflict resolution",
  "documentation",
  "readme",
  "license",
  "contributors",
  "community",
  "opensource",
  "contribution",
  "hackathon",
  "meetup",
  "conference",
  "workshop",
  "tutorial",
  "online course",
  "certification",
  "degree",
  "job",
  "career",
  "resume",
  "interview",
  "salary negotiation",
  "remote work",
  "freelancing",
  "startups",
  "entrepreneurship",
  "innovation",
  "technology",
  "future",
  "progress",
  "society",
  "environment",
  "global warming",
  "renewable energy",
  "sustainability",
  "green technology",
  "climate change",
  "pandemic",
  "technology",
  "innovation",
  "automation",
  "software",
  "hardware",
  "networking",
  "data",
  "analytics",
  "cloud",
  "security",
  "cybersecurity",
  "blockchain",
  "artificial intelligence",
  "machine learning",
  "robotics",
  "internet of things",
  "virtual reality",
  "augmented reality",
  "big data",
  "smart manufacturing",
  "industry 4.0",
  "supply chain",
  "logistics",
  "ecommerce",
  "fintech",
  "telecommunications",
  "5G",
  "biotechnology",
  "pharmaceuticals",
  "healthcare",
  "medical devices",
  "energy",
  "renewable energy",
  "sustainability",
  "green technology",
  "manufacturing",
  "automation",
  "robotics",
  "aerospace",
  "defense",
  "automotive",
  "construction",
  "architecture",
  "engineering",
  "civil engineering",
  "mechanical engineering",
  "electrical engineering",
  "chemical engineering",
  "petroleum engineering",
  "environmental engineering",
  "materials science",
  "nanotechnology",
  "agriculture",
  "food industry",
  "textile industry",
  "retail",
  "marketing",
  "advertising",
  "media",
  "entertainment",
  "gaming",
  "finance",
  "banking",
  "investment",
  "insurance",
  "real estate",
  "consulting",
  "professional services",
  "human resources",
  "education",
  "training",
  "research",
  "development",
  "startups",
  "entrepreneurship",
  "venture capital",
  "angel investing",
  "business",
  "strategy",
  "management",
  "leadership",
  "innovation",
  "productivity",
  "quality assurance",
  "customer service",
  "outsourcing",
  "offshoring",
  "nearshoring",
  "globalization",
  "international trade",
  "regulation",
  "compliance",
  "standards",
  "certification",
  "intellectual property",
  "patents",
  "trademarks",
  "copyright",
  "supply chain",
  "procurement",
  "project management",
  "agile",
  "scrum",
  "kanban",
  "lean",
  "six sigma",
  "risk management",
  "quality management",
  "safety",
  "occupational health",
  "environmental sustainability",
  "apple",
  "orange",
  "banana",
  "strawberry",
  "pineapple",
  "mango",
  "kiwi",
  "watermelon",
  "grape",
  "blueberry",
  "raspberry",
  "blackberry",
  "peach",
  "plum",
  "apricot",
  "cherry",
  "lemon",
  "lime",
  "avocado",
  "coconut",
  "grapefruit",
  "pomegranate",
  "melon",
  "fig",
  "papaya",
  "cranberry",
  "cantaloupe",
  "date",
  "elderberry",
  "gooseberry",
  "guava",
  "passionfruit",
  "pear",
  "persimmon",
  "nectarine",
  "olive",
  "lychee",
  "tangerine",
  "tomato",
  "cucumber",
  "carrot",
  "lettuce",
  "spinach",
  "kale",
  "broccoli",
  "cauliflower",
  "cabbage",
  "radish",
  "turnip",
  "potato",
  "sweet potato",
  "yam",
  "squash",
  "zucchini",
  "pumpkin",
  "eggplant",
  "bell pepper",
  "chili pepper",
  "onion",
  "garlic",
  "ginger",
  "shallot",
  "leek",
  "scallion",
  "asparagus",
  "green bean",
  "pea",
  "lentil",
  "chickpea",
  "black bean",
  "kidney bean",
  "pinto bean",
  "navy bean",
  "soybean",
  "mushroom",
  "portobello",
  "shiitake",
  "oyster mushroom",
  "button mushroom",
  "brown rice",
  "white rice",
  "quinoa",
  "couscous",
  "bulgur",
  "barley",
  "farro",
  "oats",
  "wheat",
  "rye",
  "corn",
  "millet",
  "spelt",
  "teff",
  "buckwheat",
  "chia seeds",
  "flaxseed",
  "hemp seeds",
  "sesame seeds",
  "sunflower seeds",
];

// Calculate word frequencies
let wordFrequencies = calculateWordFrequencies(corpusData);

// Build the trie
corpusData.forEach((word) => {
  trie.insert(word, wordFrequencies[word]);
});

// Initialize suggestions with default values
let initialSuggestions = suggestCompletions(trie, "");

// Display initial suggestions in the user interface
let suggestionsList = document.getElementById("suggestions");
initialSuggestions.slice(0, 10).forEach((suggestion) => {
  let listItem = document.createElement("li");
  listItem.textContent = suggestion;
  suggestionsList.appendChild(listItem);
});

function onInputChange(event) {
  let inputField = document.getElementById("inputField");
  let prefix = inputField.value.toLowerCase();
  let suggestions = suggestCompletions(trie, prefix);

  // Display only the top 10 suggestions in the user interface
  suggestionsList.innerHTML = "";
  let cnt = 0;
  suggestions.forEach((suggestion) => {
    cnt++;
    if (cnt > 10) return;
    let listItem = document.createElement("li");
    listItem.textContent = suggestion;
    suggestionsList.appendChild(listItem);
  });
}

let inputField = document.getElementById("inputField");
inputField.addEventListener("input", onInputChange);

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  //searchButton.style.background = "yellow";
  let inputField = document.getElementById("inputField");
  let prefix = inputField.value.toLowerCase();
  if (!corpusData.includes(prefix)) {
    // Add the word to the corpus data
    corpusData.push(prefix);

    // Update the trie and word frequencies
    trie.insert(prefix, 1); // Assuming frequency is 1 for the newly added word
    wordFrequencies[prefix] = 1; // Assuming frequency is 1 for the newly added word
  }
});
