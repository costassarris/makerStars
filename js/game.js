var Game = function() {};

Game.prototype.newGame = function(options) {
  this.flop = options.flop;
  this.turn = options.turn;
  this.river = options.river;
  this.p1hand = options.p1hand;
  this.p2hand = options.p2hand;
  this.winner = options.winner;
};