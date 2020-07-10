"use strict";
var ChatAdminBackground = "Sheet";
var ChatAdminMessage = "";
var ChatAdminPrivate = false;
var ChatAdminBackgroundIndex = 0;
var ChatAdminBackgroundSelect = "";
var ChatAdminPrivate = false;
var ChatAdminLocked = false;
var ChatAdminBackgroundSelected = null;
var ChatAdminTemporaryData = null;

// When the chat admin screens loads
function ChatAdminLoad() {

	// If the current room background isn't valid, we pick the first one
	ChatAdminBackgroundSelect = ChatAdminBackgroundSelected || ChatRoomData.Background;
	ChatAdminBackgroundIndex = ChatCreateBackgroundList.indexOf(ChatAdminBackgroundSelect);
	if (ChatAdminBackgroundIndex < 0) ChatAdminBackgroundIndex = 0;
	ChatAdminBackgroundSelect = ChatCreateBackgroundList[ChatAdminBackgroundIndex];

	// Prepares the controls to edit a room
	ElementCreateInput("InputName", "text", ChatAdminTemporaryData ? ChatAdminTemporaryData.Name : ChatRoomData.Name, "20");
	document.getElementById("InputName").setAttribute("autocomplete", "off");
	ElementCreateInput("InputSize", "text", ChatAdminTemporaryData ? ChatAdminTemporaryData.Limit : ChatRoomData.Limit.toString(), "2");
	document.getElementById("InputSize").setAttribute("autocomplete", "off");
	ElementCreateTextArea("InputDescription");
	document.getElementById("InputDescription").setAttribute("maxLength", 100);
	document.getElementById("InputDescription").setAttribute("autocomplete", "off");
	ElementValue("InputDescription", ChatAdminTemporaryData ? ChatAdminTemporaryData.Description : ChatRoomData.Description);
	ElementCreateTextArea("InputAdminList");
	document.getElementById("InputAdminList").setAttribute("maxLength", 250);
	document.getElementById("InputAdminList").setAttribute("autocomplete", "off");
	ElementValue("InputAdminList", ChatAdminTemporaryData ? ChatAdminTemporaryData.AdminList : CommonConvertArrayToString(ChatRoomData.Admin));
	ElementCreateTextArea("InputBanList");
	document.getElementById("InputBanList").setAttribute("maxLength", 1000);
	document.getElementById("InputBanList").setAttribute("autocomplete", "off");
	ElementValue("InputBanList", ChatAdminTemporaryData ? ChatAdminTemporaryData.BanList : CommonConvertArrayToString(ChatRoomData.Ban));
	ChatAdminPrivate = ChatAdminTemporaryData ? ChatAdminTemporaryData.Private :ChatRoomData.Private;
	ChatAdminLocked = ChatAdminTemporaryData ? ChatAdminTemporaryData.Locked : ChatRoomData.Locked;

	// If the player isn't an admin, we disable the inputs
	if (!ChatRoomPlayerIsAdmin()) {
		document.getElementById("InputName").setAttribute("disabled", "disabled");
		document.getElementById("InputDescription").setAttribute("disabled", "disabled");
		document.getElementById("InputAdminList").setAttribute("disabled", "disabled");
		document.getElementById("InputBanList").setAttribute("disabled", "disabled");
		document.getElementById("InputSize").setAttribute("disabled", "disabled");
		ChatAdminMessage = "AdminOnly";
	} else ChatAdminMessage = "UseMemberNumbers";

}

// When the chat Admin screen runs
function ChatAdminRun() {

	// Draw the main controls
	DrawText(TextGet(ChatAdminMessage), 650, 885, "Black", "Gray");
	DrawText(TextGet("RoomName"), 535, 110, "Black", "Gray");
	ElementPosition("InputName", 535, 170, 820);
	DrawText(TextGet("RoomSize"), 1100, 110, "Black", "Gray");
	ElementPosition("InputSize", 1100, 170, 250);
	DrawText(TextGet("RoomDescription"), 675, 255, "Black", "Gray");
	ElementPosition("InputDescription", 675, 350, 1100, 140);
	DrawText(TextGet("RoomAdminList"), 390, 490, "Black", "Gray");
	ElementPosition("InputAdminList", 390, 685, 530, 300);
	DrawText(TextGet("RoomBanList"), 960, 490, "Black", "Gray");
	ElementPosition("InputBanList", 960, 640, 530, 210);
	DrawButton(695, 770, 250, 65, TextGet("QuickbanBlackList"), ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4");
	DrawButton(975, 770, 250, 65, TextGet("QuickbanGhostList"), ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4");

	// Background selection
	DrawImageResize("Backgrounds/" + ChatAdminBackgroundSelect + "Dark.jpg", 1300, 75, 600, 400);
	DrawBackNextButton(1350, 500, 500, 65, DialogFind(Player, ChatAdminBackgroundSelect), ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4", null,
		() => DialogFind(Player, (ChatAdminBackgroundIndex == 0) ? ChatCreateBackgroundList[ChatCreateBackgroundList.length - 1] : ChatCreateBackgroundList[ChatAdminBackgroundIndex - 1]),
		() => DialogFind(Player, (ChatAdminBackgroundIndex >= ChatCreateBackgroundList.length - 1) ? ChatCreateBackgroundList[0] : ChatCreateBackgroundList[ChatAdminBackgroundIndex + 1]));
	DrawButton(1450, 600, 300, 65, TextGet("ShowAll"),  ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4");

	// Private and Locked check boxes
	DrawText(TextGet("RoomPrivate"), 1384, 740, "Black", "Gray");
	DrawButton(1486, 708, 64, 64, "", ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4", ChatAdminPrivate ? "Icons/Checked.png" : "");
	DrawText(TextGet("RoomLocked"), 1684, 740, "Black", "Gray");
	DrawButton(1786, 708, 64, 64, "", ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4", ChatAdminLocked ? "Icons/Checked.png" : "");

	// Save & Cancel/Exit buttons + help text
	DrawButton(1325, 840, 250, 65, TextGet("Save"), ChatRoomPlayerIsAdmin() ? "White" : "#ebebe4");
	DrawButton(1625, 840, 250, 65, TextGet(ChatRoomPlayerIsAdmin() ? "Cancel" : "Exit"), "White");
}

// When the player clicks in the chat Admin screen
function ChatAdminClick() {

	// When the user cancels/exits
	if (CommonIsClickAt(1625, 840, 1875-1625, 905-840)) ChatAdminExit();

	// All other controls are for administrators only
	if (ChatRoomPlayerIsAdmin()) {

		// When we select a new background
		if (CommonIsClickAt(1350, 500, 1850-1350, 565-500)) {
			ChatAdminBackgroundIndex += ((MouseX < 1600) ? -1 : 1);
			if (ChatAdminBackgroundIndex >= ChatCreateBackgroundList.length) ChatAdminBackgroundIndex = 0;
			if (ChatAdminBackgroundIndex < 0) ChatAdminBackgroundIndex = ChatCreateBackgroundList.length - 1;
			ChatAdminBackgroundSelect = ChatCreateBackgroundList[ChatAdminBackgroundIndex];
		}

		// Private & Locked check boxes + save button + quickban buttons
		if (CommonIsClickAt(1486, 708, 1550-1486, 772-708)) ChatAdminPrivate = !ChatAdminPrivate;
		if (CommonIsClickAt(1786, 708, 1850-1786, 772-708)) ChatAdminLocked = !ChatAdminLocked;
		if (CommonIsClickAt(1325, 840, 1575-1325, 905-840) && ChatRoomPlayerIsAdmin()) ChatAdminUpdateRoom();
		if (CommonIsClickAt(695, 770, 945-695, 835-770)) ElementValue("InputBanList", CommonConvertArrayToString(ChatRoomConcatenateBanList(true, false, CommonConvertStringToArray(ElementValue("InputBanList").trim()))));
		if (CommonIsClickAt(975, 770, 1225-975, 835-770)) ElementValue("InputBanList", CommonConvertArrayToString(ChatRoomConcatenateBanList(false, true, CommonConvertStringToArray(ElementValue("InputBanList").trim()))));
		
		if (CommonIsClickAt(1450, 600, 1750-1450, 665-600)) {
			// Save the input values before entering background selection
			ChatAdminTemporaryData = {
				Name: ElementValue("InputName"),
				Description: ElementValue("InputDescription"),
				Limit: ElementValue("InputSize"),
				AdminList: ElementValue("InputAdminList"),
				BanList: ElementValue("InputBanList"),
				Private: ChatAdminPrivate,
				Locked: ChatAdminLocked,
			};
			
			ElementRemove("InputName");
			ElementRemove("InputDescription");
			ElementRemove("InputSize");
			ElementRemove("InputAdminList");
			ElementRemove("InputBanList");
			BackgroundSelectionMake(ChatCreateBackgroundList, ChatAdminBackgroundIndex, Name => ChatAdminBackgroundSelected = Name);
		}
	}
}

// When the user exit from this screen
function ChatAdminExit() {
	ChatAdminBackgroundSelected = null;
	ChatAdminTemporaryData = null;
	ElementRemove("InputName");
	ElementRemove("InputDescription");
	ElementRemove("InputSize");
	ElementRemove("InputAdminList");
	ElementRemove("InputBanList");
	CommonSetScreen("Online", "ChatRoom");
}

// When the server sends a response, if it was updated properly we exit, if not we show the error
function ChatAdminResponse(data) {
	if ((data != null) && (typeof data === "string") && (data != ""))
		if (data === "Updated") ChatAdminExit();
		else ChatAdminMessage = "Response" + data;
}

// Sends the chat room update packet to the server and waits for the answer
function ChatAdminUpdateRoom() {
	var UpdatedRoom = {
		Name: ElementValue("InputName").trim(),
		Description: ElementValue("InputDescription").trim(),
		Background: ChatAdminBackgroundSelect,
		Limit: ElementValue("InputSize").trim(),
		Admin: CommonConvertStringToArray(ElementValue("InputAdminList").trim()),
		Ban: CommonConvertStringToArray(ElementValue("InputBanList").trim()),
		Private: ChatAdminPrivate,
		Locked: ChatAdminLocked
	};
	ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: UpdatedRoom, Action: "Update" });
	ChatAdminMessage = "UpdatingRoom";
}