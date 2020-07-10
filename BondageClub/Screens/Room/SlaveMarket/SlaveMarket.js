"use strict";
var SlaveMarketBackground = "SlaveMarket";
var SlaveMarketMistress = null;
var SlaveMarketSlave = null;
var SlaveMarketSlaveToTrain = null;
var SlaveMarketTrainingBackgroundList = ["BDSMRoomBlue", "BDSMRoomPurple", "BDSMRoomRed"];

function SlaveMarketCanStartAuction() { return ((ReputationGet("Dominant") >= -50) && ManagementCanTransferToRoom()) }
function SlaveMarketCannotStartAuctionSubmissive() { return (ReputationGet("Dominant") < -50) }
function SlaveMarketCannotStartAuctionRoom() { return ((ReputationGet("Dominant") >= -50) && !ManagementCanTransferToRoom()) }

// Loads the Slave Market room, generates the Mistress and slave
function SlaveMarketLoad() {
	if (SlaveMarketMistress == null) {
		SlaveMarketMistress = CharacterLoadNPC("NPC_SlaveMarket_Mistress");
		SlaveMarketMistress.AllowItem = false;
	}
	if (SlaveMarketSlave == null) SlaveMarketNewSlave();
}

// Run the Slave Market (The screen can be used for the search daily job)
function SlaveMarketRun() {
	if (!DailyJobSubSearchIsActive()) DrawCharacter(Player, 250, 0, 1);
	if (!DailyJobSubSearchIsActive()) DrawCharacter(SlaveMarketMistress, 750, 0, 1);
	if (!DailyJobSubSearchIsActive()) DrawCharacter(SlaveMarketSlave, 1250, 0, 1);
	if (Player.CanWalk()) DrawButton(1885, 25, 90, 90, "", "White", "Icons/Exit.png");
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png");
	DailyJobSubSearchRun();
}

// When the user clicks in the Slave Market
function SlaveMarketClick() {
	if (!DailyJobSubSearchIsActive() && CommonIsClickAt(250, 0, 750-250, 1000-0)) CharacterSetCurrent(Player);
	if (!DailyJobSubSearchIsActive() && CommonIsClickAt(750, 0, 1250-750, 1000-0)) CharacterSetCurrent(SlaveMarketMistress);
	if (!DailyJobSubSearchIsActive() && CommonIsClickAt(1250, 0, 1750-1250, 1000-0)) CharacterSetCurrent(SlaveMarketSlave);
	if (CommonIsClickAt(1885, 25, 90, 90) && Player.CanWalk()) CommonSetScreen("Room", "MainHall");
	if (CommonIsClickAt(1885, 145, 1975-1885, 235-145)) InformationSheetLoadCharacter(Player);
	DailyJobSubSearchClick();
}

// When the auction starts, launch the mini-game
function SlaveMarketAuctionStart() {
	InventoryWear(SlaveMarketSlave, "CollarChainShort", "ItemNeckAccessories");
	SlaveAuctionVendor = SlaveMarketMistress;
	SlaveAuctionSlave = SlaveMarketSlave;
	MiniGameStart("SlaveAuction", "", "SlaveMarketAuctionEnd");
}

// When the auction ends, if the player was the last bidder, she buys the slave and talks with her.  If not, she goes back to the Mistress.
function SlaveMarketAuctionEnd() {
	if (SlaveAuctionBidCurrent == "Player") {
		CharacterChangeMoney(Player, SlaveAuctionBidAmount * -1);
		CommonSetScreen("Room", "Private");
		PrivateAddCharacter(SlaveMarketSlave, "Submissive");
		CommonSetScreen("Room", "SlaveMarket");
		CharacterSetCurrent(SlaveMarketSlave);
		SlaveMarketSlave.Stage = "10";
		SlaveMarketSlave.CurrentDialog = DialogFind(SlaveMarketSlave, "AuctionBuy");
		SlaveMarketMistress.Stage = "22";
	} else {
		CommonSetScreen("Room", "SlaveMarket");
		CharacterSetCurrent(SlaveMarketMistress);
		SlaveMarketMistress.CurrentDialog = DialogFind(SlaveMarketMistress, "AuctionFail");
		SlaveMarketMistress.Stage = "23";
	}
}

// When a new slave is generated
function SlaveMarketNewSlave() {
	SlaveMarketSlave = CharacterLoadNPC("NPC_SlaveMarket_Slave");
	SlaveMarketSlave.AllowItem = false;
	CharacterAppearanceFullRandom(SlaveMarketSlave);
	CharacterNaked(SlaveMarketSlave);
	CharacterRandomName(SlaveMarketSlave);
	InventoryWear(SlaveMarketSlave, "LeatherCollar", "ItemNeck");
	InventoryWear(SlaveMarketSlave, "CollarChainLong", "ItemNeckAccessories");
	if (CurrentCharacter != null) DialogLeave();
}

// When the player brings the slave to her room
function SlaveMarketVisitRoom() {
	DialogLeave();
	SlaveMarketNewSlave();
	CommonSetScreen("Room", "Private");
}

// When the training starts, launch the custom dialog
function SlaveMarketTrainingStart() {
	var Intro = Math.floor(Math.random() * 6);
	SlaveMarketSlaveToTrain = CharacterLoadNPC("NPC_SlaveMarket_SlaveToTrain");
	SlaveMarketSlaveToTrain.Stage = (Intro * 100).toString();
	SlaveMarketSlaveToTrain.ExpectedTraining = Intro % 3;
	SlaveMarketSlaveToTrain.CurrentTraining = -1;
	SlaveMarketSlaveToTrain.TrainingIntensity = 0;
	SlaveMarketSlaveToTrain.TrainingCount = 0;
	SlaveMarketSlaveToTrain.TrainingCountLow = 0;
	SlaveMarketSlaveToTrain.TrainingCountPerfect = 0;
	SlaveMarketSlaveToTrain.TrainingCountHigh = 0;
	if (Intro >= 3) InventoryWear(SlaveMarketSlaveToTrain, "SlaveCollar", "ItemNeck");
	CharacterNaked(SlaveMarketSlaveToTrain);
	DialogLeave();
	EmptyBackground = CommonRandomItemFromList("", SlaveMarketTrainingBackgroundList);
	EmptyCharacterOffset = 0;
	EmptyCharacter = [];
	EmptyCharacter.push(Player);
	EmptyCharacter.push(SlaveMarketSlaveToTrain);
	CommonSetScreen("Room", "Empty");
}