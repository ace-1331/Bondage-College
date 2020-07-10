"use strict";

// Loads the item extension properties
function InventoryItemHeadOldGasMaskLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = {};
}

// Draw the item extension screen
function InventoryItemHeadOldGasMaskDraw() {
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");

	var C = CharacterGetCurrent();
	var tube1 = InventoryItemCreate(C, "ItemAddon", "OldGasMaskTube1");
	var tube2 = InventoryItemCreate(C, "ItemAddon", "OldGasMaskTube2");
	var rebreather = InventoryItemCreate(C, "ItemAddon", "OldGasMaskRebreather");
	var lenses = InventoryItemCreate(C, "ItemAddon", "OldGasMaskLenses");

	var itemBlocked = InventoryGet(C, "ItemAddon") != null;
	var tube1IsBlocked = InventoryIsPermissionBlocked(C, "OldGasMaskTube1", "ItemAddon") || !InventoryCheckLimitedPermission(C, tube1);
	var tube2IsBlocked = InventoryIsPermissionBlocked(C, "OldGasMaskTube2", "ItemAddon") || !InventoryCheckLimitedPermission(C, tube2);
	var rebreatherIsBlocked = InventoryIsPermissionBlocked(C, "OldGasMaskRebreather", "ItemAddon") || !InventoryCheckLimitedPermission(C, rebreather);
	var lensesIsBlocked = InventoryIsPermissionBlocked(C, "OldGasMaskLenses", "ItemAddon") || !InventoryCheckLimitedPermission(C, lenses);

	DrawButton(1250, 650, 200, 55, DialogFind(Player, "OldGasMaskLenses"), itemBlocked || lensesIsBlocked ? "#888" : "White");
	DrawButton(1550, 650, 200, 55, DialogFind(Player, "OldGasMaskTubeA"), itemBlocked || tube1IsBlocked ? "#888" : "White");
	DrawButton(1250, 750, 200, 55, DialogFind(Player, "OldGasMaskRebreather"), itemBlocked || rebreatherIsBlocked ? "#888" : "White");
	DrawButton(1550, 750, 200, 55, DialogFind(Player, "OldGasMaskTubeB"), itemBlocked || tube2IsBlocked ? "#888" : "White");

	// Draw the message if the player is wearing an addon
	if (itemBlocked) {
		DrawTextWrap(DialogFind(Player, "ItemAddonRemoveAddon"), 1100, 850, 800, 160, "White");
	} else if (tube1IsBlocked || tube2IsBlocked || lensesIsBlocked || rebreatherIsBlocked) { 
		DrawTextWrap(DialogFind(Player, "ItemAddonsSomeWrongPermissions"), 1100, 850, 800, 160, "White");
	}
}

// Catches the item extension clicks
function InventoryItemHeadOldGasMaskClick() {
	var C = CharacterGetCurrent();
	var itemBlocked = InventoryGet(C, "ItemAddon") != null;
	
	if (CommonIsClickAt(1885, 25, 90, 85)) DialogFocusItem = null;
	if (CommonIsClickAt(1885, 25, 90, 85)) DialogFocusItem = null;
	
	if (CommonIsClickAt(1250, 650, 1450-1250, 55) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskLenses");
	if (CommonIsClickAt(1550, 650, 200, 55) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskTube1");
	if (CommonIsClickAt(1250, 750, 1450-1250, 805-750) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskRebreather");
	if (CommonIsClickAt(1550, 750, 200, 805-750) && !itemBlocked) InventoryItemHeadOldGasMaskSetItem("OldGasMaskTube2");
	
}

// Sets the lenses
function InventoryItemHeadOldGasMaskSetItem(itemName) {

	// Loads the item
	var C = CharacterGetCurrent();
	if (CurrentScreen == "ChatRoom") {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemHeadOldGasMaskLoad();
	}

	var item = InventoryItemCreate(C, "ItemAddon", itemName);
	// Do not continue if the item is blocked by permissions
	if (InventoryIsPermissionBlocked(C, itemName, "ItemAddon") || !InventoryCheckLimitedPermission(C, item)) return;
	
	// Wear the item
	InventoryWear(C, itemName, "ItemAddon", DialogColorSelect);
	DialogFocusItem = InventoryGet(C, "ItemAddon");
	
	// Refreshes the character and chatroom
	CharacterRefresh(C);
	CharacterLoadEffect(C);
	var msg = "OldGasMaskUse" + itemName;
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	Dictionary.push({ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	ChatRoomCharacterItemUpdate(C, "ItemAddon");

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}
}
