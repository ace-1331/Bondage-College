"use strict";

// Loads the item extension properties
function InventoryItemMouth2ClothGagLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null, Effect: ["GagVeryLight"] };
}

// Draw the item extension screen
function InventoryItemMouth2ClothGagDraw() {
	
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible gag types
	DrawText(DialogFind(Player, "SelectGagType"), 1500, 500, "white", "gray");
	DrawButton(1000, 550, 225, 225, "", (DialogFocusItem.Property.Type == null || DialogFocusItem.Property.Type == "Small") ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Small.png", 1000, 550);
	DrawText(DialogFind(Player, "ClothGagTypeSmall"), 1115, 800, "white", "gray");
//	DrawButton(1250, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "Cleave")) ? "#888888" : "White");
//	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Cleave.png", 1250, 550);
//	DrawText(DialogFind(Player, "ClothGagTypeCleave"), 1365, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "OTM")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/OTM.png", 1500, 550);
	DrawText(DialogFind(Player, "ClothGagTypeOTM"), 1615, 800, "white", "gray");
	DrawButton(1750, 550, 225, 225, "", ((DialogFocusItem.Property.Type != null) && (DialogFocusItem.Property.Type == "OTN")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/OTN.png", 1750, 550);
	DrawText(DialogFind(Player, "ClothGagTypeOTN"), 1865, 800, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemMouth2ClothGagClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 1225-1000, 225) && (DialogFocusItem.Property.Type != null)) InventoryItemMouth2ClothGagSetType(null);
//	if (CommonIsClickAt(1250, 550, 1475-1250, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "Cleave"))) InventoryItemMouth2ClothGagSetType("Cleave");
	if (CommonIsClickAt(1500, 550, 1725-1500, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "OTM"))) InventoryItemMouth2ClothGagSetType("OTM");
	if (CommonIsClickAt(1750, 550, 1975-1750, 225) && ((DialogFocusItem.Property.Type == null) || (DialogFocusItem.Property.Type != "OTN"))) InventoryItemMouth2ClothGagSetType("OTN");
}

// Sets the gag type (small, cleave, otm, otn)
function InventoryItemMouth2ClothGagSetType(NewType) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemMouth2ClothGagLoad();
	}
	DialogFocusItem.Property.Type = NewType;
	if (NewType == null) DialogFocusItem.Property.Effect = ["BlockMouth", "GagVeryLight"];
	else if (NewType == "OTM") DialogFocusItem.Property.Effect = ["BlockMouth", "GagEasy"];
	else if (NewType == "OTN") DialogFocusItem.Property.Effect = ["BlockMouth", "GagEasy"];

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "ClothGagSet" + ((NewType) ? NewType : "Small");
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
