"use strict";

// Loads the item extension properties
function InventoryItemDevicesCribLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null, Effect: [] };
	DialogExtendedMessage = DialogFind(Player, "SelectCribState");
}

// Draw the item extension screen
function InventoryItemDevicesCribDraw() {

	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible positions and their requirements
	DrawText(DialogExtendedMessage, 1500, 475, "white", "gray");
	DrawButton(1050, 550, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Open") ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Open.png", 1050, 551);
	DrawText(DialogFind(Player, "CribOpen"), 1163, 800, "white", "gray");
	DrawButton(1387, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Closed")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Closed.png", 1387, 551);
	DrawText(DialogFind(Player, "CribClosed"), 1500, 800, "white", "gray");
	DrawButton(1725, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Stuffed")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Stuffed.png", 1725, 551);
	DrawText(DialogFind(Player, "CribStuffed"), 1838, 800, "white", "gray");

}

// Catches the item extension clicks
function InventoryItemDevicesCribClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1050, 550, 1275-1050, 775-550) && !InventoryItemHasEffect(DialogFocusItem, "Lock", true) && (DialogFocusItem.Property.Type != null)) InventoryItemDevicesCribSetType(null);
	if (CommonIsClickAt(1387, 550, 1612-1387, 775-550) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Closed"))) InventoryItemDevicesCribSetType("Closed");
	if (CommonIsClickAt(1725, 550, 1950-1725, 775-550) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Stuffed"))) InventoryItemDevicesCribSetType("Stuffed");
}

// Sets the Devices bondage position (Open, Closed, Stuffed)
function InventoryItemDevicesCribSetType(NewType) {
	
	// Loads the character and item
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemDevicesCribLoad();
	}

	// Sets the position, difficulty and blush effect
	DialogFocusItem.Property.Type = NewType;
	DialogFocusItem.Property.Effect = [];
	if (NewType == null) {
		DialogFocusItem.Property.SetPose = null;
		DialogFocusItem.Property.Difficulty = 0;
	}
	if (NewType == "Closed") {
        DialogFocusItem.Property.SetPose = null;
        DialogFocusItem.Property.AllowLock = true;
		DialogFocusItem.Property.Difficulty = 20;
	}
	if (NewType == "Stuffed") {
		DialogFocusItem.Property.SetPose = null;
		DialogFocusItem.Property.Difficulty = 24;
	}
	CharacterRefresh(C);

	// Sets the chatroom or NPC message
	if (CurrentScreen == "ChatRoom") {
		var msg = "CribSet" + ((NewType) ? NewType : "Open");
		var Dictionary = [];
		Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
		Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
		ChatRoomPublishCustomAction(msg, true, Dictionary);
	} else {
		DialogFocusItem = null;
		if (C.ID == 0) DialogMenuButtonBuild(C);
		else {
			C.CurrentDialog = DialogFind(C, "Crib" + ((NewType) ? NewType : "Open"), "ItemDevices");
			C.FocusGroup = null;
		}
	}

}