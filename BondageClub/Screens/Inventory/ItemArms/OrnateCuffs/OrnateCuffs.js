"use strict";

var InventoryItemArmsOrnateCuffsOptions = [
	{
		Name: "None",
		Property: {
			Type: null,
			Difficulty: 0,
			Effect: [],
			SetPose: null,
			SelfUnlock: true,
		},
	},
	{
		Name: "Wrist",
		Property: {
			Type: "Wrist",
			Difficulty: 2,
			Effect: ["Block", "Prone"],
			SetPose: ["BackBoxTie"],
			SelfUnlock: true,
		},
	},
	{
		Name: "Elbow",
		Property: {
			Type: "Elbow",
			Difficulty: 4,
			Effect: ["Block", "Prone"],
			SetPose: ["BackElbowTouch"],
			SelfUnlock: false,
		},
	},
	{
		Name: "Both",
		Property: {
			Type: "Both",
			Difficulty: 6,
			Effect: ["Block", "Prone"],
			SetPose: ["BackElbowTouch"],
			SelfUnlock: false,
		},
	}
];

// Loads the item extension properties
function InventoryItemArmsOrnateCuffsLoad() {
	ExtendedItemLoad(InventoryItemArmsOrnateCuffsOptions, "SelectBondagePosition");
}

// Draw the item extension screen
function InventoryItemArmsOrnateCuffsDraw() {
	ExtendedItemDraw(InventoryItemArmsOrnateCuffsOptions, "OrnateCuffsPose");
}

// Catches the item extension clicks
function InventoryItemArmsOrnateCuffsClick() {
	ExtendedItemClick(InventoryItemArmsOrnateCuffsOptions);
}

// Publishes the type change to the room
function InventoryItemArmsOrnateCuffsPublishAction(C, Option) {
	var msg = "OrnateCuffsRestrain" + Option.Name;
	var Dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

// Sets the NPC dialog for the type change
function InventoryItemArmsOrnateCuffsNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemArmsOrnateCuffs" + Option.Name, "ItemArms");
}