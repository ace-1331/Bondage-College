"use strict";
var InventoryItemButtButtPlugLockMessage = "SelectAttachmentState";

// Loads the item extension properties
function InventoryItemButtButtPlugLockLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Restrain: null };
	InventoryItemButtButtPlugLockMessage = "SelectAttachmentState";
}

// check, if a short chain can be applied
function InventoryItemButtButtPlugLockChainShortPrerequesites(C) {
	var ChainShortPrerequisites = true;
	if (C.Pose.indexOf("Suspension") >= 0 || C.Pose.indexOf("StraitDressOpen") >= 0 || C.Pose.indexOf("SuspensionHogtied") >= 0 || C.Effect.indexOf("Mounted") >= 0) {
		ChainShortPrerequisites = false;
	} // if
	return ChainShortPrerequisites;
} //getChainShortPrerequesites

// Draw the item extension screen
function InventoryItemButtButtPlugLockDraw() {

	// Draw the header and item
	DrawRect(1387, 125, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 127, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 375, 221, "black");

	// Variables to check if short chain can be applied
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var ChainShortPrerequisites = InventoryItemButtButtPlugLockChainShortPrerequesites(C);

	// Draw the possible poses
	DrawText(DialogFind(Player, InventoryItemButtButtPlugLockMessage), 1500, 500, "white", "gray");
	DrawButton(1000, 550, 225, 225, "", ((DialogFocusItem.Property == null) || (DialogFocusItem.Property.Type == null)) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/Base.png", 1000, 550);
	DrawText(DialogFind(Player, "ButtPlugLockPoseBase"), 1125, 800, "white", "gray");
	DrawButton(1250, 550, 225, 225, "", ((DialogFocusItem.Property != null) && (DialogFocusItem.Property.Type == "ChainShort") || !ChainShortPrerequisites) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/ChainShort.png", 1250, 550);
	DrawText(DialogFind(Player, "ButtPlugLockPoseChainShort"), 1375, 800, "white", "gray");
	DrawButton(1500, 550, 225, 225, "", ((DialogFocusItem.Property.Restrain != null) && (DialogFocusItem.Property.Restrain == "ChainLong") || C.Pose.indexOf("Suspension") >= 0) ? "#888888" : "White");
	DrawImage("Screens/Inventory/" + DialogFocusItem.Asset.Group.Name + "/" + DialogFocusItem.Asset.Name + "/ChainLong.png", 1500, 550);
	DrawText(DialogFind(Player, "ButtPlugLockPoseChainLong"), 1625, 800, "white", "gray");
}

// Catches the item extension clicks
function InventoryItemButtButtPlugLockClick() {

	// Variables to check if short chain can be applied
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	var ChainShortPrerequisites = InventoryItemButtButtPlugLockChainShortPrerequesites(C);

	// Trigger click handlers
	if (CommonIsClickAt(1885, 25, 1975-1885, 110-25)) DialogFocusItem = null;
	if (CommonIsClickAt(1000, 550, 1225-1000, 775-550) && (DialogFocusItem.Property.Restrain != null)) InventoryItemButtButtPlugLockSetPose(null);
	if (CommonIsClickAt(1250, 550, 1475-1250, 775-550) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "ChainShort")) && ChainShortPrerequisites) InventoryItemButtButtPlugLockSetPose("ChainShort");
	if (CommonIsClickAt(1500, 550, 1725-1500, 775-550) && ((DialogFocusItem.Property.Restrain == null) || (DialogFocusItem.Property.Restrain != "ChainLong"))) InventoryItemButtButtPlugLockSetPose("ChainLong");
}


// Sets the item pose (shorts chains, long chains or none)
function InventoryItemButtButtPlugLockSetPose(NewPose) {

	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemButtButtPlugLockLoad();
	}

	// Sets the new pose with it's effects
	DialogFocusItem.Property.Restrain = NewPose;
	if (NewPose == null) {
		delete DialogFocusItem.Property.Effect;
		delete DialogFocusItem.Property.Type;
		delete DialogFocusItem.Property.SetPose;
		delete DialogFocusItem.Property.AllowPose;
	} else {
		DialogFocusItem.Property.Type = NewPose;
		if (NewPose == "ChainShort") {
			DialogFocusItem.Property.Effect = ["Freeze", "ForceKneel", "IsChained"];
			DialogFocusItem.Property.SetPose = ["Kneel"];
		}
		if (NewPose == "ChainLong") {
			DialogFocusItem.Property.SetPose = [""];
			DialogFocusItem.Property.Effect = ["Tethered", "IsChained"];
			DialogFocusItem.Property.AllowPose = ["Kneel", "Horse", "KneelingSpread"];
		}
	}

	// Adds the lock effect back if it was padlocked
	if ((DialogFocusItem.Property.LockedBy != null) && (DialogFocusItem.Property.LockedBy != "")) {
		if (DialogFocusItem.Property.Effect == null) DialogFocusItem.Property.Effect = [];
		DialogFocusItem.Property.Effect.push("Lock");
	}

	// Refreshes the character and chatroom
	CharacterRefresh(C);
	var msg = "ButtPlugLockRestrain" + ((NewPose == null) ? "Base" : NewPose);
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}