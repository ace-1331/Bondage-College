"use strict";

// Loads the item extension properties
function InventoryItemButtButtPumpLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { InflateLevel: 0 };
	if (DialogFocusItem.Property.InflateLevel == null) DialogFocusItem.Property.InflateLevel = 0;
}

// Draw the item extension screen
function InventoryItemButtButtPumpDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "InflateLevel" + DialogFocusItem.Property.InflateLevel.toString()), 1500, 600, "White", "Gray");
	if(DialogFocusItem.Property.InflateLevel > 0) DrawButton(1200, 650, 200, 55, DialogFind(Player, "Empty"), "White");
	if(DialogFocusItem.Property.InflateLevel < 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Light"), "White");
	if(DialogFocusItem.Property.InflateLevel > 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "Light"), "White");
	if(DialogFocusItem.Property.InflateLevel < 2) DrawButton(1200, 710, 200, 55, DialogFind(Player, "Inflated"), "White");
	if(DialogFocusItem.Property.InflateLevel > 2) DrawButton(1200, 710, 200, 55, DialogFind(Player, "Inflated"), "White");
	if(DialogFocusItem.Property.InflateLevel < 3) DrawButton(1550, 710, 200, 55, DialogFind(Player, "Bloated"), "White");
	if(DialogFocusItem.Property.InflateLevel > 3) DrawButton(1550, 710, 200, 55, DialogFind(Player, "Bloated"), "White");
	if(DialogFocusItem.Property.InflateLevel < 4) DrawButton(1375, 770, 200, 55, DialogFind(Player, "Maximum"), "White");
}

// Catches the item extension clicks
function InventoryItemButtButtPumpClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 650, 1400-1200, 705-650) && (DialogFocusItem.Property.InflateLevel > 0)) InventoryItemButtButtPumpIntensity(0 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.InflateLevel < 1)) InventoryItemButtButtPumpIntensity(1 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.InflateLevel > 1)) InventoryItemButtButtPumpIntensity(1 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.InflateLevel < 2)) InventoryItemButtButtPumpIntensity(2 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.InflateLevel > 2)) InventoryItemButtButtPumpIntensity(2 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.InflateLevel > 3)) InventoryItemButtButtPumpIntensity(3 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.InflateLevel < 3)) InventoryItemButtButtPumpIntensity(3 - DialogFocusItem.Property.InflateLevel);
	if (CommonIsClickAt(1375, 770, 1575-1375, 825-770) && (DialogFocusItem.Property.InflateLevel < 4)) InventoryItemButtButtPumpIntensity(4 - DialogFocusItem.Property.InflateLevel);
}

// Sets the Butt Pump Level
function InventoryItemButtButtPumpIntensity(Modifier) {
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
    ChatRoomPublishCustomAction("BPumps" + ((Modifier > 0) ? "pumps" : "deflates") + "To" + DialogFocusItem.Property.InflateLevel, true, Dictionary);
} 

