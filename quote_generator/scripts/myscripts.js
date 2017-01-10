var currentQuote,currentAuthor;
function openURL(url){
  console.log("inside open url function");
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getNewQuoteAndUpdate(){
  $.ajax({
    headers: {
          "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success:function(data){
      var data = JSON.parse(data);
      currentQuote = data.quote;
      $("#quote").text(currentQuote);
      currentAuthor = data.author;
      $("#quote_author").text(currentAuthor);
    }
  });
}

$("document").ready(function(){
  getNewQuoteAndUpdate();
  currentQuote="";
  currentAuthor="";
  $("#generate_new_button").on("click",function(){
     getNewQuoteAndUpdate();
  });

  $("#tweet_button").on("click",function(){
    console.log("tweet button clicked");
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
       encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });
});
