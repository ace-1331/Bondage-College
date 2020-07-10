"use strict";
var CollegeEntranceBackground = "CollegeEntrance";
var CollegeEntranceStudent = null;

// Returns TRUE if specific dialog conditions are met
function CollegeEntranceCanGoTennis() { return (Player.CanWalk() && Player.CanTalk() && !Player.IsRestrained() && CollegeEntranceIsWearingTennisClothes()) }
function CollegeEntranceCanGoInside() { return (Player.CanWalk() && Player.CanTalk() && !Player.IsRestrained() && CollegeEntranceIsWearingCollegeClothes()) }
function CollegeEntranceCanGoDetention() { return (Player.CanWalk() && Player.CanTalk() && !Player.IsRestrained() && CollegeEntranceIsWearingCollegeClothes()) }
function CollegeEntranceCanGoTeacher() { return (Player.CanWalk() && Player.CanTalk() && !Player.IsRestrained() && CollegeEntranceIsWearingCollegeClothes() && LogQuery("TeacherKey", "College")) }

// Generates the entrance student
function CollegeEntranceLoad() {
	if (CollegeEntranceStudent == null) {
		CollegeEntranceStudent = CharacterLoadNPC("NPC_CollegeEntrance_Student");
		CollegeEntranceWearStudentClothes(CollegeEntranceStudent);
		CollegeEntranceStudent.AllowItem = false;
	}
}

// Runs the room (shows the player and student)
function CollegeEntranceRun() {
	DrawCharacter(Player, 500, 0, 1);
	DrawCharacter(CollegeEntranceStudent, 1000, 0, 1);
	DrawButton(1885, 25, 90, 90, "", Player.CanWalk() ? "White" : "Pink", "Icons/Exit.png", TextGet("Exit"));
	DrawButton(1885, 145, 90, 90, "", "White", "Icons/Character.png", TextGet("Profile"));
	DrawButton(1885, 265, 90, 90, "", Player.CanChange() ? "White" : "Pink", "Icons/Dress.png", TextGet("Dress"));
	DrawButton(1885, 385, 90, 90, "", CollegeEntranceCanGoTennis() ? "White" : "Pink", "Icons/Tennis.png", TextGet("Tennis"));
	DrawButton(1885, 505, 90, 90, "", CollegeEntranceCanGoInside() ? "White" : "Pink", "Icons/Coffee.png", TextGet("Cafeteria"));
	DrawButton(1885, 625, 90, 90, "", CollegeEntranceCanGoInside() ? "White" : "Pink", "Icons/Theater.png", TextGet("Theater"));
	DrawButton(1885, 745, 90, 90, "", CollegeEntranceCanGoDetention() ? "White" : "Pink", "Icons/Cage.png", TextGet("Detention"));
	DrawButton(1885, 865, 90, 90, "", CollegeEntranceCanGoTeacher() ? "White" : "Pink", "Icons/Couch.png", TextGet("Teacher"));
}

// When the user clicks in the room
function CollegeEntranceClick() {
	if (CommonIsClickAt(500, 0, 500, 1000)) CharacterSetCurrent(Player);
	if (CommonIsClickAt(1000, 0, 1500-1000, 1000-0)) CharacterSetCurrent(CollegeEntranceStudent);
	if (CommonIsClickAt(1885, 25, 90, 90) && Player.CanWalk()) CommonSetScreen("Room", "MainHall");
	if (CommonIsClickAt(1885, 145, 90, 235-145)) InformationSheetLoadCharacter(Player);
	if (CommonIsClickAt(1885, 265, 90, 355-265) && Player.CanChange()) CharacterAppearanceLoadCharacter(Player);
	if (CommonIsClickAt(1885, 385, 90, 475-385) && CollegeEntranceCanGoTennis()) CommonSetScreen("Room", "CollegeTennis");
	if (CommonIsClickAt(1885, 505, 90, 595-505) && CollegeEntranceCanGoInside()) CommonSetScreen("Room", "CollegeCafeteria");
	if (CommonIsClickAt(1885, 625, 90, 715-625) && CollegeEntranceCanGoInside()) CommonSetScreen("Room", "CollegeTheater");
	if (CommonIsClickAt(1885, 745, 90, 835-745) && CollegeEntranceCanGoDetention()) CommonSetScreen("Room", "CollegeDetention");
	if (CommonIsClickAt(1885, 865, 90, 975-865) && CollegeEntranceCanGoTeacher()) CommonSetScreen("Room", "CollegeTeacher");
}

// Changes the character into college student clothes
function CollegeEntranceWearStudentClothes(C) {
	if ((typeof C === "string") && (C == "Player")) C = Player;
	InventoryWear(C, "CollegeOutfit1", "Cloth", "Default");
	InventoryWear(C, "Socks4", "Socks", "#AAAAAA");
	InventoryRemove(C, "ClothLower");
	InventoryRemove(C, "Wings");
	InventoryRemove(C, "TailStraps");
	InventoryRemove(C, "Gloves");
	InventoryRemove(C, "HairAccessory1");
	InventoryRemove(C, "HairAccessory2");
	InventoryRemove(C, "ClothAccessory");
}

// Returns TRUE if the player is wearing tennis clothes
function CollegeEntranceIsWearingTennisClothes() {
	if ((InventoryGet(Player, "Cloth") == null) || (InventoryGet(Player, "Cloth").Asset.Name != "TennisShirt1")) return false;
	if ((InventoryGet(Player, "ClothLower") == null) || (InventoryGet(Player, "ClothLower").Asset.Name != "TennisSkirt1")) return false;
	if ((InventoryGet(Player, "Shoes") == null) || ((InventoryGet(Player, "Shoes").Asset.Name != "Sneakers1") && (InventoryGet(Player, "Shoes").Asset.Name != "Sneakers2"))) return false;
	if (InventoryGet(Player, "Wings") != null) return false;
	if (InventoryGet(Player, "TailStraps") != null) return false;
	return true;
}

// Returns TRUE if the player is wearing college clothes
function CollegeEntranceIsWearingCollegeClothes() {
	if ((InventoryGet(Player, "Cloth") == null) || (InventoryGet(Player, "Cloth").Asset.Name != "CollegeOutfit1") || ((InventoryGet(Player, "Cloth").Color != null) && (InventoryGet(Player, "Cloth").Color != "Default"))) return false;
	if (InventoryGet(Player, "Socks") == null) return false;
	if (InventoryGet(Player, "Shoes") == null) return false;
	if (InventoryGet(Player, "Wings") != null) return false;
	if (InventoryGet(Player, "TailStraps") != null) return false;
	return true;
}