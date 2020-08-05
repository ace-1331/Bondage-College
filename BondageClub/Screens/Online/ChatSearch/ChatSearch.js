"use strict";
var ChatSearchBackground = "IntroductionDark";
var ChatSearchResult = [];
var ChatSearchRoomPerPage = 24;
var ChatSearchResultTotal = 0;
var ChatSearchLastQueryOffSet = null;
var ChatSearchLastQuerySearch = null;
var ChatSearchLastQuerySearchTime = 0;
var ChatSearchLastQueryJoin = "";
var ChatSearchLastQueryJoinTime = 0;
var ChatSearchResultOffset = 0;
var ChatSearchMessage = "";
var ChatSearchLeaveRoom = "MainHall";
var ChatSearchSafewordAppearance = null;
var ChatSearchSafewordPose = null;
var ChatSearchPreviousActivePose = null;

/**
 * Loads the chat search screen properties, creates the inputs and loads up the first 24 rooms.
 * @returns {void} - Nothing
 */
function ChatSearchLoad() {
	if (ChatSearchSafewordAppearance == null) {
		ChatSearchSafewordAppearance = Player.Appearance.slice(0);
		ChatSearchSafewordPose = Player.ActivePose;
	}
	Player.ArousalSettings.OrgasmCount = 0;
	ElementCreateInput("InputSearch", "text", "", "20");
	ChatSearchQuery();
	ChatSearchMessage = "";
}

/**
 * When the chat Search screen runs, draws the screen
 * @returns {void} - Nothing
 */
function ChatSearchRun() {

	// If we can show the chat room search result
	if (Array.isArray(ChatSearchResult) && (ChatSearchResult.length >= 1)) {
		
		// Show up to 24 results
		var X = 25;
		var Y = 25;
		for (var C = 0; C < ChatSearchResult.length && C < ChatSearchRoomPerPage; C++) {

			// Draw the room rectangle
			var HasFriends = ChatSearchResult[C].Friends != null && ChatSearchResult[C].Friends.length > 0;
			var IsFull = ChatSearchResult[C].MemberCount == ChatSearchResult[C].MemberLimit;
			DrawButton(X, Y, 630, 85, "", (HasFriends && IsFull ? "#448855" : HasFriends ? "#CFFFCF" : IsFull ? "#666" : "White"));
			DrawTextFit( (ChatSearchResult[C].Friends != null  && ChatSearchResult[C].Friends.length > 0 ? "(" + ChatSearchResult[C].Friends.length + ") " : "") + ChatSearchResult[C].Name + " - " + ChatSearchResult[C].Creator + " " + ChatSearchResult[C].MemberCount + "/" + ChatSearchResult[C].MemberLimit + "", X + 315, Y + 25, 620, "black");
			DrawTextFit(ChatSearchResult[C].Description, X + 315, Y + 62, 620, "black");

			// Moves the next window position
			X = X + 660;
			if (X > 1500) {
				X = 25;
				Y = Y + 109;
			}
		}

		// Draws the hovering text of friends in the current room
		if (!CommonIsMobile && (MouseX >= 25) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 875)) {

			// Finds the room where the mouse is hovering
			X = 25;
			Y = 25;
			for (var C = 0; C < ChatSearchResult.length && C < ChatSearchRoomPerPage; C++) {

				// Builds the friend list and shows it
				if ((MouseX >= X) && (MouseX <= X + 630) && (MouseY >= Y) && (MouseY <= Y + 85) && (ChatSearchResult[C].Friends != null) && (ChatSearchResult[C].Friends.length > 0)) {
					DrawTextWrap(TextGet("FriendsInRoom") + " " + ChatSearchResult[C].Name, (X > 1000) ? 685 : X + 660, (Y > 352) ? 352 : Y, 630, 60, "black", "#FFFF88", 1);
					for (var F = 0; F < ChatSearchResult[C].Friends.length; F++)
						DrawTextWrap(ChatSearchResult[C].Friends[F].MemberName + " (" + ChatSearchResult[C].Friends[F].MemberNumber + ")", (X > 1000) ? 685 : X + 660, ((Y > 352) ? 352 : Y) + 60 + F * 60, 630, 60, "black", "#FFFF88", 1);
				}

				// Moves the next window position
				X = X + 660;
				if (X > 1500) {
					X = 25;
					Y = Y + 109;
				}
			}

		}

	} else DrawText(TextGet("NoChatRoomFound"), 1000, 450, "White", "Gray");

	// Draw the bottom controls
	if (ChatSearchMessage == "") ChatSearchMessage = "EnterName";
	DrawText(TextGet(ChatSearchMessage), 160, 935, "White", "Gray");
	ElementPosition("InputSearch", 590, 926, 500);
	DrawButton(845, 898, 320, 64, TextGet("SearchRoom"), "White");
	DrawButton(1195, 898, 320, 64, TextGet("CreateRoom"), "White");
	if (ChatSearchResultTotal > ChatSearchRoomPerPage) DrawButton(1545, 885, 90, 90, "", "White", "Icons/Next.png");
	DrawButton(1765, 885, 90, 90, "", "White", "Icons/FriendList.png");
	DrawButton(1885, 885, 90, 90, "", "White", "Icons/Exit.png");
}

/**
 * Handles the click events on the chat search screen. Is called from CommonClick()
 * @returns {void} - Nothing
 */
function ChatSearchClick() {
	if ((MouseX >= 25) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 875) && Array.isArray(ChatSearchResult) && (ChatSearchResult.length >= 1)) ChatSearchJoin();
	if (MouseIn(845, 898, 320, 64)) ChatSearchQuery();
	if (MouseIn(1195, 898, 320, 64)) CommonSetScreen("Online", "ChatCreate");
	if (MouseIn(1545, 885, 90, 90)) { 
		ChatSearchResultOffset += ChatSearchRoomPerPage;
		if (ChatSearchResultOffset >= ChatSearchResultTotal) ChatSearchResultOffset = 0;
		ChatSearchQuery();
	}
	if (MouseIn(1765, 885, 90, 90)) { ElementRemove("InputSearch"); CommonSetScreen("Character", "FriendList"); FriendListReturn = "ChatSearch"; }
	if (MouseIn(1885, 885, 90, 90)) ChatSearchExit();
}

/**
 * Handles the key presses while in the chat search screen. When the user presses enter, we lauch the search query.
 * @returns {void} - Nothing
 */
function ChatSearchKeyDown() {
	if (KeyPress == 13) ChatSearchQuery();
}

/**
 * Handles exiting from the chat search screen, removes the input.
 * @returns {void} - Nothing
 */
function ChatSearchExit() {
	ChatSearchPreviousActivePose = Player.ActivePose;
	ElementRemove("InputSearch");
	CommonSetScreen("Room", ChatSearchLeaveRoom);
}

/**
 * Handles the clicks related to the chatroom list
 * @returns {void} - Nothing
 */
function ChatSearchJoin() {
	
	// Scans up to 24 results
	var X = 25;
	var Y = 25;
	for (var C = 0; C < ChatSearchResult.length && C < ChatSearchRoomPerPage; C++) {

		// If the player clicked on a valid room
		if ((MouseX >= X) && (MouseX <= X + 630) && (MouseY >= Y) && (MouseY <= Y + 85)) {
			var RoomName = ChatSearchResult[C].Name;
			if (ChatSearchLastQueryJoin != RoomName || (ChatSearchLastQueryJoin == RoomName && ChatSearchLastQueryJoinTime + 1000 < CommonTime())) {
				ChatSearchLastQueryJoinTime = CommonTime();
				ChatSearchLastQueryJoin = RoomName;
				ChatRoomPlayerCanJoin = true;
				ServerSend("ChatRoomJoin", { Name: RoomName });
			}
			
		}

		// Moves the next window position
		X = X + 660;
		if (X > 1500) {
			X = 25;
			Y = Y + 109;
		}
	}
}

/**
 * Handles the reception of the server response when joining a room or when getting banned/kicked
 * @param {string} data - Response from the server
 * @returns {void} - Nothing
 */
function ChatSearchResponse(data) {
	if ((data != null) && (typeof data === "string") && (data != "")) {
		if (((data == "RoomBanned") || (data == "RoomKicked")) && (CurrentScreen == "ChatRoom")) {
			if (CurrentCharacter != null) DialogLeave();
			ElementRemove("InputChat");
			ElementRemove("TextAreaChatLog");
			CommonSetScreen("Online", "ChatSearch");
			CharacterDeleteAllOnline();
		}
		ChatSearchMessage = "Response" + data;
	}
}

/**
 * Sends the search query data to the server. The response will be handled by ChatSearchResponse once it is received
 * @returns {void} - Nothing
 */
function ChatSearchQuery() {
	var Query = ElementValue("InputSearch").toUpperCase().trim();
	// Prevent spam searching the same thing.
	if (ChatSearchLastQueryOffSet != ChatSearchResultOffset || ChatSearchLastQuerySearch != Query || (ChatSearchLastQuerySearch == Query && ChatSearchLastQuerySearchTime + 2000 < CommonTime())) { 
		ChatSearchLastQueryOffSet = ChatSearchResultOffset;
		ChatSearchLastQuerySearch = Query;
		ChatSearchLastQuerySearchTime = CommonTime();
		ChatSearchResult = [];
		ServerSend("ChatRoomSearch", { Query: Query, Space: ChatRoomSpace, ShowFullRooms: (Player.ChatSettings && Player.ChatSettings.SearchShowsFullRooms), NbRooms: ChatSearchRoomPerPage, StartingRoom: ChatSearchResultOffset });
	}
}

/**
 * Handles the reception of chat room list data.
 * @param {object} data - Data object containing the full list of rooms found and the total rooms
 * @returns {void} - Nothing
 */
function ChatSearchQueryResponse(data) { 
	ChatSearchResult = data.Result;
	ChatSearchResultTotal = data.Total;
	if (ChatSearchResultTotal < ChatSearchResultOffset) ChatSearchResultOffset = 0;
}