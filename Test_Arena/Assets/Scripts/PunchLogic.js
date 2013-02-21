var strength :int = 2000;
var direction :Vector3;
var hand :GameObject;
var punch :boolean = false;
var follow :GameObject;
var hitObj :RaycastHit;

function Start()
{
	var event = new AnimationEvent();
	event.functionName = "ApplyForce";
	event.time = animation["punch"].clip.length / 1.7;
	animation["punch"].clip.AddEvent(event);
}


function Update ()
{
	var hit :RaycastHit;
	if(Physics.Linecast(follow.transform.position, hand.transform.position, hit))
	{
		hitObj = hit;
		direction = hit.point - follow.transform.position;
		punch = true;
	}
}

function ApplyForce()
{
	if(punch)
	{
		hitObj.transform.rigidbody.AddForceAtPosition(direction.normalized * strength, hitObj.point);
		punch = false;
	}
}
