const express = require("express");
const PORT = 2001;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

app.use(express.json());

const playlist = [
  {
    id: 1,
    title: "Speak now",
    artists: ["Taylor Swift"],
    url: "https://open.spotify.com/intl-id/track/3DrjZArsPsoqbLzUZZV1Id",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/0f/Back_to_December.png",
    isPlaying: false,
  },
  {
    id: 2,
    title: "Back to december",
    artists: ["Taylor Swift"],
    url: "https://open.spotify.com/intl-id/track/24DefNCFiWTP8OjYWiXuYe",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/8f/Taylor_Swift_-_Speak_Now_cover.png",
    isPlaying: false,
  },
];

app.get("/spotify/playlist", (req, res) => {
  res.send(playlist);
});
app.put("/spotify/playlist/:id", (req, res) => {
  const { id } = req.params;

  const playedSong = playlist.find((item) => {
    return item.isPlaying == true;
  });
  if (playedSong) {
    playedSong.isPlaying = false;
  }
  const choosedSong = playlist.find((item) => {
    return item.id == id;
  });

  if (!choosedSong) {
    res.send("tidak dapat menemukan lagu");
  }
  choosedSong.isPlaying = true;
  res.send(`Lagu yang sekarang sedang diputar adalah ${choosedSong.title}`);
});

app.post("/spotify/playlist", (req, res) => {
  const { title, artists } = req.body;
  if (!title || !artists) {
    res.send("nama lagu dan list artis tidak boleh kosong");
    return;
  }
  let maxIndex = Math.max(...playlist.map((item) => item.id));
  playlist.push({
    id: (maxIndex = maxIndex + 1),
    title,
    artists,
    url: "https://open.spotify.com/intl-id",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/8f/Taylor_Swift_-_Speak_Now_cover.png",
    isPlaying: false,
  });
  res.send({
    data: playlist,
  });
});
app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
