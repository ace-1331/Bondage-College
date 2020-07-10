"use strict";

// Loads the item extension properties
function InventoryItemPelvisMetalChastityBeltLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
}

// Draw the item extension screen
function InventoryItemPelvisMetalChastityBeltDraw() {

	// Draw the header and item
	DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	if (!InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		DrawText(DialogFind(Player, "SelectBackShield"), 1500, 550, "white", "gray");
		DrawButton(1200, 675, 250, 65, DialogFind(Player, "ChastityOpenBack"), (DialogFocusItem.Property.Restrain == null) ? "#888888" : "White");
		DrawButton(1550, 675, 250, 65, DialogFind(Player, "ChastityClosedBack"), ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "ClosedBack")) ? "#888888" : "White");
	} 
	else DrawText(DialogFind(Player, "CantChangeWhileLocked"), 1500, 550, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemPelvisMetalChastityBeltClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 675, 1450-1200, 740-675) && !InventoryItemHasEffect(DialogFocusItem, "Lock", true) && (DialogFocusItem.Property.Restrain != null)) InventoryItemPelvisMetalChastityBeltSetPose(null);
	if (CommonIsClickAt(1550, 675, 1800-1550, 740-675) && !InventoryItemHasEffect(DialogFocusItem, "Lock", true) && (DialogFocusItem.Property.Restrain == null)) InventoryItemPelvisMetalChastityBeltSetPose("ClosedBack");
}

// Sets the Shield position (OpenBack, ClosedBack)
function InventoryItemPelvisMetalChastityBeltSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemPelvisMetalChastityBeltLoad();
	}

	// Sets the restrain with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) delete DialogFocusItem.Property.Block;
	else if (NewPose == "ClosedBack") DialogFocusItem.Property.Block = ["ItemButt"];

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "ChastityBeltBackShield" + ((NewPose == null) ? "OpenBack" : NewPose);
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