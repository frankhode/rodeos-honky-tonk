// Editá este archivo para actualizar el sitio. No hace falta compilar nada.
// Las comillas vacías y las listas vacías muestran mensajes de "próximamente".
window.RODEOS = {
  foto: "assets/banner-rodeos.jpg", // Ejemplo: "assets/banda.jpg" (foto horizontal)
  fotoAlt: "Rodeos Honky-Tonk",
  fotoPosicion: "center", // Ejemplo: "center 35%" para ajustar el recorte
  logo: "assets/logo-transparent.svg", // Ejemplo: "assets/logo.png" (preferentemente fondo transparente)
  lema: "Honky-tonk.\nA nuestra manera.",
  sobreTitulo: "Un punto de encuentro.\nUna forma de hacer música.",
  sobre: ["Estamos preparando este espacio para compartir nuestra historia, presentar a los integrantes y contar qué nos reúne alrededor del honky-tonk."],
  integrantes: [], // { nombre: "Nombre", instrumento: "Voz y guitarra" }
  influencias: [
  {
    "nombre": "The Honkytonk Wranglers",
    "imagen": "assets/influencias/the-honkytonk-wranglers.jpg",
    "enlace": "https://open.spotify.com/artist/0TERwNrBI1DT7zkcv5ugRY",
    "canciones": [
      "Hangin' Around"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eb070f5ccc002cf5a314902cc1"
  },
  {
    "nombre": "Hank Williams",
    "imagen": "assets/influencias/hank-williams.jpg",
    "enlace": "https://open.spotify.com/artist/1FClsNYBUoNFtGgzeG74dW",
    "canciones": [
      "Move It On Over",
      "My Bucket's Got A Hole In It",
      "Ramblin' Man",
      "I'm So Lonesome I Could Cry",
      "Hey, Good Lookin'",
      "Kaw-Liga",
      "Your Cheatin' Heart",
      "Honky Tonkin' - 1948 Single Version"
    ],
    "acompanantes": [
      "Drifting Cowboys"
    ],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Hank_Williams_Promotional_Photo.jpg/500px-Hank_Williams_Promotional_Photo.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Hank_Williams",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Hank_Williams_Promotional_Photo.jpg"
  },
  {
    "nombre": "Lefty Frizzell",
    "imagen": "assets/influencias/lefty-frizzell.jpg",
    "enlace": "https://open.spotify.com/artist/05pAwLhsutiuj6gerEwGvU",
    "canciones": [
      "If You've Got the Money I've Got the Time"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Lefty_Frizzell_portrait_cropped.jpg/500px-Lefty_Frizzell_portrait_cropped.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Lefty_Frizzell",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Lefty_Frizzell_portrait_cropped.jpg"
  },
  {
    "nombre": "Bob Wills & His Texas Playboys",
    "imagen": "assets/influencias/bob-wills-his-texas-playboys.jpg",
    "enlace": "https://open.spotify.com/artist/0VyOgubdcDnrJ0AWL2TRDN",
    "canciones": [
      "Roly-Poly"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Bob_Wills_photograph_-_Cropped.jpg/500px-Bob_Wills_photograph_-_Cropped.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Bob_Wills",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Bob_Wills_photograph_-_Cropped.jpg",
    "fotoNota": "Retrato de Bob Wills"
  },
  {
    "nombre": "Patsy Cline",
    "imagen": "assets/influencias/patsy-cline.jpg",
    "enlace": "https://open.spotify.com/artist/7dNsHhGeGU5MV01r06O8gK",
    "canciones": [
      "Walkin' After Midnight"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Patsy_Cline_1960_publicity_portrait_-_cropped.jpg/500px-Patsy_Cline_1960_publicity_portrait_-_cropped.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Patsy_Cline",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Patsy_Cline_1960_publicity_portrait_-_cropped.jpg"
  },
  {
    "nombre": "Elizabeth Cotten",
    "imagen": "assets/influencias/elizabeth-cotten.jpg",
    "enlace": "https://open.spotify.com/artist/1eTZGzLkukATM7FoGltyFs",
    "canciones": [
      "Freight Train"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eb6dcca405e2e5b458ad876b1a"
  },
  {
    "nombre": "Hank Williams III",
    "imagen": "assets/influencias/hank-williams-iii.jpg",
    "enlace": "https://open.spotify.com/artist/3qf2YoifC68WTsMv1YIGmh",
    "canciones": [
      "Honky Tonk Girls"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Hank_Williams_III_%28Hank3%29_-_Roskilde_Festival_2012.jpg/960px-Hank_Williams_III_%28Hank3%29_-_Roskilde_Festival_2012.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Hank_Williams_III",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Hank_Williams_III_(Hank3)_-_Roskilde_Festival_2012.jpg"
  },
  {
    "nombre": "Johnny Cash",
    "imagen": "assets/influencias/johnny-cash.jpg",
    "enlace": "https://open.spotify.com/artist/6kACVPfCOnqzgfEF5ryl0x",
    "canciones": [
      "Folsom Prison Blues",
      "Hey Porter"
    ],
    "acompanantes": [
      "The Tennessee Two"
    ],
    "fuenteFoto": "https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eb94a8326675bfcafb20f0a235"
  },
  {
    "nombre": "Hank Snow",
    "imagen": "assets/influencias/hank-snow.jpg",
    "enlace": "https://open.spotify.com/artist/3fq6r0bSIm4McymHKNMk4S",
    "canciones": [
      "I've Been Everywhere"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://upload.wikimedia.org/wikipedia/commons/1/17/Hanksnowpromoimage.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    "paginaFoto": "https://en.wikipedia.org/wiki/Hank_Snow",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Hanksnowpromoimage.jpg"
  },
  {
    "nombre": "Eddy Arnold",
    "imagen": "assets/influencias/eddy-arnold.jpg",
    "enlace": "https://open.spotify.com/artist/5QsUbpxSE8lCZ5ga5rnD22",
    "canciones": [
      "Texarkana Baby"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Eddie_Arnold_1969.JPG/500px-Eddie_Arnold_1969.JPG?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Eddy_Arnold",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Eddie_Arnold_1969.JPG"
  },
  {
    "nombre": "Webb Pierce",
    "imagen": "assets/influencias/webb-pierce.jpg",
    "enlace": "https://open.spotify.com/artist/1ARZrF9nU4zgdDHuBIfqMq",
    "canciones": [
      "In the Jailhouse Now"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://image-cdn-ak.spotifycdn.com/image/ab6761610000e5ebe969c89e7fc8fe42e37c5efd"
  },
  {
    "nombre": "Jean Shepard",
    "imagen": "assets/influencias/jean-shepard.jpg",
    "enlace": "https://open.spotify.com/artist/3lQuLlW6tYv1nm3nzyJ6Ty",
    "canciones": [
      "Twice the Lovin' (In Half the Time)"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Jean_Shepard--Billboard--1967.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    "paginaFoto": "https://en.wikipedia.org/wiki/Jean_Shepard",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Jean_Shepard--Billboard--1967.jpg"
  },
  {
    "nombre": "Hank Thompson",
    "imagen": "assets/influencias/hank-thompson.jpg",
    "enlace": "https://open.spotify.com/artist/42tDjhK9kdS7CCHxs8ysz0",
    "canciones": [
      "The Wild Side Of Life"
    ],
    "acompanantes": [
      "His Brazos Valley Boys"
    ],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Hank_Thompson_1966.JPG/500px-Hank_Thompson_1966.JPG?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Hank_Thompson_(musician)",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Hank_Thompson_1966.JPG"
  },
  {
    "nombre": "Red Foley",
    "imagen": "assets/influencias/red-foley.jpg",
    "enlace": "https://open.spotify.com/artist/56tggwKsz5OqCDf1i0Str9",
    "canciones": [
      "Tennessee Saturday Night"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://upload.wikimedia.org/wikipedia/commons/0/08/Red_Foley_Billboard_2.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled",
    "paginaFoto": "https://en.wikipedia.org/wiki/Red_Foley",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Red_Foley_Billboard_2.jpg"
  },
  {
    "nombre": "Jimmy Wakely",
    "imagen": "assets/influencias/jimmy-wakely.jpg",
    "enlace": "https://open.spotify.com/artist/1bkPltv18ZrFr2IhEdIae5",
    "canciones": [
      "Moon Over Montana - Mono"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Jimmy_Wakely_in_I%27m_from_Arkansas.jpg/500px-Jimmy_Wakely_in_I%27m_from_Arkansas.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    "paginaFoto": "https://en.wikipedia.org/wiki/Jimmy_Wakely",
    "creditoFoto": "https://en.wikipedia.org/wiki/File:Jimmy_Wakely_in_I'm_from_Arkansas.jpg"
  },
  {
    "nombre": "Santo & Johnny",
    "imagen": "assets/influencias/santo-johnny.jpg",
    "enlace": "https://open.spotify.com/artist/4hGjngc0tPOBwTgTPci3IK",
    "canciones": [
      "Sleepwalk"
    ],
    "acompanantes": [],
    "fuenteFoto": "https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5ebf063f27815823c4e9ce4973e"
  }
],
  presentaciones: [], // { fecha: "2026-12-01", lugar: "Sala", ciudad: "Ciudad", enlace: "https://...", textoEnlace: "Entradas" }
  email: "Rodeoshonkytonk@gmail.com",
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com/rodeos.honkytonk/" },
    { nombre: "TikTok", url: "https://www.tiktok.com/@rodeos.honkytonk" },
    { nombre: "YouTube", url: "https://www.youtube.com/@rodeoshonkytonk" }
  ] // { nombre: "Instagram", url: "https://www.instagram.com/usuario/" }
};

