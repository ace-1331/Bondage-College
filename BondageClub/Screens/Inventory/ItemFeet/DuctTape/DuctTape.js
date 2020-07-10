"use strict";
var InventoryItemFeetDuctTapeMessage = "SelectTapeWrapping";

// Loads the item extension properties
function InventoryItemFeetDuctTapeLoad() {
	InventoryItemFeetDuctTapeMessage = "SelectTapeWrapping";
}

// Draw the item extension screen
function InventoryItemFeetDuctTapeDraw() {
	
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Draw the possible poses
	DrawText(DialogFind(Player, InventoryItemFeetDuctTapeMessage), 1500, 500, "white", "gray");
	DrawButton(1000, 550, 225, 225, "", (DialogFocusItem.Property == null) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Feet.png", 1000, 550);
	DrawText(DialogFind(Player, "DuctTapePoseFeet"), 1125, 800, "white", "gray");
	DrawButton(1250, 550, 225, 225, "", ((DialogFocusItem.Property != null) && (DialogFocusItem.Property.Type == "HalfFeet")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/HalfFeet.png", 1250, 550);
	DrawText(DialogFind(Player, "DuctTapePoseHalfFeet"), 1375, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property != null) && (DialogFocusItem.Property.Type == "MostFeet")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/MostFeet.png", 1500, 550);
	DrawText(DialogFind(Player, "DuctTapePoseMostFeet"), 1625, 800, "white", "gray");
	DrawButton(1750, 550, 225, 225, "", ((DialogFocusItem.Property != null) && (DialogFocusItem.Property.Type == "CompleteFeet")) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/CompleteFeet.png", 1750, 550);
	DrawText(DialogFind(Player, "DuctTapePoseCompleteFeet"), 1875, 800, "white", "gray");

}

// Catches the item extension clicks
function InventoryItemFeetDuctTapeClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 1225-1000, 775-550) && (DialogFocusItem.Property != null)) InventoryItemFeetDuctTapeSetPose(null);
	if (CommonIsClickAt(1250, 550, 1475-1250, 775-550) && ((DialogFocusItem.Property == null) || (DialogFocusItem.Property.Type != "HalfFeet"))) InventoryItemFeetDuctTapeSetPose("HalfFeet");
	if (CommonIsClickAt(1500, 550, 1725-1500, 775-550) && ((DialogFocusItem.Property == null) || (DialogFocusItem.Property.Type != "MostFeet"))) InventoryItemFeetDuctTapeSetPose("MostFeet");
	if (CommonIsClickAt(1750, 550, 1975-1750, 775-550) && ((DialogFocusItem.Property == null) || (DialogFocusItem.Property.Type != "CompleteFeet"))) InventoryItemFeetDuctTapeSetPose("CompleteFeet");
}

// Sets the duct tape type (the wraps require no clothes)
function InventoryItemFeetDuctTapeSetPose(NewPose) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((NewPose == null) || (InventoryGet(C, "ClothLower") == null)) {
		if (CurrentScreen == "ChatRoom") {
			DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
			InventoryItemFeetDuctTapeLoad();
		}
		if (NewPose == null) delete DialogFocusItem.Property;
		else {
			DialogFocusItem.Property = {SetPose: ["LegsClosed"], Type: NewPose};
			if (NewPose == "HalfFeet") DialogFocusItem.Property.Hide = ["ClothLower", "Shoes"];
			if (NewPose == "MostFeet") DialogFocusItem.Property.Hide = ["ClothLower", "Shoes"];
			if (NewPose == "CompleteFeet") DialogFocusItem.Property.Hide = ["ClothLower", "Shoes"];
			if (NewPose == "HalfFeet") DialogFocusItem.Property.Difficulty = 2;
			if (NewPose == "MostFeet") DialogFocusItem.Property.Difficulty = 4;
			if (NewPose == "CompleteFeet") DialogFocusItem.Property.Difficulty = 6;
		}
		CharacterRefresh(C);
		var msg = "DuctTapeRestrain" + ((NewPose == null) ? "Feet" : NewPose);
		var Dictionary = [];
		Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
		Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
		ChatRoomPublishCustomAction(msg, true, Dictionary);
		if (DialogInventory != null) {
			DialogFocusItem = null;
			DialogMenuButtonBuild(C);
		}
	} else InventoryItemFeetDuctTapeMessage = "RemoveClothesForItem";
}