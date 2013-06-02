var Plot = {
	options: {
		series: {
			color: "#72c4dd",
			shadowSize: 0,
			lines: {
				fillColor: "rgba(114, 196, 220, 0.4)",
				lineWidth: 0,
				fill: true
			}
		},
		yaxis: {
			min: 0,
			max: 100
		},
		xaxis: {
			show: false
		}
	},
	totalPoints: 300,
	updateInterval: 100,
	data: [],
	obj: null,
	update: function() {
		Plot.obj.setData([getRandomData()]);
		Plot.obj.draw();
		setTimeout(Plot.update, Plot.updateInterval);
	}
}
// fake data
function getRandomData() {
	if (Plot.data.length > 0)
		Plot.data = Plot.data.slice(1);
	while (Plot.data.length < Plot.totalPoints) {
		var prev = Plot.data.length > 0 ? Plot.data[Plot.data.length - 1] : 50,
			y = prev + Math.random() * 10 - 5;
		if (y < 0) {
			y = 0;
		} else if (y > 100) {
			y = 100;
		}
		Plot.data.push(y);
	}
	var res = [];
	for (var i = 0; i < Plot.data.length; ++i) {
		res.push([i, Plot.data[i]])
	}
	return res;
}

// populate table
function statCtrl($scope) {
	// $scope.msg = {};
	var handleCallback = function (msg) {
		// $scope.$apply(function () {
			// $scope.msg = JSON.parse(msg.data)
		// });
		
		$('.test').append(JSON.stringify(msg.data));
		
	}
	var source = new EventSource('http://server.monitor.k1.gunode.net/stats');
	source.addEventListener('message', handleCallback, false);
}

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
        document.addEventListener('DOMContentLoaded', this.deviceready, false);
    },
    deviceready: function() {
		var handleCallback = function (msg) {
			$('.test').append(JSON.parse(msg.data));
		}
		var source = new EventSource('http://server.monitor.k1.gunode.net/stats');
		source.addEventListener('message', handleCallback, false);
		Plot.obj = $.plot("#myChart", [ getRandomData() ], Plot.options);	
		Plot.update();
    }
};
