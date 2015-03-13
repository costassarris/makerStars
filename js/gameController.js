$(document).ready(function() {

  var game = new Game();
  var options = {};
  var players = 2;
  var apiKey = "7ZPa1lMUiqmshLJtcTLekzIvg9eip1nZ3kijsnHyAfrH75e30C";

  function getData() {

    $.ajax({
      url: "https://poker.p.mashape.com/index.php?players=2",
      type: "GET",
      dataType: "json",
      success: function(response) {
        options = {
          flop:response.showdown.slice(0, 3),
          turn:response.showdown.slice(3, 4),
          river:response.showdown.slice(4, 5),
          p1hand:response.player_cards[1],
          p2hand:response.player_cards[2],
          winner:response.winners
        }
        game.newGame(options);
      },
      error: function(err) { alert(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", apiKey);
      }
    });
  };
getData();

   function giveSuitTo(span) {

    $(span).each(function() {
        var $this = $(this),
        html = $this.html();
        if (html.indexOf("img") === -1) {html = html.replace(/c/g, '<img src="images/club.jpg" alt="c" height = "15" >')};
        if (html.indexOf("img") === -1) {html = html.replace(/h/g, '<img src="images/heart.jpg" alt="h" height = "15" >')};
        if (html.indexOf("img") === -1) {html = html.replace(/d/g, '<img src="images/diamond.jpg" alt="d" height = "15" >')};
        if (html.indexOf("img") === -1) {html = html.replace(/s/g, '<img src="images/spade.jpg" alt="s" height = "15" >')};
        $this.html(html);
    });
  }

  $('#newHand').on('click', function() {
    $('.card').text('');
    getData();
  });

  $('#dealPlayers').on('click', function() {
    $('#p1handCard1').text(game.p1hand[0]);
    $('#p1handCard2').text(game.p1hand[1]);
    $('#p2handCard1').text(game.p2hand[0]);
    $('#p2handCard2').text(game.p2hand[1]);
    giveSuitTo('.card');
  });

  $('#dealFlop').on('click', function() {
    $('#p1handCard1').text(game.p1hand[0]);
    $('#p1handCard2').text(game.p1hand[1]);
    $('#p2handCard1').text(game.p2hand[0]);
    $('#p2handCard2').text(game.p2hand[1]);
    $('#flop1').text(game.flop[0])
    $('#flop2').text(game.flop[1])
    $('#flop3').text(game.flop[2])
    giveSuitTo('.card');
  });

  $('#dealTurn').on('click', function() {
    $('#turn').text(game.turn.join('  '))
    giveSuitTo('.card');
  });

  $('#dealRiver').on('click', function() {
    $('#river').text(game.river.join('  '))
    giveSuitTo('.card');
    $('#winner').text("PLAYER " + game.winner.join(' ') + " WINS")
  });

});