"use strict";

// Loads the item extension properties
function InventoryItemMouthDildoPlugGagLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null, Effect: ["GagVeryHeavy"] };
}

// Draw the item extension screen
function InventoryItemMouthDildoPlugGagDraw() {

	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible gag types
	DrawText(DialogFind(Player, "SelectGagType"), 1500, 500, "white", "gray");
	DrawButton(1175, 550, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Open") ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Open.png", 1175, 549);
	DrawText(DialogFind(Player, "PlugGagMouthTypeOpen"), 1288, 800, "white", "gray");
	DrawButton(1600, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Plug")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Plug.png", 1600, 549);
	DrawText(DialogFind(Player, "PlugGagMouthTypePlug"), 1713, 800, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemMouthDildoPlugGagClick() {
	if (CommonIsClickAt(1885, 25, 90, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1175, 550, 1400-1175, 225) && (DialogFocusItem.Property.Type != null)) InventoryItemMouthDildoPlugGagSetType(null);
	if (CommonIsClickAt(1600, 550, 1825-1600, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Plug"))) InventoryItemMouthDildoPlugGagSetType("Plug");
}

// Sets the gag type (Plug, Open)
function InventoryItemMouthDildoPlugGagSetType(NewType) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemMouthDildoPlugGagLoad();
	}
	DialogFocusItem.Property.Type = NewType;
	if (NewType == null) DialogFocusItem.Property.Effect = ["GagEasy"];
	else if (NewType == "Plug") DialogFocusItem.Property.Effect = ["BlockMouth", "GagVeryHeavy"];

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "DildoPlugGagMouthSet" + ((NewType) ? NewType : "Open");
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}