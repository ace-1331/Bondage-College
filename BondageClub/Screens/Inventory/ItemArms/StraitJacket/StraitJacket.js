"use strict";

// Loads the item extension properties
function InventoryItemArmsStraitJacketLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
	DialogFocusItem.Property.SelfUnlock = false;
}

// Draw the item extension screen
function InventoryItemArmsStraitJacketDraw() {
	
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	DrawText(DialogFind(Player, "StraitJacketSelectTightness"), 1500, 500, "white", "gray");
	DrawButton(1000, 550, 225, 225, "", (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Loose.png", 1000, 550);
	DrawText(DialogFind(Player, "StraitJacketPoseLoose"), 1125, 800, "white", "gray");
	DrawButton(1250, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Normal")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Normal.png", 1250, 550);
	DrawText(DialogFind(Player, "StraitJacketPoseNormal"), 1375, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Snug")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Snug.png", 1500, 550);
	DrawText(DialogFind(Player, "StraitJacketPoseSnug"), 1625, 800, "white", "gray");
	DrawButton(1750, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Tight")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Tight.png", 1750, 550);
	DrawText(DialogFind(Player, "StraitJacketPoseTight"), 1875, 800, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemArmsStraitJacketClick() {
	if (CommonIsClickAt(1885, 25, 90, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 1225-1000, 225) && (DialogFocusItem.Property.Restrain != null)) InventoryItemArmsStraitJacketSetPose(null);
	if (CommonIsClickAt(1250, 550, 1475-1250, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Normal"))) InventoryItemArmsStraitJacketSetPose("Normal");
	if (CommonIsClickAt(1500, 550, 1725-1500, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Snug"))) InventoryItemArmsStraitJacketSetPose("Snug");
	if (CommonIsClickAt(1750, 550, 1975-1750, 225) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Tight"))) InventoryItemArmsStraitJacketSetPose("Tight");
}

// Sets the cuffs pose (wrist, elbow, both or none)
function InventoryItemArmsStraitJacketSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemArmsStraitJacketLoad();
	}

	// Sets the new pose with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) {
		delete DialogFocusItem.Property.Difficulty;
	} else {
		if (NewPose == "Normal") DialogFocusItem.Property.Difficulty = 3;
		if (NewPose == "Snug") DialogFocusItem.Property.Difficulty = 6;
		if (NewPose == "Tight") DialogFocusItem.Property.Difficulty = 9;
	}

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "StraitJacketRestrain" + ((NewPose == null) ? "None" : NewPose);
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}