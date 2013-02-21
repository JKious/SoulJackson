#pragma strict

var punchCollide : Collider;
var num : int = 0;
var hitTexture : Texture;
var soldierObject : GameObject;
var robotObject : GameObject;
var charController : Robot_ThirdPersonController;
var didHit : boolean = false;
var cloneObject : GameObject;

var hitObject : GameObject;
var childObject : GameObject;

var soldierTextStyle : GUIStyle = new GUIStyle();

var damageText : String;


var enemySoldierScript : enemySoldierLogic;


function Start () {

	soldierTextStyle.fontSize = 24;
	soldierTextStyle.normal.textColor = Color.white;

}

function OnCollisionEnter(collision : Collision){

	hitObject = collision.transform.gameObject;
	
	print("You hit: " + hitObject);
	
	if(hitObject.name.Contains("soldierAI") && charController.punching){
		
		didHit = true;
		
		enemySoldierScript = hitObject.GetComponent(enemySoldierLogic);
		
		if(charController.combo)
			damageText = charController.comboNum + " Hit Combo for " + charController.damage + "!"*charController.comboNum;
		else	
			damageText = "Hit for " + charController.damage + "!";
		
		childObject = hitObject.transform.FindChild("soldier_Military_Male_Lod_1").gameObject;
		
		soldierTextStyle.normal.textColor.a = 1;
		enemySoldierScript.health -= charController.damage;
		
		if(enemySoldierScript.health <= 60 && enemySoldierScript.health > 30)
			childObject.renderer.material.color = Color.yellow;
		
		if(enemySoldierScript.health <= 30)
			childObject.renderer.material.color = Color.red;
			
		if(enemySoldierScript.health <= 0){
			Destroy(hitObject);
			
			cloneObject = Instantiate(soldierObject, Vector3(Random.Range(0, 10), 0, Random.Range(0, 10)), Quaternion.identity);
			
			cloneObject.transform.parent = hitObject.transform.root;
			
		}
	}

}

function OnGUI(){

	if(didHit){
			
		GUI.Label(Rect(Screen.width - 400, 200, 300, 500), damageText, soldierTextStyle);
	
		if(soldierTextStyle.normal.textColor.a > 0)
			soldierTextStyle.normal.textColor.a -= Time.deltaTime / 15;
		
	}
	
	
	
}

function Update () {

	print(didHit);
	
}