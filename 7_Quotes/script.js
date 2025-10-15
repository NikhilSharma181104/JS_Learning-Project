const api_url = "https://api.api-ninjas.com/v1/quotes"
const quote =document.getElementById("quote")
const author=document.getElementById("author")
const newQuote=document.getElementById("newQuote")

async function getQuote(url) {
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': '0HMAE3uu5Dc608jmeKwTVw==qdXIhHudVMYqUiVc'
        }
    });    
    var data = await response.json();
    console.log(data)

    quote.innerHTML = data[0].quote
    author.innerHTML = data[0].author
}

getQuote(api_url)

function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "   --" + author.innerHTML, "Tweet Window", "width=800, height=600" );
}
