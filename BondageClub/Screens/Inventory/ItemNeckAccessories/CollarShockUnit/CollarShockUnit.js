"use strict";

// Loads the item extension properties
function InventoryItemNeckAccessoriesCollarShockUnitLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Intensity: 0, ShowText: true };
	if (DialogFocusItem.Property.Intensity == null) DialogFocusItem.Property.Intensity = 0;
	if (DialogFocusItem.Property.ShowText == null) DialogFocusItem.Property.ShowText = true;
}

// Draw the item extension screen
function InventoryItemNeckAccessoriesCollarShockUnitDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "Intensity" + DialogFocusItem.Property.Intensity.toString()).replace("Item", DialogFocusItem.Asset.Description), 1500, 600, "White", "Gray");
	if(DialogFocusItem.Property.Intensity > 0) DrawButton(1200, 650, 200, 55, DialogFind(Player, "Low"), "White");
	if(DialogFocusItem.Property.Intensity < 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity > 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity < 2) DrawButton(1375, 710, 200, 55, DialogFind(Player, "High"), "White");
	if( CurrentScreen == "ChatRoom") DrawButton(1325, 800, 64, 64, "", "White", DialogFocusItem.Property.ShowText ? "Icons/Checked.png" : "");
	if( CurrentScreen == "ChatRoom") DrawText(DialogFind(Player, "ShockCollarShowChat"), 1570, 833, "White", "Gray");
}

// Catches the item extension clicks
function InventoryItemNeckAccessoriesCollarShockUnitClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1325, 800, 1389-1325, 864-800) && (CurrentScreen == "ChatRoom")) {
		DialogFocusItem.Property.ShowText = !DialogFocusItem.Property.ShowText;
		DialogLeave();
	}
	if (CommonIsClickAt(1200, 650, 1400-1200, 705-650) && (DialogFocusItem.Property.Intensity > 0)) InventoryItemNeckAccessoriesCollarShockUnitSetIntensity(0 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.Intensity < 1)) InventoryItemNeckAccessoriesCollarShockUnitSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.Intensity > 1)) InventoryItemNeckAccessoriesCollarShockUnitSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1375, 710, 1575-1375, 765-710) && (DialogFocusItem.Property.Intensity < 2)) InventoryItemNeckAccessoriesCollarShockUnitSetIntensity(2 - DialogFocusItem.Property.Intensity);
}

// Sets the shock collar intensity
function InventoryItemNeckAccessoriesCollarShockUnitSetIntensity(Modifier) {
	
	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemNeckAccessoriesCollarShockUnitLoad();
	}

	DialogFocusItem.Property.Intensity = DialogFocusItem.Property.Intensity + Modifier;
	if (DialogFocusItem.Property.ShowText) {
		var Dictionary = [];
		Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
		Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
		ChatRoomPublishCustomAction("ShockCollarSet" + DialogFocusItem.Property.Intensity, true, Dictionary);
	}
	else
		DialogLeave();
		
}
