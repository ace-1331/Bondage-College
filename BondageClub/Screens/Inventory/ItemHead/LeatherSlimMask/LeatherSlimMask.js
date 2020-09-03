"use strict";

var InventoryItemHeadLeatherSlimMaskOptions = [
	{
		Name: "Unpolished",
		Property: { Type: null },
	},
	{
		Name: "Polished",
		Property: { Type: "Polished" },
	},
];

function InventoryItemHeadLeatherSlimMaskLoad() {
	ExtendedItemLoad(InventoryItemHeadLeatherSlimMaskOptions, "ItemHeadLeatherSlimMaskSelect");
}

function InventoryItemHeadLeatherSlimMaskDraw() {
	ExtendedItemDraw(InventoryItemHeadLeatherSlimMaskOptions, "ItemHeadLeatherSlimMask");
}

function InventoryItemHeadLeatherSlimMaskClick() {
	ExtendedItemClick(InventoryItemHeadLeatherSlimMaskOptions);
}

function InventoryItemHeadLeatherSlimMaskPublishAction(C, Option) {
	var msg = "ItemHeadLeatherSlimMaskSet" + Option.Name;
	var dictionary = [
		{ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber },
		{ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber },
	];
	ChatRoomPublishCustomAction(msg, true, dictionary);
}

function InventoryItemHeadLeatherSlimMaskNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "ItemHeadLeatherSlimMask" + Option.Name, "ItemArms");
}
