"use strict";

// Loads the item extension properties
function InventoryItemArmsCollarCuffsLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
	DialogFocusItem.Property.SelfUnlock = false;
}

// Draw the item extension screen
function InventoryItemArmsCollarCuffsDraw() {

	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	DrawText(DialogFind(Player, "CollarCuffsSelectTightness"), 1500, 500, "white", "gray");
	
	DrawButton(1000, 550, 225, 65, DialogFind(Player, "CollarCuffsPoseLoose"), (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
	
	DrawButton(1250, 550, 225, 65, DialogFind(Player, "CollarCuffsPoseNormal"), ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Normal")) ? "#888888" : "White");
	
	DrawButton(1500, 550, 225, 65, DialogFind(Player, "CollarCuffsPoseSnug"), ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "Snug")) ? "#888888" : "White");
	
	DrawButton(1750, 550, 225, 65, DialogFind(Player, "CollarCuffsPoseTight"), ((DialogFocusItem.Property.Restrain != null) && 
	(DialogFocusItem.Property.Restrain == "Tight")) ? "#888888" : "White");
}

// Catches the item extension clicks
function InventoryItemArmsCollarCuffsClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 1225-1000, 775-550) && (DialogFocusItem.Property.Restrain != null)) InventoryItemArmsCollarCuffsSetPose(null);
	if (CommonIsClickAt(1250, 550, 1475-1250, 775-550) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Normal"))) InventoryItemArmsCollarCuffsSetPose("Normal");
	if (CommonIsClickAt(1500, 550, 1725-1500, 775-550) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Snug"))) InventoryItemArmsCollarCuffsSetPose("Snug");
	if (CommonIsClickAt(1750, 550, 1975-1750, 775-550) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "Tight"))) InventoryItemArmsCollarCuffsSetPose("Tight");
}

// Sets the cuffs pose (wrist, elbow, both or none)
function InventoryItemArmsCollarCuffsSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemArmsCollarCuffsLoad();
	}

	// Sets the new pose with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) {
		delete DialogFocusItem.Property.Difficulty;
	} else {
		if (NewPose == "Normal") DialogFocusItem.Property.Difficulty = 9;
		if (NewPose == "Snug") DialogFocusItem.Property.Difficulty = 11;
		if (NewPose == "Tight") DialogFocusItem.Property.Difficulty = 14;
	}

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "CollarCuffsRestrain" + ((NewPose == null) ? "None" : NewPose);
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}