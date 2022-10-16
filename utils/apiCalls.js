async function getMovies(){
  let movies = []
  try {
   const response = await fetch('https://reactnative.dev/movies.json');
   const json = await response.json();
   movies = json.movies;
 } catch (error) {
   console.error(error);
 } finally {
   console.log("finally")
 }
 return movies;
}

export function postImage(image){
  console.log("preparing api request");
  let apiData = {}

  var img = {
    uri : image,
    name: 'test.jpg',
    type: 'image/jpg'
};
  var fdata = new FormData();
  fdata.append('image', {
    uri: img.uri,
    name: img.name,
    type: img.type
});
  try{
    const resp = fetch('https://1496-131-123-49-7.ngrok.io/parse', 
    {
      method: 'post',
      body: fdata,
      headers:{
        'Content-Type': "multipart/form-data"
      }
    }).then(async function(res) {
      const response = await res.json();
      console.log("api respoinse in fetch", response);
      apiData = response;
      return response;
    }).catch(function(err){
      console.error("api error", err);
    })
  } catch(error){
    console.error("error", error);
  }
  console.log("api response", apiData)
  return apiData;
}

export default apiCalls = () => {
  const data = getMovies()
  console.log("data", data);
  return data;
};
