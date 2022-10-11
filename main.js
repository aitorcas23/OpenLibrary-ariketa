let datubase = [
    {
      "isbn": "1617293563",
      "egilea": "Raoul-Gabriel Urma",
      "data": "Nov 15, 2018",
      "izenburua": "Modern Java in Action: Lambdas, streams, functional and reactive programming",
      "filename": "8508261-M.jpg"
    },
  
   {
      "isbn": "9781617291302",
      "egilea": "Benjamin Muschko",
      "data": "Mar 09, 2014",
      "izenburua": "Gradle in Action",
      "filename": "8514400-M.jpg"
    },
  
       {
      "isbn": "1883601126",
      "egilea": "Matt Welsh",
      "data": "1995",
      "izenburua": "The Linux bible",
      "filename": "6764181-M.jpg"
    },
    
  {
      "isbn": "9781617293290",
      "egilea": "Dmitry Jemerov",
      "data": "Feb 19, 2017",
      "izenburua": "Kotlin in Action",
      "filename": "8507716-M.jpg"
    }
  ]

let liburua = 0;
function hasieratu(){
  irudikatu(liburua);
  document.getElementById("label").innerHTML = `Liburuak datubasean: ${datubase.length}`;

  document.getElementById("button2").onclick = function(){
    if(liburua < datubase.length - 1){
      liburua += 1;
      irudikatu(liburua);
    }
  }

  document.getElementById("button1").onclick = function(){
    if(liburua > 0){
      liburua -= 1;
      irudikatu(liburua);
    }
  }

  function convert(bookJSON){
    key = Object.keys(bookJSON)[0]
    return {
    "isbn" : key.split(':')[1],
    "egilea" : bookJSON[key].details.authors.map(elem => elem.name).join(', '),
    "data" : bookJSON[key].details.publish_date,
    "izenburua" : bookJSON[key].details.title,
    "filename" : `${bookJSON[key].details.covers[0]}-M.jpg`}
  }
  

  document.getElementById("button3").onclick = async function(){
    let isbn = document.getElementById("ISBN").value;
    liburua = datubase.findIndex(elem => elem.isbn == isbn);
    if(liburua == -1){
      let liburuBerria = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=details`).then(r => r.json());
      console.log(liburuBerria)
      let liburuBerriajson = convert(liburuBerria)
      liburua = datubase.length
      datubase.push(liburuBerriajson)
      document.getElementById("label").innerHTML = `Liburuak datubasean: ${datubase.length}`
    }
    irudikatu(liburua);
  }
}

function irudikatu(i){
  let izenburua = document.getElementById("izenburua");
  izenburua.value = datubase[i].izenburua;
  let egilea = document.getElementById("egilea");
  egilea.value = datubase[i].egilea;
  let urtea = document.getElementById("urtea");
  urtea.value = datubase[i].data;
  let ISBN = document.getElementById("ISBN");
  ISBN.value = datubase[i].isbn;
  let irudia = document.getElementById("irudia");
  irudia.src = "https://covers.openlibrary.org/b/id/" + datubase[i].filename;
}

window.onload = hasieratu;