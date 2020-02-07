"use strict";
var SubmissiveClubBackground = "Dungeon";
var SubmissiveClubHeadSub = null;
var SubmissiveClubRandomGirl = null;
var SubmissiveClubPlayerAppearance = null;
// Returns TRUE if the dialog situation is allowed


// Loads the club SubmissiveClub room, creates the two slaves
function SubmissiveClubLoad() {
	SubmissiveClubBackground = "Dungeon";
	if ((SubmissiveClubHeadSub == null) && (TextGet("HeadSlave") != "")) {
		SubmissiveClubHeadSub = CharacterLoadNPC("NPC_SubmissiveClub_HeadSub");
		SubmissiveClubHeadSub.Name = TextGet("HeadSlave") + " " + SubmissiveClubHeadSub.Name;
		CharacterNaked(SubmissiveClubHeadSub);
		InventoryWear(SubmissiveClubHeadSub, "SlaveCollar", "ItemNeck");
		SubmissiveClubRandomGirl = CharacterLoadNPC("NPC_SubmissiveClub_RandomGirl");
		SubmissiveClubRandomGirl.Name = TextGet("Slave") + " " + SubmissiveClubRandomGirl.Name;
		CharacterNaked(SubmissiveClubRandomGirl);
		InventoryWear(SubmissiveClubRandomGirl, "SlaveCollar", "ItemNeck");
		CharacterFullRandomRestrain(SubmissiveClubRandomGirl, "Lot");
		InventoryWear(SubmissiveClubRandomGirl, "MetalChastityBelt", "ItemPelvis");
		InventoryWear(SubmissiveClubRandomGirl, "MetalChastityBra", "ItemBreast");
		CharacterSetActivePose(SubmissiveClubRandomGirl, "Kneel");
	}
}

// Run the SubmissiveClub room, draw the 2 characters
function SubmissiveClubRun() {
	SubmissiveClubLoad();
	DrawCharacter(Player, 250, 0, 1);
	DrawCharacter(SubmissiveClubHeadSub, 750, 0, 1);
	DrawCharacter(SubmissiveClubRandomGirl, 1250, 0, 1);
	if (Player.CanWalk()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
	if (Player.CanKneel()) DrawButton(1885, 265, 90, 90, "", "White", "Icons/Kneel.png");
}

// When the user clicks in the SubmissiveClub room
function SubmissiveClubClick() {
	if ((MouseX >= 250) && (MouseX < 750) && (MouseY >= 0) && (MouseY < 1000)) CharacterSetCurrent(Player);
	if ((MouseX >= 750) && (MouseX < 1250) && (MouseY >= 0) && (MouseY < 1000)) {		
		CharacterSetCurrent(SubmissiveClubHeadSub);
	}
	if ((MouseX >= 1250) && (MouseX < 1750) && (MouseY >= 0) && (MouseY < 1000)) CharacterSetCurrent(SubmissiveClubRandomGirl);
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 25) && (MouseY < 115) && Player.CanWalk()) CommonSetScreen("Room", "MainHall");
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 145) && (MouseY < 235)) InformationSheetLoadCharacter(Player);
	if ((MouseX >= 1885) && (MouseX < 1975) && (MouseY >= 265) && (MouseY < 355) && Player.CanKneel()) CharacterSetActivePose(Player, (Player.ActivePose == null) ? "Kneel" : null);
}

