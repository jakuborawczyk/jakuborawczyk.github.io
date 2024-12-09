// Hämta elementen från DOM
const jokeButton = document.getElementById("get-joke");
const jokeOutput = document.getElementById("joke-output");
const funnyImage = document.getElementById("funny-image");
const rickrollAudio = document.getElementById("rickroll-audio");
const volumeControl = document.getElementById("volume-control");

// När användaren klickar på knappen för att få ett skämt
jokeButton.addEventListener("click", async () => {
  // Starta musiken efter att knappen har klickats
  if (rickrollAudio.paused) {
    rickrollAudio.play(); // Spela upp musiken
  }

  // Hämta skämtet från ett API
  const jokeResponse = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  const jokeData = await jokeResponse.json();
  jokeOutput.textContent = jokeData.joke;  // Visa skämtet i HTML

  // Hämta ett roligt meme från Imgflip API
  const memeResponse = await fetch("https://api.imgflip.com/get_memes");
  const memeData = await memeResponse.json();
  const randomMeme = memeData.data.memes[Math.floor(Math.random() * memeData.data.memes.length)];

  funnyImage.src = randomMeme.url;  // Uppdatera bildens src till den hämtade meme-bilden

  // Lägg till skakning på knappen när skämtet hämtas
  jokeButton.classList.add("shake");
  setTimeout(() => {
    jokeButton.classList.remove("shake"); // Ta bort skakningen efter en kort stund
  }, 1000);

  // Visa skämtet med en övergång
  jokeOutput.style.opacity = 1;

  // Visa meme-bilden med en övergång
  funnyImage.style.opacity = 1;
});

// Lyssna på volymjustering och uppdatera musiken
volumeControl.addEventListener("input", () => {
  rickrollAudio.volume = volumeControl.value; // Uppdaterar volymen baserat på reglaget
});
