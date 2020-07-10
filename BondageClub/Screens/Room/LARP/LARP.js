"use strict";
var LARPBackground = "WrestlingRing";
var LARPOrganiser = null;

// Loads the LARP screen NPC
function LARPLoad() {
	if (LARPOrganiser == null) {		
		LARPOrganiser = CharacterLoadNPC("NPC_LARP_Organiser");
		CharacterNaked(LARPOrganiser);
		InventoryWear(LARPOrganiser, "SteampunkCorsetTop1", "Cloth", "Default");
		InventoryWear(LARPOrganiser, "LatexSkirt2", "ClothLower", "#666666");
		InventoryWear(LARPOrganiser, "Sandals", "Shoes", "#666666");
		LARPOrganiser.AllowItem = false;
	}
}

// Run the LARP screen (The screen can be used for the search daily job)
function LARPRun() {
	if (!DailyJobSubSearchIsActive()) DrawCharacter(Player, 500, 0, 1);
	if (!DailyJobSubSearchIsActive()) DrawCharacter(LARPOrganiser, 1000, 0, 1);
	DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Leave"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	if ((ReputationGet("LARP") >= 1) && (Player.Game != null) && (Player.Game.LARP != null) && (Player.Game.LARP.Class != null)) 
		DrawButton(1885, 265, 90, 90, "", Player.CanChange() ? "White" : "Pink", "Icons/Battle.png", TextGet("Battle"));
	DailyJobSubSearchRun();
}

// When the user clicks in the LARP screen
function LARPClick() {
	if (!DailyJobSubSearchIsActive() && CommonIsClickAt(500, 0, 500, 1000)) CharacterSetCurrent(Player);
	if (!DailyJobSubSearchIsActive() && CommonIsClickAt(1000, 0, 1500-1000, 1000-0)) CharacterSetCurrent(LARPOrganiser);	
	if (CommonIsClickAt(1885, 25, 90, 90)) CommonSetScreen("Room", "MainHall");
	if (CommonIsClickAt(1885, 145, 90, 235-145)) InformationSheetLoadCharacter(Player);
	if (CommonIsClickAt(1885, 265, 90, 355-265) && (ReputationGet("LARP") >= 1) && (Player.Game != null) && (Player.Game.LARP != null) && (Player.Game.LARP.Class != null) && Player.CanChange()) {
		Player.Game.LARP.Team = "None";
		ServerSend("AccountUpdate", { Game: Player.Game });
		var BG = CommonBackgroundList.slice();
		BG.unshift("WrestlingRing");
		ChatRoomStart("LARP", "LARP", "LARP", "WrestlingRingDark", BG);
	}
	DailyJobSubSearchClick();
}

// When the user selects a class
function LARPSelectClass(NewClass) {
	if (ReputationGet("LARP") <= 0) DialogSetReputation("LARP", 1);
	if (Player.Game == null) Player.Game = {};
	Player.Game.LARP = { Class: NewClass };
	ServerSend("AccountUpdate", { Game: Player.Game });
}