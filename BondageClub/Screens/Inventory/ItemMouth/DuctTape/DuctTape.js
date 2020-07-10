"use strict";

// Loads the item extension properties
function InventoryItemMouthDuctTapeLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null, Effect: ["GagVeryLight"] };
}

// Draw the item extension screen
function InventoryItemMouthDuctTapeDraw() {
	
	// Draw the header and item
	DrawRect(1387, 100, 225, 275, "white");
	DrawText(DialogFind(Player, "SelectGagType"), 1500, 50, "white", "gray");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 102, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 350, 221, "black");

	// Draw the possible gag types
	DrawButton(1000, 450, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Small") ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Small.png", 1000, 449);
	DrawText(DialogFind(Player, "DuctTapeMouthTypeSmall"), 1113, 425, "white", "gray");
	DrawButton(1375, 450, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Crossed")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Crossed.png", 1375, 449);
	DrawText(DialogFind(Player, "DuctTapeMouthTypeCrossed"), 1488, 425, "white", "gray");
	DrawButton(1750, 450, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Full")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Full.png", 1750, 449);
	DrawText(DialogFind(Player, "DuctTapeMouthTypeFull"), 1863, 425, "white", "gray");
	DrawButton(1150, 750, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Double")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Double.png", 1150, 749);
	DrawText(DialogFind(Player, "DuctTapeMouthTypeDouble"), 1263, 725, "white", "gray");
	DrawButton(1600, 750, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Cover")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Cover.png", 1600, 749);
	DrawText(DialogFind(Player, "DuctTapeMouthTypeCover"), 1713, 725, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemMouthDuctTapeClick() {
	if (CommonIsClickAt(1885, 25, 90, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 450, 225, 225) && (DialogFocusItem.Property.Type != null)) InventoryItemMouthDuctTapeSetType(null);
	if (CommonIsClickAt(1375, 450, 1600-1375, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Crossed"))) InventoryItemMouthDuctTapeSetType("Crossed");
	if (CommonIsClickAt(1750, 450, 225, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Full"))) InventoryItemMouthDuctTapeSetType("Full");
	if (CommonIsClickAt(1150, 750, 1375-1150, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Double"))) InventoryItemMouthDuctTapeSetType("Double");
	if (CommonIsClickAt(1600, 750, 1825-1600, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Cover"))) InventoryItemMouthDuctTapeSetType("Cover");
}

// Sets the gag type (small, cleave, otm, otn)
function InventoryItemMouthDuctTapeSetType(NewType) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemMouthDuctTapeLoad();
	}
	DialogFocusItem.Property.Type = NewType;
	if (NewType == null) DialogFocusItem.Property.Effect = ["BlockMouth", "GagVeryLight"];
	else if (NewType == "Crossed") DialogFocusItem.Property.Effect = ["BlockMouth", "GagVeryLight"];
	else if (NewType == "Full") DialogFocusItem.Property.Effect = ["BlockMouth", "GagLight"];
	else if (NewType == "Double") DialogFocusItem.Property.Effect = ["BlockMouth", "GagEasy"];
	else if (NewType == "Cover") DialogFocusItem.Property.Effect = ["BlockMouth", "GagNormal"];
	CharacterRefresh(C);
	var msg = "DuctTapeMouthSet" + ((NewType) ? NewType : "Small");
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
