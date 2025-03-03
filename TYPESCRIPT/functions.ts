//optional parameters you can pass a value or not
const albumInfo = (
    title:string,
    artist:string | number,
    isReleased:boolean,
    releaseDate?:string

): string =>{
   return `Title: ${title} ,Artist:${artist} ,isReleased: ${isReleased}, releaseDate :${releaseDate}`
}
console.log(albumInfo("They Not Like Us","Kendrick Lamar",true))
console.log(albumInfo("Midnights", 21, true, "2022-10-21"))



//rest parameters
// this printAlbumFormats is set up to accept an album and any number of formats:

type Album = {
    title:string,
}

function getAlbumFormats(album: Album, ...formats: string[]) {
    return `${album.title} is available in the following formats: ${formats.join(
      ", ",
    )}`;
  }


 // using Array <>
  function getAlbumFormats1(album: Album, ...formats: Array<string>) {
    // function body
  }