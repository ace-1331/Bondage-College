"use strict";

// Loads the item extension properties
function InventoryItemNipplesNippleSuctionCupsLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { SuctionLevel: 0 };
	if (DialogFocusItem.Property.SuctionLevel == null) DialogFocusItem.Property.SuctionLevel = 0;
}

// Draw the item extension screen
function InventoryItemNipplesNippleSuctionCupsDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	DrawText(DialogFind(Player, "SuctionLevel" + DialogFocusItem.Property.SuctionLevel.toString()), 1500, 600, "White", "Gray");
	if(DialogFocusItem.Property.SuctionLevel > 0) DrawButton(1200, 650, 200, 55, DialogFind(Player, "Loose"), "White");
	if(DialogFocusItem.Property.SuctionLevel < 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "LightSuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel > 1) DrawButton(1550, 650, 200, 55, DialogFind(Player, "LightSuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel < 2) DrawButton(1200, 710, 200, 55, DialogFind(Player, "MediumSuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel > 2) DrawButton(1200, 710, 200, 55, DialogFind(Player, "MediumSuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel < 3) DrawButton(1550, 710, 200, 55, DialogFind(Player, "HeavySuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel > 3) DrawButton(1550, 710, 200, 55, DialogFind(Player, "HeavySuction"), "White");
	if(DialogFocusItem.Property.SuctionLevel < 4) DrawButton(1375, 770, 200, 55, DialogFind(Player, "MaximumSuction"), "White");
}

// Catches the item extension clicks
function InventoryItemNipplesNippleSuctionCupsClick() {
	if (CommonIsClickAt(1885, 25, 1975-1885, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1200, 650, 1400-1200, 705-650) && (DialogFocusItem.Property.SuctionLevel > 0)) InventoryItemNipplesNippleSuctionCupsIntensity(0 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.SuctionLevel < 1)) InventoryItemNipplesNippleSuctionCupsIntensity(1 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1550, 650, 1750-1550, 705-650) && (DialogFocusItem.Property.SuctionLevel > 1)) InventoryItemNipplesNippleSuctionCupsIntensity(1 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.SuctionLevel < 2)) InventoryItemNipplesNippleSuctionCupsIntensity(2 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1200, 710, 1400-1200, 765-710) && (DialogFocusItem.Property.SuctionLevel > 2)) InventoryItemNipplesNippleSuctionCupsIntensity(2 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.SuctionLevel > 3)) InventoryItemNipplesNippleSuctionCupsIntensity(3 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1550, 710, 1750-1550, 765-710) && (DialogFocusItem.Property.SuctionLevel < 3)) InventoryItemNipplesNippleSuctionCupsIntensity(3 - DialogFocusItem.Property.SuctionLevel);
	if (CommonIsClickAt(1375, 770, 1575-1375, 825-770) && (DialogFocusItem.Property.SuctionLevel < 4)) InventoryItemNipplesNippleSuctionCupsIntensity(4 - DialogFocusItem.Property.SuctionLevel);
}

// Sets the Nipple Suction Cups Level
function InventoryItemNipplesNippleSuctionCupsIntensity(Modifier) {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	DialogFocusItem.Property.SuctionLevel = DialogFocusItem.Property.SuctionLevel + Modifier;
	if (DialogFocusItem.Property.SuctionLevel == 0);
	if (DialogFocusItem.Property.SuctionLevel == 1);
	if (DialogFocusItem.Property.SuctionLevel == 2);
	if (DialogFocusItem.Property.SuctionLevel == 3);
	if (DialogFocusItem.Property.SuctionLevel == 4);
	if (C.ID == 0) ServerPlayerAppearanceSync();
	var Dictionary = [];
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
    ChatRoomPublishCustomAction("NipSuc" + ((Modifier > 0) ? "tightens" : "loosens") + "To" + DialogFocusItem.Property.SuctionLevel, true, Dictionary);
} 

