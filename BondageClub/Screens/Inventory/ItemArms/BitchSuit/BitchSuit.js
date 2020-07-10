"use strict";

// Loads the item extension properties
function InventoryItemArmsBitchSuitLoad() {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null };
}

// Draw the item extension screen
function InventoryItemArmsBitchSuitDraw() {

	// Draw the item image and top controls
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	DrawRect(1387, 125, 225, 275, "white");
	DrawText(DialogFind(Player, "SelectSuitType"), 1500, 50, "white", "gray");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the suits options
	DrawButton(1150, 440, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Latex") ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Latex.png", 1150, 439);
	DrawText(DialogFind(Player, "BitchSuitTypeZipped"), 1263, 425, "white", "gray");
	DrawButton(1600, 440, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "UnZip")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/UnZip.png", 1600, 439);
	DrawText(DialogFind(Player, "BitchSuitTypeUnZip"), 1713, 425, "white", "gray");

}

// Catches the item extension clicks
function InventoryItemArmsBitchSuitClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1150, 440, 1375-1150, 665-440) && (DialogFocusItem.Property.Type != null)) InventoryItemArmsBitchSuitSetType(null);
	if (CommonIsClickAt(1600, 440, 1825-1600, 665-440) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "UnZip"))) InventoryItemArmsBitchSuitSetType("UnZip");
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
}

// Sets the suit properties when it's model changes
function InventoryItemArmsBitchSuitSetType(NewType) {

	// Sets the type, blocking zones and wand
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemArmsBitchSuitLoad();
	}
	if (NewType == null || NewType == "UnZip") DialogFocusItem.Property.Type = NewType;
	if (NewType == null) DialogFocusItem.Property.Block = ["ItemBreast", "ItemNipples", "ItemNipplesPiercings", "ItemVulva", "ItemVulvaPiercings", "ItemButt"];
	else if (NewType == "UnZip") DialogFocusItem.Property.Block = [];
	CharacterRefresh(C);

	// Pushes the change to the chatroom
	var msg = "BitchSuitSet" + ((NewType) ? NewType : "Zipped");
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}