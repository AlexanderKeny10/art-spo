export const searchGoogleArtists = (query) => {
  console.log(process.env)
  return fetch(`https://api.harvardartmuseums.org/person/?apikey=c45cc63e-c074-4a0d-b51d-5dc1dc869c9d&q=${query}`);
};

export const searchGoogleArtworks = (query) => {
  return fetch(`https://api.harvardartmuseums.org/object/?apikey=c45cc63e-c074-4a0d-b51d-5dc1dc869c9d&person=${query}`);
};