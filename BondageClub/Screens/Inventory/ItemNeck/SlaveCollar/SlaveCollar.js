"use strict"
var InventoryItemNeckSlaveCollarColorMode = false;
var InventoryItemNeckSlaveCollarColor = "Default";
var InventoryItemNeckSlaveCollarOffset = 0;

// Defines all the slave collar models
var InventoryItemNeckSlaveCollarTypes = [
    {
        Name: "",
        Image: "SlaveCollar",
        Property: null
    }, {
        Name: "SteelPosture",
        Image: "SteelPostureCollar",
        Property: { Type: "SteelPosture", Effect: [], Block: [] }
    }, {
        Name: "LeatherPosture",
        Image: "PostureCollar",
        Property: { Type: "LeatherPosture", Effect: [], Block: [] }
    },{
        Name: "PetCollar",
        Image: "PetCollar",
        Property: { Type: "PetCollar", Effect: [], Block: [] }
	},{
        Name: "HighCollar",
        Image: "HighCollar",
        Property: { Type: "HighCollar", Effect: [], Block: [] }
	},{
        Name: "LeatherCollarBell",
        Image: "LeatherCollarBell",
        Property: { Type: "LeatherCollarBell", Effect: [], Block: [] }
	},{
        Name: "LeatherCollarBow",
        Image: "LeatherCollarBow",
        Property: { Type: "LeatherCollarBow", Effect: [], Block: [] }
	},{
        Name: "MaidCollar",
        Image: "MaidCollar",
        Property: { Type: "MaidCollar", Effect: [], Block: [] }
	},{
        Name: "BatCollar",
        Image: "BatCollar",
        Property: { Type: "BatCollar", Effect: [], Block: [] }
	},{
        Name: "HighSecurityCollar",
        Image: "HighSecurityCollar",
        Property: { Type: "HighSecurityCollar", Effect: [], Block: [] }
	},{
        Name: "SpikeCollar",
        Image: "SpikeCollar",
        Property: { Type: "SpikeCollar", Effect: [], Block: [] }
	},{
        Name: "BordelleCollar",
        Image: "BordelleCollar",
        Property: { Type: "BordelleCollar", Effect: [], Block: [] }
	},{
        Name: "LeatherCorsetCollar",
        Image: "LeatherCorsetCollar",
        Property: { Type: "LeatherCorsetCollar", Effect: ["GagNormal"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"] }
	},{
        Name: "StrictPostureCollar",
        Image: "StrictPostureCollar",
        Property: { Type: "StrictPostureCollar", Effect: [], Block: [] }
	},{
        Name: "LatexPostureCollar",
        Image: "LatexPostureCollar",
        Property: { Type: "LatexPostureCollar", Effect: ["GagNormal"], Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"] }
	},{
        Name: "HeartCollar",
        Image: "HeartCollar",
        Property: { Type: "HeartCollar", Effect: [], Block: [] }
	},{
        Name: "NobleCorsetCollar",
        Image: "NobleCorsetCollar",
        Property: { Type: "NobleCorsetCollar", Effect: [], Block: [] }
	},{
        Name: "OrnateCollar",
        Image: "OrnateCollar",
        Property: { Type: "OrnateCollar", Effect: [], Block: [] }
	},{
        Name: "SlenderSteelCollar",
        Image: "SlenderSteelCollar",
        Property: { Type: "SlenderSteelCollar", Effect: [], Block: [] }
	},
];

// Loads the item extension properties
function InventoryItemNeckSlaveCollarLoad() {
	InventoryItemNeckSlaveCollarColorMode = false;
	var C = CharacterGetCurrent();
    var SC = InventoryItemNeckSlaveCollarTypes.find(element => (element.Name == "LoveLeatherCollar"));
    if (C && C.IsOwnedByPlayer() && C.IsLoverOfPlayer() && !SC) {
        InventoryItemNeckSlaveCollarTypes.push({
                Name: "LoveLeatherCollar",
                Image: "LoveLeatherCollar",
                Property: {Type: "LoveLeatherCollar", Effect: [], Block: []}
        });
    }
    else if (C && C.IsOwnedByPlayer && !C.IsLoverOfPlayer() && SC) { InventoryItemNeckSlaveCollarTypes.splice(InventoryItemNeckSlaveCollarTypes.indexOf(SC,1)); }
    if (DialogFocusItem.Property == null) DialogFocusItem.Property = { Type: null, Effect: [], Block: [] };
}

// Draw the item extension screen
function InventoryItemNeckSlaveCollarDraw() {

	// Only the character owner can use the controls in that screen
    var C = CharacterGetCurrent();
    if (C && C.IsOwnedByPlayer()) {
        if (InventoryItemNeckSlaveCollarColorMode) {

            // In color picking mode, we allow the user to change the collar color
            ElementPosition("InputColor", 1450, 65, 300);
            ColorPickerDraw(1300, 145, 675, 830, document.getElementById("InputColor"), function (Color) { DialogChangeItemColor(C, Color) });
            DrawButton(1665, 25, 90, 90, "", "White", "Icons/ColorSelect.png");
            DrawButton(1775, 25, 90, 90, "", "White", "Icons/ColorCancel.png");

        } else {

            // In regular mode, the owner can select the collar model and change the offset to get the next 8 models
            ColorPickerHide();
			DrawText(DialogFind(Player, "SlaveCollarSelectType"), 1500, 250, "white", "gray");
			DrawButton(1665, 25, 90, 90, "", "White", "Icons/Next.png");
			DrawButton(1775, 25, 90, 90, "", (DialogFocusItem.Color != null && DialogFocusItem.Color != "Default" && DialogFocusItem.Color != "None") ? DialogFocusItem.Color : "White", "Icons/ColorPick.png");
			for (var I = InventoryItemNeckSlaveCollarOffset; I < InventoryItemNeckSlaveCollarTypes.length && I < InventoryItemNeckSlaveCollarOffset + 8; I++) {
				var Type = DialogFocusItem && DialogFocusItem.Property && DialogFocusItem.Property.Type || "";
				DrawButton(1000 + ((I - InventoryItemNeckSlaveCollarOffset) % 4) * 250, 350 + Math.floor((I - InventoryItemNeckSlaveCollarOffset) / 4) * 300, 225, 275, "", (Type == InventoryItemNeckSlaveCollarTypes[I].Name) ? "#888888" : "White");
				DrawImage("Assets/" + DialogFocusItem.Asset.Group.Family + "/" + DialogFocusItem.Asset.Group.Name + "/Preview/" + InventoryItemNeckSlaveCollarTypes[I].Image + ".png", 1000 + ((I - InventoryItemNeckSlaveCollarOffset) % 4) * 250, 350 + Math.floor((I - InventoryItemNeckSlaveCollarOffset) / 4) * 300);
				DrawTextFit(AssetGet(DialogFocusItem.Asset.Group.Family, DialogFocusItem.Asset.Group.Name, InventoryItemNeckSlaveCollarTypes[I].Image).Description, 1112 + ((I - InventoryItemNeckSlaveCollarOffset) % 4) * 250, 600 + Math.floor((I - InventoryItemNeckSlaveCollarOffset) / 4) * 300, 221, 50, "white", "gray");
			}

		}
    }

}

// Catches the item extension clicks
function InventoryItemNeckSlaveCollarClick() {

	// When the user exits the screen
    if (CommonIsClickAt(1885, 25, 90, 85)) {
		ElementRemove("InputColor");
		DialogFocusItem = null;
		return;
	}

	// Only the character owner can use the controls in that screen
    var C = CharacterGetCurrent();
    if (C != null && C.IsOwnedByPlayer()) {
        if (InventoryItemNeckSlaveCollarColorMode) {

			// In color picking mode, we allow the user to change the collar color
            if (CommonIsClickAt(1665, 25, 90, 85)) {
                var Color = ElementValue("InputColor");
                if (CommonIsColor(Color)) {
                    CharacterAppearanceSetColorForGroup(C, Color, "ItemNeck");
                    InventoryItemNeckSlaveCollarColorMode = false;
                    ElementRemove("InputColor");
                    ChatRoomCharacterItemUpdate(C);
                    if (CurrentScreen != "ChatRoom") CharacterRefresh(C);
                    DialogFocusItem = null;
                }
            }
            if (CommonIsClickAt(1775, 25, 90, 85)) {
				InventoryItemNeckSlaveCollarColor = "Default";
                InventoryItemNeckSlaveCollarColorMode = false;
                CharacterAppearanceSetColorForGroup(C, InventoryItemNeckSlaveCollarColor, "ItemNeck");
                ElementRemove("InputColor");
                CharacterLoadCanvas(C);
            }
            if (CommonIsClickAt(1300, 145, 675, 830)) {
                var Color = DrawRGBToHex(MainCanvas.getImageData(MouseX, MouseY, 1, 1).data);
                CharacterAppearanceSetColorForGroup(C, Color, "ItemNeck");
                CharacterLoadCanvas(C);
                ElementValue("InputColor", Color);
            }

        } else {
			
			// In regular mode, the owner can select the collar model and change the offset to get the next 8 models
            if (CommonIsClickAt(1665, 25, 90, 85)) {
				InventoryItemNeckSlaveCollarOffset = InventoryItemNeckSlaveCollarOffset + 8;
				if (InventoryItemNeckSlaveCollarOffset >= InventoryItemNeckSlaveCollarTypes.length) InventoryItemNeckSlaveCollarOffset = 0;
            }
            if (CommonIsClickAt(1775, 25, 90, 85)) {
                InventoryItemNeckSlaveCollarColorMode = true;
                InventoryItemNeckSlaveCollarColor = DialogFocusItem.Color;
                ElementCreateInput("InputColor", "text", (DialogColorSelect != null) ? DialogColorSelect.toString() : "");
            }
			for (var I = InventoryItemNeckSlaveCollarOffset; I < InventoryItemNeckSlaveCollarTypes.length && I < InventoryItemNeckSlaveCollarOffset + 8; I++) {
                var Type = DialogFocusItem && DialogFocusItem.Property && DialogFocusItem.Property.Type || "";
                if ((MouseX >= 1000 + ((I - InventoryItemNeckSlaveCollarOffset) % 4) * 250) && (MouseX <= 1225 + ((I - InventoryItemNeckSlaveCollarOffset) % 4) * 250) && (MouseY >= 350 + Math.floor((I - InventoryItemNeckSlaveCollarOffset) / 4) * 300) && (MouseY <= 625 + Math.floor((I - InventoryItemNeckSlaveCollarOffset) / 4) * 300) && (Type != InventoryItemNeckSlaveCollarTypes[I].Name))
                    InventoryItemNeckSlaveCollarSetType(InventoryItemNeckSlaveCollarTypes[I].Name);
            }

        }
    }

}

// Sets the slave collar model
function InventoryItemNeckSlaveCollarSetType(NewType) {
    var C = (Player.FocusGroup != null) ? Player : CurrentCharacter;
    var Type = InventoryItemNeckSlaveCollarTypes.find(Collar => Collar.Name == NewType) || InventoryItemNeckSlaveCollarTypes[0];
    DialogFocusItem.Property = Type.Property;
    var Dictionary = [];
    Dictionary.push({Tag: "DestinationCharacter", Text: C.Name, MemberNumber: C.MemberNumber});
    Dictionary.push({Tag: "SourceCharacter", Text: Player.Name, MemberNumber: Player.MemberNumber});
    ChatRoomPublishCustomAction("SlaveCollarChangeType", true, Dictionary);
    CharacterRefresh(C);
}