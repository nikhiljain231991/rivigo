var interval = 	10000; // 10 seconds


var notificationSeen=0;
var notificationCounter = 0;


// Create and hide notification views

function toggleNotificationBar(){
	if(notificationCounter==0){
		showNotifications();
	}else{
		hideNotifications();
	}	
}


function showNotifications(){
	$(".notification-panel").addClass("transitionClass");
	$(".notifications-box").html("");
	notificationCounter = 1;
	if(localStorage.getItem("notifications")){
		var notifications = JSON.parse(localStorage.getItem("notifications"));
	}else{
		var notifications = [];
	}
	if(notificationSeen==0){
		notificationSeen=1;
		$(".notification-circle").html(notifications.length);
		$(".notification-circle").show();
	}		
	$(".notification-circle-big").html(notifications.length);
	if(notifications.length==0){
		var html = '<div class="notifications-inner-box emptyNotification">No new notifications.</div>';
		$(".notifications-box").html(html);
	}else{
		$.each(notifications,function(key,value){

			//notification logic. Can be changed according to need
			var html = '<div class="notifications-inner-box"><div class="notification-image" style="background:url('+value.imageURL+');background-size: 100%;"></div><div class="notification-content">'+value.notification+'</div></div>';
			$(".notifications-box").append(html);
		});
	}
	
}

function hideNotifications(){
	$(".notification-panel").removeClass("transitionClass");
	var html = '<div class="notifications-inner-box emptyNotification">No new notifications.</div>';
	$(".notifications-box").html(html);
	$(".notification-circle").html("0");
	$(".notification-circle").hide();
	$(".notification-circle-big").html("0");
	notificationCounter = 0;
}

$(document).click(function(event) {
    if(event.target.closest( ".notification-icon" )){
    	toggleNotificationBar();
    }else if(event.target.closest( ".notifications-box" )){

    }else{
    	hideNotifications();
    }
});


// update notification in fixed interval

function updateNotificationCount(){
	if(localStorage.getItem("notificationLength")){
		if(localStorage.getItem("notificationLength")==0){
			$(".notification-circle").html("0");
			$(".notification-circle").hide();
			$(".notification-circle-big").html("0");
		}else{
			$(".notification-circle").html(localStorage.getItem("notificationLength"));
			$(".notification-circle").show();
			$(".notification-circle-big").html(localStorage.getItem("notificationLength"));
		}
	}else{
		$(".notification-circle").html("0");
		$(".notification-circle").hide();
		$(".notification-circle-big").html("0");
	}
	if(notificationCounter==1){
		showNotifications();
	}
}

//initialize notification module

$(document).ready(function(){
	updateNotificationCount();
});


// get notifications on fixed intervals

var getNotifications = function(){
	$.get("json/notifications.json",function(data,status){
		//console.log(data);
		//localStorage.setItem("notifications",JSON.stringify(data));
		//localStorage.setItem("notificationLength",data.length);

		// get random notifications for now. this is not needed if api returns only new notifications
		var randomNumber = Math.floor(Math.random() * 6);
		var newdataarray = [];
		for(var i=0;i<randomNumber;i++){
			newdataarray[i] = data[i];
		}
		notificationSeen=0;
		localStorage.setItem("notifications",JSON.stringify(newdataarray));
		localStorage.setItem("notificationLength",randomNumber);		
		updateNotificationCount();
	});
};

setInterval(getNotifications, interval);