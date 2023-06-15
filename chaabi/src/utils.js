export const createPrompt = () => {
    const chars = ["a", "s", "d", "f", "j", "k", "l", ";"];
    const words = [
        "salad", "lad", "sad", "ask", "add", "fall", "fad", "ass", "lass", "jaffa",
        "flask", "ska", "ja;a", "lads", "fads", "jafa;", "dads", "ad", "fj;;d", "ja;s",
        "alfa", "ja;", "ja;s", ";ask", "all", "sa;l", "flak", "ja;s", "la;ks", "alfs",
        ";alls", "flasks", "alaska", "alf", "lads", "salads", "jaffas", "slal",
        "fads", "afa;", "ja;s", "ja;s", "lass", "falls", "fla;", "alls", ";ad", "add",
        "flasks", "laks", "ad", "afa", "da;", "ja;", "da;;", "sad", "fad", "da;s",
        "ja;s", ";all", "la;a", "sla;", "ja;s", "lads", "flak", ";ask", "lass", "aja;",
        "da;s", "sla;", ";ask", "flak", "da;s", "dada", "flak", "sla;", "ja;s", "lads",
        "flasks", "ja;", "add", "da;", "sla;", "ja;s", "ja;s", "alls", "slal;;", "add",
        "lads", "salaa;", "sla;", "ad", "flak", "fall", "afa;", "ja;", "jaffa", ";ask",
        "lads", "ja;;"
    ]
    
    let prompt = "";

    for (let i = 0; i < 5; i++) {
        let word = "";
        const randomWord = words[Math.floor(Math.random() * words.length)];
        word = word + randomWord;
        prompt = prompt + word + " ";
    }

    prompt = prompt.trim();
    console.log(prompt)
    return prompt;
}