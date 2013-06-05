// humanize seconds
function secondsToTime(s){
	var d = Math.floor( s / (60*60*24));
		s -= d * 60 *60 * 24;
    var h  = Math.floor( s / ( 60 * 60 ) );
        s -= h * ( 60 * 60 );
    var m  = Math.floor( s / 60 );
        s -= m * 60;
   
    return {
		"d": d,
        "h": h,
        "m": m,
        "s": Math.floor(s)
    };
}

// populate table
function statCtrl($scope) {
	$scope.msg = {};
	var handleCallback = function (msg) {
		$scope.$apply(function () {
			$scope.msg = msg;
		});
	}
	
	var uptime = 765424;
	
	setInterval(function(){
		var cpu = Math.floor((Math.random()*5));
		var ram = Math.floor((Math.random()*7));
		var m = {
			cpu: cpu < 3? 3:cpu,
			memory: ram < 2? 2:ram,
			uptime: secondsToTime(uptime++)
		};
		handleCallback(m);
	},1000);
}

var dnsList = {
	k0: [
		{text:'alpagastudio.be', done:false}
		,{text:'guanako.be', done:false}
		,{text:'marocevasion.be', done:false}
		,{text:'bemyloft.be', done:false}
		,{text:'boardcheck.com', done:false}
		,{text:'mmetoilesante.be', done:false}
		,{text:'client.monitor.be', done:false}
		,{text:'tienensuiker.be', done:false}
		,{text:'barexal.com', done:false}
	],
	k1: [
		{text:'belgiumrollers.com', done:false}
		,{text:'merrilys.com', done:false}
		,{text:'vandeput.info', done:false}
		,{text:'cansatbrussels.be', done:false}
		,{text:'immeublesenfete.be', done:false}
		,{text:'dragonslide.be', done:false}
		,{text:'brusselsfashiondays.be', done:false}
	],
};

var serverList = [
	{text:'k0.gunode.net', klass:'k0'},{text: 'k1.gunode.net', klass:'k1'},{text:'k2.gunode.net', klass:'k2'}
];

function serverListCtrl($scope) {
	$scope.serverList = serverList;
}

function DnsK1Ctrl($scope) {
    $scope.dnsList = dnsList.k1;
     
    $scope.addDns = function() {
		$('.form-k1').fadeOut();
		$scope.dnsList.push({text:$scope.dnsText, done:false});
		$scope.dnsText = '';
    };
     
    $scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.dnsList, function(dns) {
			count += dns.done ? 0 : 1;
		});
		return count;
    };
	
	$scope.displayForm = function() {
		$('.form-k1').show();
	}
	
    $scope.deleteAll = function() {
		if (confirm('Are you sure to delete this entry')) {
			var oldDnsList = $scope.dnsList;
			$scope.dnsList = [];
			angular.forEach(oldDnsList, function(dns) {
				if (!dns.done) $scope.dnsList.push(dns);
			});
		}
    };
}


function DnsK0Ctrl($scope) {
    $scope.dnsList = dnsList.k0;
     
    $scope.addDns = function() {
		$('.form-k0').fadeOut();
		$scope.dnsList.push({text:$scope.dnsText, done:false});
		$scope.dnsText = '';
    };
     
    $scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.dnsList, function(dns) {
			count += dns.done ? 0 : 1;
		});
		return count;
    };
	
	$scope.displayForm = function() {
		$('.form-k0').show();
	}
	
    $scope.deleteAll = function() {
		if (confirm('Are you sure to delete this entry')) {
			var oldDnsList = $scope.dnsList;
			$scope.dnsList = [];
			angular.forEach(oldDnsList, function(dns) {
				if (!dns.done) $scope.dnsList.push(dns);
			});
		}
    };
}


function DnsK2Ctrl($scope) {
    $scope.dnsList = dnsList.k2;
     
    $scope.addDns = function() {
		$('.form-k2').fadeOut();
		$scope.dnsList.push({text:$scope.dnsText, done:false});
		$scope.dnsText = '';
    };
     
    $scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.dnsList, function(dns) {
			count += dns.done ? 0 : 1;
		});
		return count;
    };
	
	$scope.displayForm = function() {
		$('.form-k2').show();
	}
	
    $scope.deleteAll = function() {
		if (confirm('Are you sure to delete this entry')) {
			var oldDnsList = $scope.dnsList;
			$scope.dnsList = [];
			angular.forEach(oldDnsList, function(dns) {
				if (!dns.done) $scope.dnsList.push(dns);
			});
		}
    };
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
		$('.wrapper').on('click','.action .delete', function() {
			if (confirm('Are you sure to delete this entry')) {
				$(this).parents('li').fadeOut();
			}
		});
		
		$('nav').on('click','#backtolist',function(e){
			e.preventDefault();
			$('.specific-server:not(:hidden)').fadeOut(function(){
				$('#manage-server').fadeIn();
				$('#backtolist').fadeOut();
			});
		});
		
		$('.wrapper').on('click','.server-info',function(){
			var that = $(this);
			$('#manage-server').fadeOut(function() {
				if (that.hasClass('k0')) {$('#k0').fadeIn();}
				if (that.hasClass('k1')) {$('#k1').fadeIn();}
				if (that.hasClass('k2')) {$('#k2').fadeIn();}
				$('#backtolist').fadeIn();
			});
		});
    }
};
