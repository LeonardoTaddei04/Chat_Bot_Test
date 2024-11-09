const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-char");
const BOT_NAME = "BOT";
const PERSON_NAME = "YOUR NAME";
const prompts=["ciao", "come stai"]
const replies=[" ciaoo", "heheheh"]
const alternative=["u", "si", "ok"]
const robot=["sei un umano, puzzi"]

msgerForm.addEventListener("Submit", Event{
	event.preventDefault();
	const msgText = msgerInput.value;
	if(!msgText) return;
	msgerInput.value = "";
	addChat(PERSON_NAME, "right", msgText);
	output(msgText);
});
function output(input){
	let product;
	let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
	text = text 
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "Cos'è")
		.replace(/please /g, "")
		.replace(/please /g, "")
		.replace(/r u/g, "sei tu");
	if(compare(prompts, replies, text)){
		product = compare(prompts, replies,  text);
	} else if (text.match(/thank/gi)){
		product = "sei il benvenuto";
	} else if (text.match(/(robot|bot|robo)/gi)){
		product = robot[Math.floor(Math.random() * robot.length)]; 
	} else {
		product = alternative[Math.floor(Math.random() * alternative.length)];
	}
	const delay = input.split(" ").length * 100;
	setTimeout((){
		addChat(BOT_NAME, "left", product);
	}, delay);
}
function compare(promptsArray, repliesArray, string){
	let reply;
	let replyFound = false; 
	for(let x = 0; x < promtsArray.length; x++){
		for(let y = 0; y < promtsArray.length; y++){
			if(promptsArray[x][y] == String){
				let replies = repliesArray[x];
				reply = replies[Math.floor(Math.random() * replies.length)];
				replyFound = true;
				break;
			}
		}
		if(replyFound){
			break;
		}
	}
	return reply;
}
function addChat(name, side, text){
	const msgHTML = '
		<div class="msg${side}-msg">
			<div class="msg-bubble">
				<div class="msg-info">
					<div class="msg-info-name">${name}</div>
					<div class="msg-info-time">${formatDate(new Date())}</div>
				</div>
			</div>
		</div>
		';
		msgerChat.insertAdjacentHTML("beforeend", msgHTML);
		msgerChat.scrollTop += 500;
}
function get(selector, root = Document){
	return root.querySelector(selector);
}
function formatDate(date){
	const h = "0" + date.getHours();
	const m = "0" + date.getMinutes();
	return '${h.slice(-2)}:${m.slice(-2)}';
}
function random(min, max){
	return Math.floor(Math.random() * (max - min) + min);
}