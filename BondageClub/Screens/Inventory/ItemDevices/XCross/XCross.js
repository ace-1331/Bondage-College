"use strict";

// Loads the item extension properties
function InventoryItemDevicesXCrossLoad() {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var addonItem = InventoryGet(C, "ItemAddon");
	if (addonItem != null && addonItem.Name == ("XCrossChains")) {
        C.FocusGroup = addonItem.Group;
        DialogLeaveFocusItem();
        DialogFocusItem = null;
		return;
	}
}

// Draw the item extension screen
function InventoryItemDevicesXCrossDraw() {
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
    var addonItem = InventoryGet(C, "ItemAddon");
	var itemBlocked = addonItem != null;
	var XCrossChains = InventoryItemCreate(C, "ItemAddon", "XCrossChains");
	var itemPermissionBlocked = InventoryIsPermissionBlocked(C, "XCrossChains", "ItemAddon") || !InventoryCheckLimitedPermission(C, XCrossChains);
	var itemCanWear = InventoryAllow(C, XCrossChains.Asset.Prerequisite);
    
    // Go to the links if we are wearing them
    if (addonItem && addonItem.Asset.Name == ("XCrossChains")) {
        C.FocusGroup = addonItem.Asset.Group;
        DialogLeaveFocusItem();
        DialogFocusItem = null;
        DialogInventoryBuild(C);
		return;
	}
    
	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	DrawButton(1389, 550, 225, 225, "", (itemBlocked || itemPermissionBlocked || !itemCanWear) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/XCrossChains.png", 1389, 550);
	DrawText(DialogFind(Player, "XCrossChainsAttach"), 1500, 800, "white", "gray");

	// Draw the message if the player is wearing clothes
	if (itemBlocked) { 
		DrawTextWrap(DialogFind(Player, "ItemAddonRemoveAddon"), 1100, 850, 800, 160, "White");
	} else if (itemPermissionBlocked) { 
		DrawTextWrap(DialogFind(Player, "ItemAddonUsedWithWrongPermissions"), 1100, 850, 800, 160, "White");
	} else if (!itemCanWear) { 
		DrawTextWrap(DialogText, 1100, 850, 800, 160, "White");
	}
}

// Catches the item extension clicks
function InventoryItemDevicesXCrossClick() {
	if (MouseIn(1885, 25, 90, 90)) DialogFocusItem = null;
    
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var itemBlocked = InventoryGet(C, "ItemAddon") != null;
	var XCrossChains = InventoryItemCreate(C, "ItemAddon", "XCrossChains");
	var itemPermissionBlocked = InventoryIsPermissionBlocked(C, "XCrossChains", "ItemAddon") || !InventoryCheckLimitedPermission(C, XCrossChains);
    var itemCanWear = InventoryAllow(C, XCrossChains.Asset.Prerequisite);
    
    if (MouseIn(1389, 550, 225, 225) && (!itemBlocked && !itemPermissionBlocked && itemCanWear)) InventoryItemDevicesXCrossAttachLinks();
}

// Sets the cuffs pose (wrist, elbow, both or none)
function InventoryItemDevicesXCrossAttachLinks() {
//TODO: WEAR AND CHECK PREREQUISITES BEFORE, ADD NEW CUSTOM MSG
	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemDevicesXCrossLoad();
	}

	var XCrossChains = InventoryItemCreate(C, "ItemAddon", "XCrossChains");

	// Do not continue if the item is blocked
	if (InventoryIsPermissionBlocked(C, "XCrossChains", "ItemAddon") || !InventoryCheckLimitedPermission(C, XCrossChains)) return;

	// Cannot be used with other addons or with bad prerequisites
	if (InventoryGet(C, "ItemAddon") != null || !InventoryAllow(C, XCrossChains.Asset.Prerequisite)) return;

	// Adds the links focus on it
    InventoryWear(C, "XCrossChains", "ItemAddon", DialogColorSelect);
    C.FocusGroup = XCrossChains.Asset.Group;

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "XCrossChainLinksAdd";
	var Dictionary = [];
	Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
	Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	Dictionary.push({Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
	ChatRoomPublishCustomAction(msg, true, Dictionary);
	ChatRoomCharacterItemUpdate(C, "ItemAddon");

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}
