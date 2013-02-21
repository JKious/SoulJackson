var actions :String[];
var indexAction :int;

var statusGUI :GUIText;

var t :float = 0;
var speed :float = 12;
var robotController :CharacterController;
private var jumpSpeed :float = 10.0;
private var flagIdle :boolean = false;
private var moveDirection :Vector3 = Vector3.zero;
private var boostIncr = 1;
private var canAnimate :boolean;
private var gravity = 40;
private var nextLoad :float = 0;
private var rate :float = 5;
private var run : boolean = false;



function Start ()
{	
	indexAction = 0;
	statusGUI.text = actions[indexAction];
	robotController = GetComponent(CharacterController);
	animation.wrapMode = WrapMode.Loop;
	
	animation["idleTap"].wrapMode = WrapMode.Once;
	
}

function Update()
{
	
	if(Input.GetButtonDown("Boost"))
		{
			run = true;
		}	
		
		else if(Input.GetButtonUp("Boost"))
{
	run = false;
}
		
	if(!Input.GetButtonDown("Action"))
	{
		canAnimate = true;
		t = animation[actions[indexAction]].clip.length + Time.time;
	}

	if(Input.GetButtonDown("Switch"))
	{
		indexAction = (indexAction + 1)%actions.length;
		statusGUI.text = actions[indexAction];
	}
	
	if(robotController.isGrounded == true)
	{
		if(Input.GetAxis("Vertical") > .2 && !Input.GetKey("left ctrl"))
		{
			animation["walk"].speed = 1;
			if(run)
			{
				animation.CrossFade("run");
				boostIncr = 3;
			}
		
			
			else
			{
				animation.CrossFade("walk");
				boostIncr = 1;
			}
			
		}
		
		else if(Input.GetAxis("Vertical") < -.2 && !Input.GetKey("left ctrl"))
		{
			animation["walk"].speed = -1;
			animation.CrossFade("walk");
		}
		
		else
		{
			if(Input.GetButton("Action") && canAnimate)
			{
				DoAction();
			}
			
			else
			{
				IdleAnimation();
				boostIncr = 1;
			}
			
		}
		
		if(!Input.GetButton("Action"))
		{
			moveDirection = Vector3(0,0, Input.GetAxis("Vertical"));
			moveDirection = transform.TransformDirection(moveDirection);
			moveDirection *= boostIncr * speed;
		}
		
	}
	
	if(Input.GetButtonDown("Action") && canAnimate)
	{
		DoAction();
	}

	
	if(Input.GetButtonDown("Jump"))
	{
		animation.CrossFade("jump");
		moveDirection.y = jumpSpeed;
	}
	
	transform.eulerAngles.y += Input.GetAxis("Horizontal") * 5;
	moveDirection.y -= gravity * Time.deltaTime;
	robotController.Move(moveDirection * Time.deltaTime);
	
	
}

function IdleAnimation()
{
	if(Time.time > nextLoad)
	{
		if(flagIdle)
		{
			flagIdle = false;
		}
		else
		{
			flagIdle = true;
		}
		nextLoad = Time.time + rate;
	}
	if(flagIdle)
	{
		animation.CrossFade("idle");
	}
	else
	{
		animation.CrossFade("idleTap");
		if(!animation.IsPlaying("idleTap"))
		{
			flagIdle = true;
		}
	}
}

function DoAction()
{
	animation.CrossFade(actions[indexAction]);
	if(Time.time > t - .5 && canAnimate)
	{
		animation.CrossFade(actions[indexAction]);
		canAnimate = false;
	}
}