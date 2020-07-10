"use strict";

// Loads the item extension properties
function InventoryItemVulvaPiercingsTapedClitEggLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Intensity: -1 };
}

// Draw the item extension screen
function InventoryItemVulvaPiercingsTapedClitEggDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	if (DialogFocusItem.Property.Intensity >= 0)
		DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389 + Math.floor(Math.random() * 3) - 1, 227 + Math.floor(Math.random() * 3) - 1, 221, 221);
	else DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "Intensity" + DialogFocusItem.Property.Intensity.toString()).replace("Item", DialogFocusItem.Asset.Description), 1500, 600, "White", "Gray");
	if(DialogFocusItem.Property.Intensity > -1) DrawButton(1200, 650, 200, 55, DialogFind(Player, "TurnOff"), "White");
	if(DialogFocusItem.Property.Intensity < 0) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Low"), "White");
	if(DialogFocusItem.Property.Intensity > 0) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Low"), "White");
	if(DialogFocusItem.Property.Intensity < 1) DrawButton(1200, 710, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity > 1) DrawButton(1200, 710, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity < 2) DrawButton(1550, 710, 200, 55, DialogFind(Player, "High"), "White");
	if(DialogFocusItem.Property.Intensity > 2) DrawButton(1550, 710, 200, 55, DialogFind(Player, "High"), "White");
	if(DialogFocusItem.Property.Intensity < 3) DrawButton(1375, 770, 200, 55, DialogFind(Player, "Maximum"), "White");
}

// Catches the item extension clicks
function InventoryItemVulvaPiercingsTapedClitEggClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 650, 1400-1200, 705-650) && (DialogFocusItem.Property.Intensity > -1)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(-1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.Intensity < 0)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(0 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.Intensity > 0)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(0 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.Intensity < 1)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.Intensity > 1)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.Intensity > 2)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(2 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.Intensity < 2)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(2 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1375, 770, 1575-1375, 825-770) && (DialogFocusItem.Property.Intensity < 3)) InventoryItemVulvaPiercingsTapedClitEggSetIntensity(3 - DialogFocusItem.Property.Intensity);
}

// Sets the vibrating egg intensity
function InventoryItemVulvaPiercingsTapedClitEggSetIntensity(Modifier) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	DialogFocusItem.Property.Intensity = DialogFocusItem.Property.Intensity + Modifier;
	if (DialogFocusItem.Property.Intensity == -1) DialogFocusItem.Property.Effect = ["Egged"];
	if (DialogFocusItem.Property.Intensity == 0) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 1) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 2) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 3) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];	
	CharacterLoadEffect(C);
	if (C.ID == 0) ServerPlayerAppearanceSync();

	ChatRoomPublishCustomAction("TapedClitEgg" + ((Modifier > 0) ? "Increase" : "Decrease") + "To" + DialogFocusItem.Property.Intensity, true, [{Tag: "DestinationCharacterName", Text: C.Name, MemberNumber: C.MemberNumber}]);
}