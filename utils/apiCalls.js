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

export async function postImage(image){
  console.log("preparing api request");
  let apiData = {}

//   var img = {
//     uri : image,
//     name: 'test.jpeg',
//     type: 'image/jpeg'
// };
//   var fdata = new FormData();
//   fdata.append('image', {
//     uri: img.uri,
//     name: img.name,
//     type: img.type
// });
//   try{
//     const response = await fetch('', 
//     {
//       method: 'post',
//       body: fdata,
//       headers:{
//         'Content-Type': "multipart/form-data"
//       }
//     });
//     const json = response.json();
//     apiData = json.data
//   } catch(error){
//     console.error("error", error);
//   }
  return apiData;
}

export default apiCalls = () => {
  const data = getMovies()
  console.log("data", data);
  return data;
};
