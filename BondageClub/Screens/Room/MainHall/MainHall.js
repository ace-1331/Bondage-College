"use strict";
var MainHallBackground = "MainHall";
var MainHallStartEventTimer = null;
var MainHallNextEventTimer = null;
var MainHallRandomEventOdds = 0; 
var MainHallMaid = null;
var MainHallIsMaid = false;
var MainHallIsHeadMaid = false;
var MainHallHasOwnerLock = false;
var MainHallHasSlaveCollar = false;
var MainHallTip = 0;

// Returns TRUE if a dialog option is available
function MainHallCanTrickMaid() { return (ManagementIsClubSlave() && SarahUnlockQuest) }

// Main hall loading
function MainHallLoad() {
	
	// Loads the variables and dialog
	ChatSearchSafewordAppearance = null;
	CharacterSetActivePose(Player, null);
	MainHallBackground = "MainHall";
	MainHallStartEventTimer = null;
	MainHallNextEventTimer = null;
	MainHallMaid = CharacterLoadNPC("NPC_MainHall_Maid");
	MainHallIsMaid = LogQuery("JoinedSorority", "Maid");
	MainHallIsHeadMaid = LogQuery("LeadSorority", "Maid");
	MainHallHasOwnerLock = InventoryCharacterHasOwnerOnlyRestraint(Player);
	for (var A = 0; A < Player.Appearance.length; A++)
		if (Player.Appearance[A].Asset.Name == "SlaveCollar")
			if (Player.Appearance[A].Property)
				MainHallHasSlaveCollar = true;
	MainHallTip = Math.floor(Math.random() * 20);
	CommonReadCSV("NoArravVar", "Room", "Management", "Dialog_NPC_Management_RandomGirl");
	CommonReadCSV("NoArravVar", "Room", "KidnapLeague", "Dialog_NPC_KidnapLeague_RandomKidnapper");
	CommonReadCSV("NoArravVar", "Room", "Private", "Dialog_NPC_Private_Custom");
	CommonReadCSV("NoArravVar", "Room", "AsylumEntrance", "Dialog_NPC_AsylumEntrance_KidnapNurse");
	CommonReadCSV("NoArravVar", "Room", "AsylumEntrance", "Dialog_NPC_AsylumEntrance_EscapedPatient");
	CommonReadCSV("NoArravVar", "Room", "Prison", "Dialog_NPC_Prison_Police");

}

// Run the main hall screen
function MainHallRun() {

	// If the player is dressed up while being a club slave, the maid intercepts her
	if ((CurrentCharacter == null) && ManagementIsClubSlave() && LogQuery("BlockChange", "Rule") && !Player.IsNaked() && (MainHallMaid.Dialog != null) && (MainHallMaid.Dialog.length > 0)) {
		MainHallMaid.Stage = "50";
		MainHallMaid.CurrentDialog = DialogFind(MainHallMaid, "ClubSlaveMustBeNaked");
		CharacterRelease(MainHallMaid);
		CharacterSetCurrent(MainHallMaid);
		MainHallStartEventTimer = null;
		MainHallNextEventTimer = null;
		return;
	}

	// If the player is a Mistress but her Dominant reputation has fallen
	if ((CurrentCharacter == null) && LogQuery("ClubMistress", "Management") && (ReputationGet("Dominant") < 50) && Player.CanTalk() && (MainHallMaid.Dialog != null) && (MainHallMaid.Dialog.length > 0)) {
		CommonSetScreen("Room", "Management");
		CharacterSetCurrent(MainHallMaid);
		CurrentScreen = "MainHall";
		MainHallMaid.Stage = "60";
		MainHallMaid.CurrentDialog = DialogFind(MainHallMaid, "MistressExpulsionIntro");
		return;
	}

	// Draws the character and main hall buttons
	DrawCharacter(Player, 750, 0, 1);
	MainCanvas.font = "italic 30px Arial";	
	DrawTextWrap(TextGet("Tip" + MainHallTip), 100, 800, 500, 200, "White");
	MainCanvas.font = "36px Arial";	
	
	// Char, Dressing, Exit & Chat
	DrawButton(1645, 25, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	if (Player.CanChange()) DrawButton(1765, 25, 90, 90, "", "White", "Icons/Dress.png", TextGet("Appearance"));
	DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png", TextGet("Exit"));
	DrawButton(1645, 145, 90, 90, "", "White", "Icons/Chat.png", TextGet("ChatRooms"));

	// The options below are only available if the player can move
	if (Player.CanWalk()) {

		// Shop & Private Room
		DrawButton(1765, 145, 90, 90, "", "White", "Icons/Shop.png", TextGet("Shop"));
		if (!LogQuery("LockOutOfPrivateRoom", "Rule")) DrawButton(1885, 145, 90, 90, "", "White", "Icons/Private.png", TextGet("PrivateRoom"));

		// Introduction, Maid & Management
		DrawButton(1645, 265, 90, 90, "", "White", "Icons/Introduction.png", TextGet("IntroductionClass"));
		DrawButton(1765, 265, 90, 90, "", "White", "Icons/Maid.png", TextGet("MaidQuarters"));
		DrawButton(1885, 265, 90, 90, "", "White", "Icons/Management.png", TextGet("ClubManagement"));

		// Kidnap League, Dojo, Explore/Sarah
		DrawButton(1645, 385, 90, 90, "", "White", "Icons/Kidnap.png", TextGet("KidnapLeague"));
		DrawButton(1765, 385, 90, 90, "", "White", "Icons/Dojo.png", TextGet("ShibariDojo"));
		if (SarahRoomAvailable) DrawButton(1885, 385, 90, 90, "", "White", "Icons/Explore.png", TextGet(SarahRoomLabel()));

		// Cell, Slave Market & Look for trouble
		DrawButton(1645, 505, 90, 90, "", "White", "Icons/Question.png", TextGet("LookForTrouble"));
		DrawButton(1765, 505, 90, 90, "", "White", "Icons/Gavel.png", TextGet("SlaveMarket"));
		DrawButton(1885, 505, 90, 90, "", "White", "Icons/Cell.png", TextGet("Cell"));

		// Asylum, College & LARP battles
		if (!ManagementIsClubSlave()) DrawButton(1645, 625, 90, 90, "", "White", "Icons/Battle.png", TextGet("LARPBattle"));
		if (!ManagementIsClubSlave()) DrawButton(1765, 625, 90, 90, "", "White", "Icons/College.png", TextGet("College"));
		DrawButton(1885, 625, 90, 90, "", "White", "Icons/Asylum.png", TextGet("Asylum"));

		// Draws the custom content rooms - Gambling, Prison & Photographic
		DrawButton(265, 25, 90, 90, "", "White", "Icons/Camera.png", TextGet("Photographic"));
		DrawButton(145, 25, 90, 90, "", "White", "Icons/Cage.png", TextGet("Prison"));
		DrawButton(25, 25, 90, 90, "", "White", "Icons/Random.png", TextGet("Gambling"));

		// Stable, Magic-Theater & Nursery
		DrawButton(265, 145, 90, 90, "", "White", "Icons/Diaper.png", TextGet("Nursery"));
		DrawButton(145, 145, 90, 90, "", "White", "Icons/Magic.png", TextGet("Magic"));
		DrawButton(25, 145, 90, 90, "", "White", "Icons/Horse.png", TextGet("Stable"));

		// Cafe
		DrawButton(25, 265, 90, 90, "", "White", "Icons/Refreshsments.png", TextGet("Cafe"));
	}

	// Check if there's a new maid rescue event to trigger
	if (!Player.CanInteract() || !Player.CanWalk() || !Player.CanTalk() || Player.IsShackled()) {
		if (MainHallNextEventTimer == null) {
			MainHallStartEventTimer = CommonTime();
			MainHallNextEventTimer = CommonTime() + 40000 + Math.floor(Math.random() * 40000);
		}
	} else {
		MainHallStartEventTimer = null;
		MainHallNextEventTimer = null;
	}
	
	// If we must send a maid to rescue the player
	if ((MainHallNextEventTimer != null) && (CommonTime() >= MainHallNextEventTimer)) {
		MainHallMaid.Stage = "0";
		CharacterRelease(MainHallMaid);
		CharacterSetCurrent(MainHallMaid);
		MainHallStartEventTimer = null;
		MainHallNextEventTimer = null;
	}
	
	// If we must show a progress bar for the rescue maid.  If not, we show the number of online players
	if ((!Player.CanInteract() || !Player.CanWalk() || !Player.CanTalk() || Player.IsShackled()) && (MainHallStartEventTimer != null) && (MainHallNextEventTimer != null)) {
		DrawText(TextGet("RescueIsComing"), 1750, 925, "White", "Black");
		DrawProgressBar(1525, 955, 450, 35, (1 - ((MainHallNextEventTimer - CommonTime()) / (MainHallNextEventTimer - MainHallStartEventTimer))) * 100);
	} else DrawText(TextGet("OnlinePlayers") + " " + CurrentOnlinePlayers.toString(), 1750, 960, "White", "Black");

}

// When the player walks to another room, she can be attacked by a random kidnapper
function MainHallWalk(RoomName) {

	// Each time the player travels from room to room, the odds raises for a random event
	if ((Math.random() * 100 < MainHallRandomEventOdds) || (RoomName == "Trouble")) {

		// Some circumstantial events have better odds of happening (player is club slave or escaped patient)
		MainHallRandomEventOdds = 0;
		var PlayerClubSlave = (ManagementIsClubSlave()) ? (Math.random() * 3) : 0;
		var PlayerEscapedAsylum = ((LogValue("Escaped", "Asylum") >= CurrentTime) && (CheatFactor("BlockRandomKidnap", 0) == 1)) ? (Math.random() * 3) : 0;
		var MeetEscapedPatient = ((ReputationGet("Asylum") > 0) && !Player.IsRestrained() && AsylumEntranceIsWearingNurseClothes()) ? (Math.random() * 2) : 0;
		var MeetKidnapper = ((ReputationGet("Kidnap") > 0) && (CheatFactor("BlockRandomKidnap", 0) == 1)) ? Math.random() : 0;
		var MeetClubSlave = Math.random();
		var MeetPolice = (LogQuery("Joined", "BadGirl")) ? (Math.random() * PrisonWantedPlayer()) : 0;

		// Starts the event with the highest value (picked at random)
		if ((MeetPolice > PlayerClubSlave) && (MeetPolice > PlayerEscapedAsylum) && (MeetPolice > MeetEscapedPatient) && (MeetPolice > MeetKidnapper) && (MeetPolice > MeetClubSlave)) PrisonMeetPoliceIntro("MainHall");
		else if ((PlayerClubSlave > PlayerEscapedAsylum) && (PlayerClubSlave > MeetEscapedPatient) && (PlayerClubSlave > MeetKidnapper) && (PlayerClubSlave > MeetClubSlave)) ManagementClubSlaveRandomIntro();
		else if ((PlayerEscapedAsylum > MeetEscapedPatient) && (PlayerEscapedAsylum > MeetKidnapper) && (PlayerEscapedAsylum > MeetClubSlave)) AsylumEntranceNurseCatchEscapedPlayer();
		else if ((MeetEscapedPatient > MeetKidnapper) && (MeetEscapedPatient > MeetClubSlave)) AsylumEntranceEscapedPatientMeet();
		else if (MeetKidnapper > MeetClubSlave) KidnapLeagueRandomIntro();
		else ManagementFindClubSlaveRandomIntro();

	} else {

		// Each time the player travels, the odds get better for a random event
		MainHallRandomEventOdds = MainHallRandomEventOdds + 2;
		if (ManagementIsClubSlave()) MainHallRandomEventOdds = MainHallRandomEventOdds + 4;
		if ((KidnapLeagueBountyLocation == RoomName) && (KidnapLeagueBounty != null) && (KidnapLeagueBountyVictory == null) && Player.CanInteract() && (ReputationGet("Kidnap") > 0)) KidnapLeagueBountyStart();
		else CommonSetScreen("Room", RoomName);

	}

}

// When the user clicks in the main hall screen
function MainHallClick() {

	// Character, Dressing, Exit & Chat
	if (CommonIsClickAt(750, 0, 1250-750, 1000-0)) CharacterSetCurrent(Player);
	if (CommonIsClickAt(1645, 25, 1735-1645, 115-25)) InformationSheetLoadCharacter(Player);
	if (CommonIsClickAt(1765, 25, 1855-1765, 115-25) && Player.CanChange()) CharacterAppearanceLoadCharacter(Player);
	if (CommonIsClickAt(1885, 25, 1975-1885, 115-25)) window.location = window.location;
	if (CommonIsClickAt(1645, 145, 1735-1645, 235-145)) ChatRoomStart("", "", "MainHall", "IntroductionDark", CommonBackgroundList.slice());

	// The options below are only available if the player can move
	if (Player.CanWalk()) {

		// Chat, Shop & Private Room
		if (CommonIsClickAt(1765, 145, 1855-1765, 235-145)) MainHallWalk("Shop");
		if (CommonIsClickAt(1885, 145, 1975-1885, 235-145) && !LogQuery("LockOutOfPrivateRoom", "Rule")) MainHallWalk("Private");

		// Introduction, Maid & Management
		if (CommonIsClickAt(1645, 265, 1735-1645, 355-265)) MainHallWalk("Introduction");
		if (CommonIsClickAt(1765, 265, 1855-1765, 355-265)) MainHallWalk("MaidQuarters");
		if (CommonIsClickAt(1885, 265, 1975-1885, 355-265)) MainHallWalk("Management");

		// Kidnap League, Dojo & Explore/Sarah
		if (CommonIsClickAt(1645, 385, 1735-1645, 475-385)) MainHallWalk("KidnapLeague");
		if (CommonIsClickAt(1765, 385, 1855-1765, 475-385)) MainHallWalk("Shibari");
		if (CommonIsClickAt(1885, 385, 1975-1885, 475-385) && SarahRoomAvailable) MainHallWalk("Sarah");

		// Cell, Slave Market & Look for trouble
		if (CommonIsClickAt(1645, 505, 1735-1645, 595-505)) MainHallWalk("Trouble");
		if (CommonIsClickAt(1765, 505, 1855-1765, 595-505)) MainHallWalk("SlaveMarket");
		if (CommonIsClickAt(1885, 505, 1975-1885, 595-505)) MainHallWalk("Cell");

		// Asylum & College
		if (CommonIsClickAt(1645, 625, 1735-1645, 715-625) && !ManagementIsClubSlave()) MainHallWalk("LARP");
		if (CommonIsClickAt(1765, 625, 1855-1765, 715-625) && !ManagementIsClubSlave()) MainHallWalk("CollegeEntrance");
		if (CommonIsClickAt(1885, 625, 1975-1885, 715-625)) MainHallWalk("AsylumEntrance");
		
		// Custom content rooms - Gambling, Prison & Photographic
		if ((MouseX >=   25) && (MouseX <  115) && (MouseY >=  25) && (MouseY < 115)) MainHallWalk("Gambling");
		if ((MouseX >=  145) && (MouseX <  235) && (MouseY >=  25) && (MouseY < 115)) MainHallWalk("Prison");
		if ((MouseX >=  265) && (MouseX <  355) && (MouseY >=  25) && (MouseY < 115)) MainHallWalk("Photographic");

		// Stable, Magic-Theater & Nursery
		if ((MouseX >=   25) && (MouseX <  115) && (MouseY >= 145) && (MouseY < 235)) MainHallWalk("Stable");
		if ((MouseX >=  145) && (MouseX <  235) && (MouseY >= 145) && (MouseY < 235)) MainHallWalk("Magic");
		if ((MouseX >=  265) && (MouseX <  355) && (MouseY >= 145) && (MouseY < 235)) MainHallWalk("Nursery");

		// Cafe
		if ((MouseX >=   25) && (MouseX <  115) && (MouseY >= 265) && (MouseY < 355)) MainHallWalk("Cafe");
	}

}

// The maid can release the player
function MainHallMaidReleasePlayer() {
	if (MainHallMaid.CanInteract()) {
		for(var D = 0; D < MainHallMaid.Dialog.length; D++)
			if ((MainHallMaid.Dialog[D].Stage == "0") && (MainHallMaid.Dialog[D].Option == null))
				MainHallMaid.Dialog[D].Result = DialogFind(MainHallMaid, "AlreadyReleased");
		CharacterRelease(Player);
		CharacterReleaseFromLock(Player, "CombinationPadlock");
		MainHallMaid.Stage = "10";
	} else MainHallMaid.CurrentDialog = DialogFind(MainHallMaid, "CannotRelease");
}

// If the maid is angry, she might gag or tie up the player
function MainHallMaidAngry() {
	if ((ReputationGet("Dominant") < 30) && !MainHallIsHeadMaid) {
		for(var D = 0; D < MainHallMaid.Dialog.length; D++)
			if ((MainHallMaid.Dialog[D].Stage == "PlayerGagged") && (MainHallMaid.Dialog[D].Option == null))
				MainHallMaid.Dialog[D].Result = DialogFind(MainHallMaid, "LearnedLesson");
		ReputationProgress("Dominant", 1);
		InventoryWearRandom(Player, "ItemMouth");
		if (Player.CanInteract()) {
			InventoryWear(Player, "LeatherArmbinder", "ItemArms");
			MainHallMaid.CurrentDialog = DialogFind(MainHallMaid, "TeachLesson");
		}		
	} else MainHallMaid.CurrentDialog = DialogFind(MainHallMaid, "Cower");
}

// The maid can be tricked to release Sarah
function MainHallFreeSarah() {
	ReputationProgress("Dominant", -4);
	SarahUnlock();
	DialogLeave();
}

// When the maid unlocks the player from an owner
function MainHallMaidShamePlayer() {
	CharacterRelease(Player);
	MainHallHasOwnerLock = false;
	MainHallMaidPunishmentPlayer();
}

// When the maid changes the slave collar model to default
function MainHallMaidChangeCollarPlayer() {
	for (var A = 0; A < Player.Appearance.length; A++)
		if (Player.Appearance[A].Asset.Name == "SlaveCollar") {
			Player.Appearance[A].Property = null;
			Player.Appearance[A].Color = "Default";
		}
	MainHallHasSlaveCollar = false;
	MainHallMaidPunishmentPlayer();
}

// When the maid punishes the player, she get forced naked for an hour and loses reputation
function MainHallMaidPunishmentPlayer() {
	CharacterNaked(Player);
	LogAdd("BlockChange","Rule", CurrentTime + 3600000);
	if (ReputationGet("Dominant") > 10) ReputationProgress("Dominant", -10);
	if (ReputationGet("Dominant") < -10) ReputationProgress("Dominant", 10);
}

// When the maid catches the club slave player with clothes, she strips her and starts the timer back
function MainHallResetClubSlave() {
	CharacterNaked(Player);
	LogAdd("ClubSlave", "Management", CurrentTime + 3600000);
	LogAdd("BlockChange", "Rule", CurrentTime + 3600000);
	TitleSet("ClubSlave");
}

// The maid can lead the player to the club management to be expelled
function MainHallMistressExpulsion() {
	CommonSetScreen("Room", "Management");
	ManagementMistress.Stage = "500";
	ManagementMistress.CurrentDialog = DialogFind(MainHallMaid, "MistressExpulsion");
	CharacterSetCurrent(ManagementMistress);
}

// The maid can introduce the game to the player
function MainHallMaidIntroduction() {
	if (!LogQuery("IntroductionDone", "MainHall") && Player.CanTalk()) {
		MainHallMaid.Stage = "1000";
		MainHallMaid.CurrentDialog = DialogFind(Player, "IntroductionMaidGreetings");
		CharacterSetCurrent(MainHallMaid);
		MainHallMaid.AllowItem = false;
	}
}

// Flag the introduction as done
function MainHallMaidIntroductionDone() {
	LogAdd("IntroductionDone", "MainHall");
}

function MainHallKeyDown() {
	Draw3DKeyDown();
}