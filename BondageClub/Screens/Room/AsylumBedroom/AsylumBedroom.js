"use strict";
var AsylumBedroomBackground = "AsylumBedroom";

// Loads the room
function AsylumBedroomLoad() {
}

// Runs the room
function AsylumBedroomRun() {
	DrawCharacter(Player, 750, 0, 1);
	if (Player.CanWalk()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Entrance"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	if (LogValue("Committed", "Asylum") >= CurrentTime) {
		DrawButton(1885, 265, 90, 90, "", "White", "Icons/Bedroom.png", TextGet("Sleep"));
		DrawText(TextGet("RemainingTime"), 1800, 915, "white", "gray");
		DrawText(TimerToString(LogValue("Committed", "Asylum") - CurrentTime), 1800, 965, "white", "gray");
	}
}

// When the user clicks in the room
function AsylumBedroomClick() {
	if (CommonIsClickAt(750, 0, 1250-750, 1000-0)) CharacterSetCurrent(Player);
	if (CommonIsClickAt(1885, 25, 1975-1885, 115-25) && Player.CanWalk()) CommonSetScreen("Room", "AsylumEntrance");
	if (CommonIsClickAt(1885, 145, 1975-1885, 235-145)) InformationSheetLoadCharacter(Player);
	if (CommonIsClickAt(1885, 265, 1975-1885, 355-265) && (LogValue("Committed", "Asylum") >= CurrentTime)) window.location = window.location;
}