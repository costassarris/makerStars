var Game = function(flop, turn, river, p1hand, p2hand, winner) {
  this.flop = flop;
  this.turn = turn;
  this.river = river;
  this.p1hand = p1hand;
  this.p2hand = p2hand;
  this.winner = winner
};


$(document).ready(function() {

  $.ajax({
    url: "https://poker.p.mashape.com/index.php?players=2",
    type: "GET",
    dataType: "json",
    success: function(response) {
      var flop = response.showdown.slice(0, 3);
      var turn = response.showdown.slice(3, 4);
      var river = response.showdown.slice(4, 5);
      var p1hand = response.player_cards[1];
      var p2hand = response.player_cards[2];
      var winner = response.winners
      var game = new Game(flop, turn, river, p1hand, p2hand, winner);
      console.log(game);
      $('#player1').text("PLAYER 1: " + game.p1hand.join(' '))
      $('#player2').text("PLAYER 2: " + game.p2hand.join(' '))
      $('#dealFlop').on('click', function() {
        $('#flop').text(game.flop.join('  '))
      });
      $('#dealTurn').on('click', function() {
        $('#turn').text(game.turn.join('  '))
      });
      $('#dealRiver').on('click', function() {
        $('#river').text(game.river.join('  '))
        $('#winner').text("PLAYER " + game.winner.join(' ') + " WINS")
      });



    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "7ZPa1lMUiqmshLJtcTLekzIvg9eip1nZ3kijsnHyAfrH75e30C");
    }
  });

});