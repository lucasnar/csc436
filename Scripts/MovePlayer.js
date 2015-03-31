﻿#pragma strict

public var speed : int = 1.0;
public var axisName : String = "Horizontal";
public var anim : Animator;
public var jumpButton : String = "space";
public var jumpPower: float = 100.0f;
private var canJump : boolean = true;

var interactButton : String = "z";
var attackButton : String = "x";
var hitBox : GameObject;
var attackBox : GameObject;

function Start() {

	// This is the function that starts when the game starts.
			
	anim = gameObject.GetComponent(Animator);
	hitBox.collider2D.enabled = false;
	attackBox.collider2D.enabled = false;
	
}

function Update() {
	
	// This function calls every frame.
	
	var newScale : Vector3; // Unity uses Vector3 to calculate 3D Position and 	Direction.
	
	anim.SetFloat("Walk", Mathf.Abs(Input.GetAxis(axisName))); // Set the walk variable to the axis.
	
	
	// It changes the walk animation to the correct side.
	
	if(Input.GetAxis(axisName) < 0) {
	
		newScale = transform.localScale;
		newScale.x = -1f;
		transform.localScale = newScale;
		
	}
	
	else if(Input.GetAxis(axisName) > 0) {
	
		newScale = transform.localScale;
		newScale.x = 1f;
		transform.localScale = newScale;
		
	}
	
	if(Input.GetKeyDown(jumpButton)){
		
		if(canJump == true){
		
			anim.SetFloat("Jump", 1);
			rigidbody2D.AddForce(transform.up * jumpPower);
			canJump = false;
			
		}
				
	}
	
	transform.position += transform.right * Input.GetAxis(axisName) * speed * Time.deltaTime;
	
	if(Input.GetKeyDown(interactButton)){
	
		Hit();
		
	}
	
	if(Input.GetKeyDown(attackButton)){
	
		anim.SetFloat("Attack", 1);
		Attack();
		
	}
}

function Hit(){
	
	hitBox.collider2D.enabled = true;
	yield WaitForSeconds(0.01);
	hitBox.collider2D.enabled = false;
	
}

function Attack(){

	yield WaitForSeconds(0.1);
	attackBox.collider2D.enabled = true;
	yield WaitForSeconds(0.1);
	attackBox.collider2D.enabled = false;
	anim.SetFloat("Attack", 0);

}

function Die(){
	// Very simple; only to handle some things until I make a proper Die() function.

	anim.SetFloat("Die", 1);
	canJump = false;
	speed = 0;
	yield WaitForSeconds(2);
	// Destroy(GameObject.FindWithTag("Player")); // Not needed for now; but later will be, I guess.
	Application.LoadLevel(0);

}

function OnCollisionEnter2D(coll : Collision2D){
	
	if(coll.gameObject.tag == "Ground" || "Enemy"){
	
		anim.SetFloat("Jump", 0);
		canJump = true;
		
	}
	
	if(coll.gameObject.tag == "Thorn"){
	
		Die();
		
	}
}