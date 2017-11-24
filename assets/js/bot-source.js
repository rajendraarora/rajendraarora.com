var guestMessageConversation = [];

$(document).ready(function(){
	
	$('#live-chat header').on('click', function() {
		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');
	});

	$('.chat-close').on('click', function(e) {
		e.preventDefault();
		$('#live-chat').fadeOut(300);
	});
	
	startChatingExecution();
});
/*
 * Jquery end
 */

function startChatingExecution(){

    $(".bot-textarea").submit(function (e) {
    	var formBot = $("#bot-textarea");
    	e.preventDefault();
    	
    	var bot_input_textarea = $(".bot_input_textarea").val();
    	var guestUserMessage = $("input[name=guestUserMessage]").val(bot_input_textarea);
    	
        $(".bot_input_textarea").val("");
        
        if(guestUserMessage.val().replace( /\s\s+/g, '' ) != ""){
        	scrollDown();
            callTypingWord();
            scrollDown();
            
            /*Trying to be more intelligent*/
            if(in_array(guestUserMessage.val(), guestMessageConversation)){
        		//alert("Message present");
            	getChatText(guestUserMessage.val());
            	setTimeout(function(){
            		existedMessage()
            		scrollDown()
            	}, 2000);
            	
        	}else{
        		getChatText(guestUserMessage.val());
        		
            	setTimeout(function(){
            		analyseMessage(guestUserMessage.val())
            		scrollDown()
            	}, 2000);
        	}
            
            guestMessageConversation.push(guestUserMessage.val());
        }
    });
}

function analyseMessage(guestUserMessage){
	
	var hiWord = ["hi", "hello", "Hello", "Hi", "HI", "HELLO", "hii", "hiii", "Hii", "HII", "Hi!", "hi!", "Hello!", "hello!", "hey", "Hey", "hey!", "hi rajendra", "Hi Rajendra", "HI RAJENDRA", "Hi rajendra"]
	var askingName = ["Hello! What's your name?"]
	var regexPatternName = [
	    /\bmy name is \b/, 
	    /\bMy name is \b/, 
	    /\bMY NAME IS \b/
	]
	var howAreYou = [
	    "how r u",
	    "How are you",
	    "HOW ARE YOU",
	    "how are you",
	    "HOW R U",
	    "how r u?",
	    "How are you?",
	    "HOW ARE YOU?",
	    "how are you?",
	    "HOW R U?"
	]
	
	var regexAbusiveWord = [
	    /\bfuck\b/,
	    /\bFuck\b/,
	    /\bfck\b/,
	    /\bFUCK\b/,
	    /\bFUCKER\b/,
	    /\bfucker\b/
	]
	if(regexAbusiveWord[0].test(guestUserMessage) || regexAbusiveWord[1].test(guestUserMessage) || regexAbusiveWord[2].test(guestUserMessage) || regexAbusiveWord[3].test(guestUserMessage) || regexAbusiveWord[4].test(guestUserMessage) || regexAbusiveWord[5].test(guestUserMessage)){
	
		sendProperMessage("" +
				"Please don't use abusive word :(<br/><br/>" +
				"<a id='hi_select' class='chat_link_suggestion' onclick='saySomething();'>Say something!</a><br/><br/>");
			
		
	}else if(in_array(guestUserMessage, howAreYou)){
		
		sendProperMessage("" +
			"I am good! Thank you for asking :)<br/>" +
			"How can I help you with?" +
			"<br/><br/>Please select below:"+
			"<br/><br/>"+
			"<a class='chat_link_suggestion' onclick='who_is_rajendra();'>Who is Rajendra Arora?</a><br/><br/>"+
			"<table><tr>" +
			"<td><a class='chat_link_suggestion' onclick='contactAddress();'>Contact</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='education();'>Education</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='experience();'>Experience</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='profile();'>Profile</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='sport();'>Sport</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='weakness();'>Weakness</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='website();'>Website</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='friend();'>Friend</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='playgame();'>Play game</a>");
		
	}else if(regexPatternName[0].test(guestUserMessage) || regexPatternName[1].test(guestUserMessage) || regexPatternName[2].test(guestUserMessage)){
		
		var guestName = guestUserMessage.toLowerCase().replace("my name is", "")
		sendProperMessage("" +
				"It's a pleasure to meet you" +
				""+guestName+"! How can I help you with?" +
				"<br/><br/>Please select below:"+
				"<br/><br/>"+
				"<a class='chat_link_suggestion' onclick='who_is_rajendra();'>Who is Rajendra Arora?</a><br/><br/>"+
				"<table><tr>" +
				"<td><a class='chat_link_suggestion' onclick='contactAddress();'>Contact</a><br/><br/>"+
				"<td><a class='chat_link_suggestion' onclick='education();'>Education</a><br/><br/>" +
				"<tr><td><a class='chat_link_suggestion' onclick='experience();'>Experience</a><br/><br/>"+
				"<td><a class='chat_link_suggestion' onclick='profile();'>Profile</a><br/><br/>"+
				"<tr><td><a class='chat_link_suggestion' onclick='sport();'>Sport</a><br/><br/>" +
				"<td><a class='chat_link_suggestion' onclick='weakness();'>Weakness</a><br/><br/>"+
				"<tr><td><a class='chat_link_suggestion' onclick='website();'>Website</a><br/><br/>" +
				"<td><a class='chat_link_suggestion' onclick='friend();'>Friend</a><br/><br/>" +
				"<tr><td><a class='chat_link_suggestion' onclick='playgame();'>Play game</a>");      
		
	}else if(in_array(guestUserMessage, hiWord)){
		
		sendProperMessage(askingName[0]);
		
		setTimeout(function(){
			$(".bot_input_textarea").val("My name is ");
    	}, 700);
		
	}else{
		stringNotFoundMsg();
	}
}

function existedMessage(){
	
	sendProperMessage(
			"How can I help you with?" +
			"<br/><br/>Please select below:"+
			"<br/><br/>"+
			"<a class='chat_link_suggestion' onclick='who_is_rajendra();'>Who is Rajendra Arora?</a><br/><br/>"+
			"<table><tr>" +
			"<td><a class='chat_link_suggestion' onclick='contactAddress();'>Contact</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='education();'>Education</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='experience();'>Experience</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='profile();'>Profile</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='sport()'>Sport</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='weakness();'>Weakness</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='website();'>Website</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='friend();'>Friend</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='playgame();'>Play game</a>");   
}

function stringNotFoundMsg(){
	var noSolutionFound = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Uh-oh, I didn't understand.</p>"
		+"<br/><br/>"
		+"<a id='hi_select' class='chat_link_suggestion' onclick='saySomething();'>Say something!</a><br/><br/>"
			
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(noSolutionFound);scrollDown();
	}, 700);
}

function sendProperMessage(msg){
	var properReply = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>"+msg+"</p><br/>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(properReply);scrollDown();
	}, 700);
}

function getChatText(guestUserMessage){
	
	var chatMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/guest.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Guest</h5>"
		+"<p class='chat-msg_'>"+htmlEntities(guestUserMessage)+"</p>"
		
	$(".chat-conversation").append(chatMsg);
} 

function callTypingWord(){
	setTimeout(function(){
		$(".chat-conversation").append(
				"<p class='chat-feedback'>Sending...</p>"
		);
	}, 700);
}

function scrollDown(){
	$(".chat-history").stop().animate({ scrollTop: $(".chat-history")[0].scrollHeight}, 1000);
}

function currentTime(){
	var time = new Date();
	return time.getHours() + ":" + time.getMinutes();
}

function in_array(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function saySomething(){
	document.getElementById("guestUserMsgHidden").value = "Say Something!";
	document.getElementById("bot_input_textarea").value="Say something!";
	manualSubmitMsg();
}

function who_is_rajendra(){
	document.getElementById("guestUserMsgHidden").value = "Who is Rajendra Arora?";
	document.getElementById("bot_input_textarea").value="Who is Rajendra Arora?";
	manualSubmitMsg();
}

function contactAddress(){
	document.getElementById("guestUserMsgHidden").value = "How to contact Rajendra?";
	document.getElementById("bot_input_textarea").value="How to contact Rajendra?";
	manualSubmitMsg();
}

function education(){
	document.getElementById("guestUserMsgHidden").value = "Education";
	document.getElementById("bot_input_textarea").value="Education";
	manualSubmitMsg();
}

function experience(){
	document.getElementById("guestUserMsgHidden").value = "Experience";
	document.getElementById("bot_input_textarea").value="Experience";
	manualSubmitMsg();
}

function profile(){
	document.getElementById("guestUserMsgHidden").value = "Profile";
	document.getElementById("bot_input_textarea").value="Profile";
	manualSubmitMsg();
}

function sport(){
	document.getElementById("guestUserMsgHidden").value = "Sports";
	document.getElementById("bot_input_textarea").value="Sports";
	manualSubmitMsg();
}

function weakness(){
	document.getElementById("guestUserMsgHidden").value = "Weakness";
	document.getElementById("bot_input_textarea").value="Weakness";
	manualSubmitMsg();
}

function website(){
	document.getElementById("guestUserMsgHidden").value = "Website";
	document.getElementById("bot_input_textarea").value="Website";
	manualSubmitMsg();
}

function friend(){
	document.getElementById("guestUserMsgHidden").value = "Friends";
	document.getElementById("bot_input_textarea").value="Friends";
	manualSubmitMsg();
}

function playgame(){
	document.getElementById("guestUserMsgHidden").value = "Play game";
	document.getElementById("bot_input_textarea").value="Play game";
	manualSubmitMsg();
}

/*Rock paper scissor game*/
function rock(){
	document.getElementById("guestUserMsgHidden").value = "Rock";
	document.getElementById("bot_input_textarea").value="Rock";
	manualSubmitMsg();
}

function paper(){
	document.getElementById("guestUserMsgHidden").value = "Paper";
	document.getElementById("bot_input_textarea").value="Paper";
	manualSubmitMsg();
}

function scissor(){
	document.getElementById("guestUserMsgHidden").value = "Scissor";
	document.getElementById("bot_input_textarea").value="Scissor";
	manualSubmitMsg();
}
/*-------*/

function sayHi(){
	document.getElementById("guestUserMsgHidden").value = "Hi";
	document.getElementById("bot_input_textarea").value="Hi";
	manualSubmitMsg();
}

function manualSubmitMsg(){
	
	scrollDown();
	var formBot = $("#bot-textarea");
	
	var bot_input_textarea = $(".bot_input_textarea").val();
	var guestUserMessage = $("input[name=guestUserMessage]").val(bot_input_textarea);
	
    $(".bot_input_textarea").val("");
    
    if(guestUserMessage.val().replace( /\s\s+/g, '' ) != ""){
        callTypingWord();
        
        var iframeURLArray = [
            "<iframe src='https://giphy.com/embed/gL8RwwTE8Sh4Q' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/loz4TvMBBnvkQ' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/QpfqKHA1fUXDi' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/l41lMAXsHQoZI8Hio' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/12Yug01me26oH6' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/6yKnJA0oOgmBi' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/hRYXatty4dJks' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/6L015gMEW3pFC' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>",
            "<iframe src='https://giphy.com/embed/27AqY6jmNU8ve' width='180' height='90' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>"
        ]
        
        /*Say something message*/
        var saySomethingMsgFormat = [
            "say something",
            "Say something",
            "SAY SOMETHING",
            "say something!",
            "Say Something!",
            "Say something!"
        ]
        
        var whoIsRajendraFormat = [
            "who is rajendra arora?",
            "Who is rajendra arora?",
            "Who is Rajendra arora?",
            "Who is Rajendra Arora?",
            "WHO IS RAJENDRA ARORA?",
            "WHO IS RAJENDRA ARORA",
            "Who is rajendra arora",
            "who is rajendra arora",
            "who is rajendra",
            "Who is rajendra",
            "who is Rajendra",
            "Who is Rajendra"
        ]
        
        var contactAddressFormat = [
            "How to contact Rajendra?",
            "how to contact rajendra?",
            "HOW TO CONTACT RAJENDRA?",
            "how to contact rajendra",
            "how to contact Rajendra",
            "How to contact Rajendra",
            "HOW TO CONTACT RAJENDRA"
        ]
        
        var educationFormat = [
            "education",
            "Education",
            "EDUCATION"
        ]
        
        var experienceFormat = [
            "experience",
            "Experience",
            "EXPERIENCE"
        ]        
        
        var profileFormat = [
            "profile",
            "Profile",
            "PROFILE"
        ]
        
        var sportFormat = [
            "sports",
            "Sports",
            "SPORTS",
            "sport",
            "Sport",
            "SPORT"
        ]
        
        var weaknessFormat = [
            "weakness",
            "Weakness",
            "WEAKNESS"
        ]
        
        var websiteFormat = [
            "website",
            "Website",
            "WEBSITE"
        ]
        
        var friendFormat = [
            "friends",
            "Friends",
            "FRIENDS",
            "FRIEND",
            "Friend",
            "friend"
        ]
        
        var playGameFormat = [
            "play game",
            "Play game",
            "PLAY GAME"
        ]
        
        var playGameRockPaperScissor = [
            "Rock",
            "Paper",
            "Scissor"
        ]
        
        var sayHiFormat = [
            "Hi",
            "hi",
            "HI"
        ]
        
        /*Say hi*/
        if(in_array(guestUserMessage.val(), sayHiFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		sayHiRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Rock Paper scissor*/
        else if(in_array(guestUserMessage.val(), playGameRockPaperScissor)){
        	
        	getChatText(guestUserMessage.val());
        	scrollDown();
        	/*Logic to play game*/
        	var userChoice = guestUserMessage.val();
        	var computerChoice = Math.random();

        	//ComputerChoice Random Number to Selection Conversion Statements
        	if(computerChoice <= 0.33)
        	{
        	    computerChoice = "Rock";
        	}
        	else if(computerChoice <= 0.66)
        	{
        	    computerChoice = "Paper";
        	}
        	else
        	{
        	    computerChoice = "Scissor";
        	}
        	
        	tellToUser(computerChoice);
        	scrollDown();
        	setTimeout(function(){
        		compareResult(userChoice, computerChoice);
        		scrollDown()
        	}, 2000);
        	
        }
        /*Play game*/
        else if(in_array(guestUserMessage.val(), playGameFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		playGameBot();
        		scrollDown()
        	}, 2000);
        }
        
        /*Friend*/
        else if(in_array(guestUserMessage.val(), friendFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		friendRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Website*/
        else if(in_array(guestUserMessage.val(), websiteFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		websiteRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Weakness*/
        if(in_array(guestUserMessage.val(), weaknessFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		weaknessRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Sports*/
        else if(in_array(guestUserMessage.val(), sportFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		sportRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Profile*/
        else if(in_array(guestUserMessage.val(), profileFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		profileRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Expereince*/
        if(in_array(guestUserMessage.val(), experienceFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		experienceRajendra();
        		scrollDown()
        	}, 2000);
        }
        /*Education*/
        else if(in_array(guestUserMessage.val(), educationFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		educationRajendra();
        		scrollDown()
        	}, 2000);
        }
        
        /*Send funnny image*/
        else if(in_array(guestUserMessage.val(), saySomethingMsgFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		funnyImageSend(iframeURLArray.doRandom());
        		scrollDown()
        	}, 2000);
        }
        /*---------------------*/
        /*Who is Rajendra arora*/
        else if(in_array(guestUserMessage.val(), whoIsRajendraFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		whoIsRajendraReply();
        		scrollDown()
        	}, 2000);
        }
        /*How to contact Rajendra?*/
        else if(in_array(guestUserMessage.val(), contactAddressFormat)){
        	getChatText(guestUserMessage.val());
        	setTimeout(function(){
        		howToContactRajendra();
        		scrollDown()
        	}, 2000);
        }
    }
}

function compareResult(choice1, choice2){
    if(choice1 === choice2)
    {
    	sendProperMessage("Hmm.. Looks like we both are intelligent.. :D"
		+"<br/><br/>Want to play agian?"
		+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a><br/>");
        /*alert("The result is a tie!");*/       
    }
    else if(choice1 === "Rock")
    {
        if(choice2 === "Scissor")
        {
        	sendProperMessage("ooh no! You won!.. :("
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");
        }
        else
        {
        	sendProperMessage("Yay!! I Won! :D"
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");   
        }
    }
    else if(choice1 === "Paper")
    {
        if(choice2 === "Rock")
        {
        	sendProperMessage("ooh no! You won!.. :("
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");
        }
        else
        {
        	sendProperMessage("Yay!! I Won! :D"
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");    
        }
    }
    else if(choice1 === "Scissor")
    {
    	if(choice2 === "Rock")
        {
    		sendProperMessage("Yay!! I Won! :D"
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");
        }
    	else{
    		sendProperMessage("ooh no! You won!.. :("
        			+"<br/><br/>Want to play agian?"
        			+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a>");
    	}
    }
}

function tellToUser(computerChoice){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>"+computerChoice+"</p>" 
		
		$(".chat-conversation").append(botMsg);        		
}

function sayHiRajendra(){
	sendProperMessage(
			"Hello! How can I help you with?" +
			"<br/><br/>Please select below:"+
			"<br/><br/>"+
			"<a class='chat_link_suggestion' onclick='who_is_rajendra();'>Who is Rajendra Arora?</a><br/><br/>"+
			"<table><tr>" +
			"<td><a class='chat_link_suggestion' onclick='contactAddress();'>Contact</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='education();'>Education</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='experience();'>Experience</a><br/><br/>"+
			"<td><a class='chat_link_suggestion' onclick='profile();'>Profile</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='sport()'>Sport</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='weakness();'>Weakness</a><br/><br/>"+
			"<tr><td><a class='chat_link_suggestion' onclick='website();'>Website</a><br/><br/>" +
			"<td><a class='chat_link_suggestion' onclick='friend();'>Friend</a><br/><br/>" +
			"<tr><td><a class='chat_link_suggestion' onclick='playgame();'>Play game</a>"); 
}

function playGameBot(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Okay! Let's play rock paper scissor. <br/>Let's see who one wins! :) <br /><br />Select below:<br/><br/></p>" 
		+"<br/><br/><a class='chat_link_suggestion' onclick='rock();'>Rock</a><br/><br/><a class='chat_link_suggestion' onclick='paper();'>Paper</a><br/><br/><a class='chat_link_suggestion' onclick='scissor();'>Scissor</a><br/><br/>"
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function friendRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Rajendra has a lot of friends. You are also one of them because you are discussing with me. :)</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function websiteRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Rajendra's personal website is below:<br/><br/><a target='_blank' class='socialProfileBot' href='https://www.rajendraarora.com'>https://www.rajendraarora.com<a/></p><br/><br/>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function weaknessRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Hummm.. Rajendra is kind of angry person. He may angry at you if you say anything to him while he sits in front of computer. <br/><br/>He is also forgetful type person.</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function sportRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Rajendra loves football.<br/><img src='https://i.stack.imgur.com/atZt8.jpg' style='width: 130px;height:120px;' alt='Rajendra Arora'> Sometimes he used to play. <br/>Don't have much information about sports as he usually spend mostly time in front of computer.</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function profileRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Yes, he sometime touches social networking profile:<br/><br/><a target='_blank' class='socialProfileBot' href='https://www.facebook.com/rajendra.arora.contact'>Facebook</a><br/><a target='_blank' class='socialProfileBot' href='https://twitter.com/rajendraarora16'>Twitter</a><br/><a target='_blank' class='socialProfileBot' href='https://github.com/rajendraarora16'>Github</a><br/><a target='_blank' class='socialProfileBot' href='https://stackoverflow.com/users/2802622/rajendra-arora'>Stackoverflow</a><br/><a target='_blank' class='socialProfileBot' href='https://www.instagram.com/rajendraarora16/'>Instagram</a><br/><a target='_blank' class='socialProfileBot' href='https://www.linkedin.com/in/rajendra-arora-a4066a108/'>Linkedin</a><br/><br/>One amazing thing would like to share about Rajendra. He was banned 100+ times from linkedin :D and got many complaints. Somehow just safe this one account, don't know how longer this one can be accessed. :D</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function experienceRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Currently Rajendra has overall 1.7 years of experience from Bookmyshow's organisation. <br/><br/>He is loving to work with Bookmyshow. <br/>Rajendra is involved with much more technologies like phantomjs (His favourite but now Chrome blink with headless), Node.js, Javascript, Java, JSP/Servlets, html, css, React.js, Redux etc.</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function educationRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>Rajendra has done his engineering from Rajasthan Technical University in 2016. Somehow he just completed education.</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function howToContactRajendra(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>You can reach him below with:<br/><br/><i>Email:</i> contact.rajendraarora@gmail.com<br/><i>Mobile:</i> +919982056614<br/><i>Skype:</i> rajendraarora147</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function whoIsRajendraReply(){
	var botMsg = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+"<p class='chat-msg_'>He's just a human not an intelligent bot like me! :D<br/><br/>Rajendra was born in Kota, Rajasthan and studied engineering from Rajasthan Techincal University.<br/><br/>Rajendra worked in a computer shop at age 14 to impress customers by solving windows problem and used to assemble computers.<br/>Rajendra is a much passionate about technology and always keen to learn something new. He assembled his first personal computer in 8th standard.<br/><img src='https://webbotbyrajendraarora.files.wordpress.com/2015/04/rajendra_pic.jpg' style='width:170px;height:120px;' alt='Rajendra Arora' /> <br/>And yes! I was created by him. :D</p>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(botMsg);scrollDown();
	}, 700);
}

function funnyImageSend(iframe){
	var sendPicture = "<div class='chat-message clearfix'>"
		+"<img src='./img/bot.png' alt='' width='32' height='32'>"
		+"<div class='chat-message-content clearfix'>"
		+"<span class='chat-time'>"+currentTime()+"</span>"
		+"<h5>Rajendra's Bot</h5>"
		+iframe
		+"<br/><br/><a class='chat_link_suggestion' onclick='sayHi();'>Say Hi</a><br/><br/>"
		
		
		
	$(".chat-feedback").fadeOut( "slow" );
	setTimeout(function(){
		$(".chat-conversation").append(sendPicture);scrollDown();
	}, 700);
}

Array.prototype.doRandom = function(){
  return this[Math.floor(Math.random()*this.length)];
}