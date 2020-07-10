"use strict";

// Loads the item extension properties
function InventoryItemButtInflVibeButtPlugLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { InflateLevel: 0 };
	if (DialogFocusItem.Property.InflateLevel == null) DialogFocusItem.Property.InflateLevel = 0;
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Intensity: -1 };
	if (DialogFocusItem.Property.Intensity == null) DialogFocusItem.Property.Intensity = -1;
}

// Draw the item extension screen
function InventoryItemButtInflVibeButtPlugDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	if (DialogFocusItem.Property.Intensity >= 0)
		DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389 + Math.floor(Math.random() * 3) - 1, 227 + Math.floor(Math.random() * 3) - 1, 221, 221);
	else DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "InflateLevel" + DialogFocusItem.Property.InflateLevel.toString()), 1500, 750, "White", "Gray");
	if(DialogFocusItem.Property.InflateLevel > 0) DrawButton(1200, 775, 200, 55, DialogFind(Player, "Empty"), "White");
	if(DialogFocusItem.Property.InflateLevel < 1) DrawButton(1550, 775, 200, 55, DialogFind(Player, "Light"), "White");
	if(DialogFocusItem.Property.InflateLevel > 1) DrawButton(1550, 775, 200, 55, DialogFind(Player, "Light"), "White");
	if(DialogFocusItem.Property.InflateLevel < 2) DrawButton(1200, 835, 200, 55, DialogFind(Player, "Inflated"), "White");
	if(DialogFocusItem.Property.InflateLevel > 2) DrawButton(1200, 835, 200, 55, DialogFind(Player, "Inflated"), "White");
	if(DialogFocusItem.Property.InflateLevel < 3) DrawButton(1550, 835, 200, 55, DialogFind(Player, "Bloated"), "White");
	if(DialogFocusItem.Property.InflateLevel > 3) DrawButton(1550, 835, 200, 55, DialogFind(Player, "Bloated"), "White");
	if(DialogFocusItem.Property.InflateLevel < 4) DrawButton(1375, 895, 200, 55, DialogFind(Player, "Maximum"), "White");
	DrawText(DialogFind(Player, "Intensity" + DialogFocusItem.Property.Intensity.toString()), 1500, 525, "White", "Gray");
	if(DialogFocusItem.Property.Intensity > -1) DrawButton(1200, 550, 200, 55, DialogFind(Player, "TurnOff"), "White");
	if(DialogFocusItem.Property.Intensity < 0) DrawButton(1550, 550, 200, 55, DialogFind(Player, "Low"), "White");
	if(DialogFocusItem.Property.Intensity > 0) DrawButton(1550, 550, 200, 55, DialogFind(Player, "Low"), "White");
	if(DialogFocusItem.Property.Intensity < 1) DrawButton(1200, 610, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity > 1) DrawButton(1200, 610, 200, 55, DialogFind(Player, "Medium"), "White");
	if(DialogFocusItem.Property.Intensity < 2) DrawButton(1550, 610, 200, 55, DialogFind(Player, "High"), "White");
	if(DialogFocusItem.Property.Intensity > 2) DrawButton(1550, 610, 200, 55, DialogFind(Player, "High"), "White");
	if(DialogFocusItem.Property.Intensity < 3) DrawButton(1375, 670, 200, 55, DialogFind(Player, "Maximum"), "White");
}

// Catches the item extension clicks
function InventoryItemButtInflVibeButtPlugClick() {
	if (CommonIsClickAt(1885, 225, 90, 310-225)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 775, 1400-1200, 55) && (DialogFocusItem.Property.InflateLevel > 0)) InventoryItemButtInflVibeButtPlugInflation(0 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 775, 200, 55) && (DialogFocusItem.Property.InflateLevel < 1)) InventoryItemButtInflVibeButtPlugInflation(1 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 775, 200, 55) && (DialogFocusItem.Property.InflateLevel > 1)) InventoryItemButtInflVibeButtPlugInflation(1 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1200, 835, 200, 890-835) && (DialogFocusItem.Property.InflateLevel < 2)) InventoryItemButtInflVibeButtPlugInflation(2 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1200, 835, 200, 890-835) && (DialogFocusItem.Property.InflateLevel > 2)) InventoryItemButtInflVibeButtPlugInflation(2 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 835, 200, 890-835) && (DialogFocusItem.Property.InflateLevel > 3)) InventoryItemButtInflVibeButtPlugInflation(3 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 835, 200, 890-835) && (DialogFocusItem.Property.InflateLevel < 3)) InventoryItemButtInflVibeButtPlugInflation(3 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1375, 895, 1575-1375, 950-895) && (DialogFocusItem.Property.InflateLevel < 4)) InventoryItemButtInflVibeButtPlugInflation(4 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 550, 200, 605-550) && (DialogFocusItem.Property.Intensity > -1)) InventoryItemButtInflVibeButtPlugSetIntensity(-1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 550, 200, 605-550) && (DialogFocusItem.Property.Intensity < 0)) InventoryItemButtInflVibeButtPlugSetIntensity(0 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 550, 200, 605-550) && (DialogFocusItem.Property.Intensity > 0)) InventoryItemButtInflVibeButtPlugSetIntensity(0 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1200, 610, 200, 665-610) && (DialogFocusItem.Property.Intensity < 1)) InventoryItemButtInflVibeButtPlugSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1200, 610, 200, 665-610) && (DialogFocusItem.Property.Intensity > 1)) InventoryItemButtInflVibeButtPlugSetIntensity(1 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 610, 200, 665-610) && (DialogFocusItem.Property.Intensity > 2)) InventoryItemButtInflVibeButtPlugSetIntensity(2 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1550, 610, 200, 665-610) && (DialogFocusItem.Property.Intensity < 2)) InventoryItemButtInflVibeButtPlugSetIntensity(2 - DialogFocusItem.Property.Intensity);
	if (CommonIsClickAt(1375, 670, 1575-1375, 725-670) && (DialogFocusItem.Property.Intensity < 3)) InventoryItemButtInflVibeButtPlugSetIntensity(3 - DialogFocusItem.Property.Intensity);
}

// Sets the inflatable vibe butt plug pump Level
function InventoryItemButtInflVibeButtPlugInflation(Modifier) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	DialogFocusItem.Property.InflateLevel = DialogFocusItem.Property.InflateLevel + Modifier;
	if (DialogFocusItem.Property.InflateLevel == 0);
	if (DialogFocusItem.Property.InflateLevel == 1);
	if (DialogFocusItem.Property.InflateLevel == 2);
	if (DialogFocusItem.Property.InflateLevel == 3);
	if (DialogFocusItem.Property.InflateLevel == 4);
	if (C.ID == 0) ServerPlayerAppearanceSync();
	var Dictionary = [];
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
    ChatRoomPublishCustomAction("InflVibeButtPlug_Pump" + ((Modifier > 0) ? "pumps" : "deflates") + "To" + DialogFocusItem.Property.InflateLevel, true, Dictionary);

}

// Sets the inflatable vibe butt plug vibration Level
function InventoryItemButtInflVibeButtPlugSetIntensity(Modifier) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	DialogFocusItem.Property.Intensity = DialogFocusItem.Property.Intensity + Modifier;
	if (DialogFocusItem.Property.Intensity == -1) DialogFocusItem.Property.Effect = ["Egged"];
	if (DialogFocusItem.Property.Intensity == 0) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 1) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 2) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];
	if (DialogFocusItem.Property.Intensity == 3) DialogFocusItem.Property.Effect = ["Egged", "Vibrating"];	
	CharacterLoadEffect(C);
	if (C.ID == 0) ServerPlayerAppearanceSync();

	ChatRoomPublishCustomAction( "InflVibeButtPlug_Vibe" + ((Modifier > 0) ? "Increase" : "Decrease") + "To" + DialogFocusItem.Property.Intensity, true, [{Tag: "DestinationCharacterName", Text: C.Name, MemberNumber: C.MemberNumber}]);
}