"use strict";
var CellBackground = "Cell";
var CellMinutes = 5;
var CellOpenTimer = 0;
var CellKeyDepositStaff = null;

// Loads the cell screen
function CellLoad() {
	CellKeyDepositStaff = CharacterLoadNPC("NPC_Cell_KeyDepositStaff");
	CellKeyDepositStaff.AllowItem = false;
	CharacterSetActivePose(Player, null);
	CellOpenTimer = LogValue("Locked", "Cell");
	if (CellOpenTimer == null) CellOpenTimer = 0;
	if (CellOpenTimer > CurrentTime + 3600000) {
		LogDelete("Locked", "Cell");
		CellOpenTimer = 0;
	}
}

// Run the cell screen
function CellRun() {
	DrawCharacter(Player, 750, 0, 1);
	if (CellOpenTimer < CurrentTime) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Leave"));
	if (Player.CanKneel() && (CellOpenTimer > CurrentTime)) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Kneel.png", TextGet("Kneel"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	if (CellOpenTimer < CurrentTime) DrawButton(1885, 265, 90, 90, "", "White", "Icons/Cell.png", TextGet("Lock"));
	if (CellOpenTimer < CurrentTime) DrawButton(1885, 385, 90, 90, "", "White", "Icons/Plus.png", TextGet("AddTime"));
	if (CellOpenTimer < CurrentTime) DrawButton(1885, 505, 90, 90, "", "White", "Icons/Minus.png", TextGet("RemoveTime"));
	if (CellOpenTimer < CurrentTime) DrawButton(1885, 625, 90, 90, "", "White", "Icons/Chest.png", TextGet("KeyDeposit"));
	if (CellOpenTimer < CurrentTime) DrawText(TextGet("Timer") + " " + CellMinutes.toString() + " " + TextGet("Minutes"), 1620, 920, "White", "Black");
	else DrawText(TextGet("OpensIn") + " " + TimerToString(CellOpenTimer - CurrentTime), 1620, 920, "White", "Black");
}

// When the user clicks in the cell screen
function CellClick() {
	if (CommonIsClickAt(1885, 25, 90, 90) && Player.CanKneel() && (CellOpenTimer > CurrentTime)) CharacterSetActivePose(Player, (Player.ActivePose == null) ? "Kneel" : null);
	if (CommonIsClickAt(750, 0, 1250-750, 1000-0)) CharacterSetCurrent(Player);
	if (CommonIsClickAt(1885, 145, 90, 235-145)) InformationSheetLoadCharacter(Player);
	if (CellOpenTimer < CurrentTime) {
		if (CommonIsClickAt(1885, 25, 90, 90)) CommonSetScreen("Room", "MainHall");
		if (CommonIsClickAt(1885, 265, 90, 355-265)) CellLock(CellMinutes);
		if (CommonIsClickAt(1885, 385, 90, 475-385) && (CellMinutes < 60)) CellMinutes = CellMinutes + 5;
		if (CommonIsClickAt(1885, 505, 90, 595-505) && (CellMinutes > 5)) CellMinutes = CellMinutes - 5;
		if (CommonIsClickAt(1885, 625, 90, 715-625)) CharacterSetCurrent(CellKeyDepositStaff);
	}
}

// When the player gets locked in the cell
function CellLock(LockTime) {
	LogAdd("Locked", "Cell", CurrentTime + LockTime * 60000);
	CommonSetScreen("Room", "Cell");
}

// When the player leaves her keys in the deposit
function CellDepositKeys(DepositTime) {
	LogAdd("KeyDeposit", "Cell", CurrentTime + DepositTime * 3600000);
}