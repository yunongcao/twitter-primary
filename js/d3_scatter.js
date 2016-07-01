var myChart;
function scatter_viz(newdata) {
nv.addGraph(function() {
  var chart = nv.models.scatterChart()
                // .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
                // .showDistY(true)
                .useVoronoi(true)
                .duration(350)
                .color(["#B22222","#282F6B","EACE3F"]);

  //Configure how the tooltip looks.
  chart.tooltip.contentGenerator(
    function (obj) { 
      return '<p>'+obj.point.label.substring(0,100)+'</p>'+'<p>'+obj.point.label.substring(100,400)+'</p>';
    })



  //Axis settings
  chart.xAxis.tickFormat(d3.format('.02f'));
  chart.yAxis.tickFormat(d3.format('.02f'));

  //We want to show shapes other than circles.

  chart.yAxis.axisLabel('Polarity');
  chart.xAxis.axisLabel('Subjectivity');

  myChart = d3.select('#chart svg');
  myChart.datum(newdata)
      .transition().duration(500)
      .call(chart);
  nv.utils.windowResize(chart.update);
  return chart;

});
}


function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};


// var newdata = null;
getJSON("http://twitter-primary.herokuapp.com/scatter",function(err, data) {
      newdata = data
      newdata1 = data
      scatter_viz(newdata1);
});
