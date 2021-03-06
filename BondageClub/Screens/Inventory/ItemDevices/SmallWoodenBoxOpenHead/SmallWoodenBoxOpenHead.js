"use strict";

// Loads the item extension properties
function InventoryItemDevicesSmallWoodenBoxOpenHeadLoad() {
	if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Pose: "Base" };
	if (DialogFocusItem.Property.Pose == null){
		DialogFocusItem.Property.Pose = DialogFocusItem.Property.Pose || "Base";
	}
}

// Draw the item extension screen
function InventoryItemDevicesSmallWoodenBoxOpenHeadDraw() {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	
	DrawRect(1387, 225, 225, 275, "white");
	DrawImageResize("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + DialogFocusItem.Asset.Name + ".png", 1389, 227, 221, 221);
	DrawTextFit(DialogFocusItem.Asset.Description, 1500, 475, 221, "black");
	if (DialogFocusItem.Property.Pose == "Yoked") DrawButton(1375, 700, 250, 65, DialogFind(Player, "HandsIn"), "White");
	if (DialogFocusItem.Property.Pose == "Base") DrawButton(1375, 700, 250, 65, DialogFind(Player, "HandsOut"), InventoryGet(C, "ItemArms") == null ? "White" : "Gray");
}

// Catches the item extension clicks
function InventoryItemDevicesSmallWoodenBoxOpenHeadClick() {
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	
	if ((MouseX >= 1885) && (MouseX <= 1975) && (MouseY >= 25) && (MouseY <= 110)) DialogFocusItem = null;
	if ((MouseX >= 1375) && (MouseX <= 1625) && (MouseY >= 700) && (MouseY <= 765) && (DialogFocusItem.Property.Pose == "Yoked")) InventoryItemDevicesSmallWoodenBoxOpenHeadSetPose("Base");
	if ((MouseX >= 1375) && (MouseX <= 1625) && (MouseY >= 700) && (MouseY <= 765) && (DialogFocusItem.Property.Pose == "Base") && InventoryGet(C, "ItemArms") == null) InventoryItemDevicesSmallWoodenBoxOpenHeadSetPose("Yoked");
}

// Sets the amount of beads
function InventoryItemDevicesSmallWoodenBoxOpenHeadSetPose(newPose) {
	// Gets the current item and character
	var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
	if ((CurrentScreen == "ChatRoom") || (DialogFocusItem == null)) {
		DialogFocusItem = InventoryGet(C, C.FocusGroup.Name);
		InventoryItemDevicesSmallWoodenBoxOpenHeadLoad();
	}
	
	// Set the new Pose
	if ((newPose == "Yoked" && InventoryGet(C, "ItemArms") == null) || newPose == "Base")
		DialogFocusItem.Property.Pose = newPose;
	else 
		return; // Does not allow to have your hands out if your hands are

    // Set blocks
    if (newPose == "Base") DialogFocusItem.Property.Block = ["ItemHands"];
    else DialogFocusItem.Property.Block = [];

	// Loads the correct pose and refresh the character
    DialogFocusItem.Property.SetPose = ["Kneel", newPose];
    CharacterRefresh(C);

    // Push Chatroom Event
    if (CurrentScreen == "ChatRoom") {
        var Dictionary = [];
        Dictionary.push({ Tag: "TargetCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
        Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
        if (newPose == "Base") ChatRoomPublishCustomAction("SmallWoodenBoxOpenHeadHandsIn", true, Dictionary);
        else ChatRoomPublishCustomAction("SmallWoodenBoxOpenHeadHandsOut", true, Dictionary);
    }

	// Rebuilds the inventory menu
	if (DialogInventory != null) {
		DialogFocusItem = null;
		DialogMenuButtonBuild(C);
	}

}