// TODO: images, animation
"use strict";

const InventoryItemDevicesKennelOptions = [
	{
		Name: "OpenNoPadding",
        ItemValue: { Door: false, Padding: false},
		Property: { Type: null }
	}, {
		Name: "OpenPadding",
        ItemValue: { Door: false, Padding: true},
		Property: { Type: "OpenPadding" }
    }, {
		Name: "ClosedNoPadding",
        ItemValue: { Door: true, Padding: false},
		Property: { Type: "Closed" }
    }, {
		Name: "ClosedPadding",
        ItemValue: { Door: true, Padding: true},
		Property: { Type: "ClosedPadding" }
    }
];

function InventoryItemDevicesKennelLoad() {
	ExtendedItemLoad(InventoryItemDevicesKennelOptions, "SelectKennelType");
}

function InventoryItemDevicesKennelDraw() {
	ExtendedItemDraw(InventoryItemDevicesKennelOptions, "KennelType");
}

function InventoryItemDevicesKennelClick() {
	ExtendedItemClick(InventoryItemDevicesKennelOptions);
}

function InventoryItemDevicesKennelPublishAction(C, Option, PreviousOption) {
	var msg = "KennelSet";
    if (Option.ItemValue.Padding != PreviousOption.ItemValue.Padding) {
        msg += Option.ItemValue.Padding ? "PA" : "PR"
    }
    if (Option.ItemValue.Door != PreviousOption.ItemValue.Door) {
        msg += Option.ItemValue.Door ? "DC" : "DO"
    }
    
	var Dictionary = [];
	Dictionary.push({ Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber });
	Dictionary.push({ Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber });
	ChatRoomPublishCustomAction(msg, true, Dictionary);
}

function InventoryItemDevicesKennelNpcDialog(C, Option) {
	C.CurrentDialog = DialogFind(C, "Kennel" + Option.Name, "ItemDevices");
}

function InventoryItemDevicesKennelValidate() {
	var Allowed = true;
	if (InventoryItemHasEffect(DialogFocusItem, "Lock", true)) {
		DialogExtendedMessage = DialogFind(Player, "CantChangeWhileLocked");
		Allowed = false;
	}
	return Allowed;
}

function AssetsItemDevicesKennelBeforeDraw({ PersistentData, L, Property, LayerType, C }) {
    const Data = PersistentData();
    const Properties = Property || {};
    const Type = Properties.Type ? Properties.Type : "Open";
    if (L !== "_Door") return;
    
    if (Data.DoorState >= 11 || Data.DoorState <= 1) Data.MustChange = false;
    
    if ((Data.DoorState < 10 && Type.startsWith("Closed")) || (Data.DoorState > 2  && !Type.startsWith("Closed"))) {
        if (Data.DrawRequested) Data.DoorState += Type.startsWith("Closed") ? 1 : -1;
        Data.MustChange = true;
        Data.DrawRequested = false;
        if (Data.DoorState < 11 && Data.DoorState > 1) return { LayerType: "A" + Data.DoorState };
    }
}

function AssetsItemDevicesKennelScriptDraw({ C, PersistentData, Item }) {
    const Data = PersistentData();
    const Properties = Item.Property || {};
    const Type = Properties.Type ? Properties.Type : "Open";
    const FrameTime = 200;
    
    if (typeof Data.DoorState !== "number") Data.DoorState =  Type.startsWith("Closed") ? 11 : 1;
	if (typeof Data.ChangeTime !== "number") Data.ChangeTime = CommonTime() + FrameTime;
    
	if (Data.MustChange && Data.ChangeTime < CommonTime()) {
        Data.ChangeTime = CommonTime() + FrameTime;
        Data.DrawRequested = true;
		AnimationRequestRefreshRate(C, FrameTime);
        AnimationRequestDraw(C);
    }
}