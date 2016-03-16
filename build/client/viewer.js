// Generated by CoffeeScript 1.10.0
(function() {
  $(function() {
    var currentDate;
    currentDate = function() {
      var curr_date, curr_month, curr_year, d;
      d = new Date();
      curr_date = d.getDate();
      curr_month = d.getMonth() + 1;
      curr_year = d.getFullYear();
      return curr_date + "." + curr_month + "." + curr_year;
    };
    return setInterval(function() {
      var data, id, infoContainer;
      id = "robinhood-info-module";
      if ($(".bet_group:first .bets span.koeff:first").length > 0) {
        infoContainer = $("#" + id).length === 0 ? $("<div id='" + id + "' style='display:none;'>").appendTo($('body')) : $("#" + id);
        try {
          data = {
            date: currentDate(),
            name: $("#page_title").text() + " " + currentDate(),
            p1: parseFloat($(".bet_group:first .bets span.koeff:first").text()),
            p2: parseFloat($(".bet_group:first .bets span.koeff:last").text())
          };
          return infoContainer.html(JSON.stringify(data));
        } catch (undefined) {}
      }
    }, 1000);
  });

}).call(this);
