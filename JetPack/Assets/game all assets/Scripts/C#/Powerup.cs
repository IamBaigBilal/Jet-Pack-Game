using UnityEngine;
using System.Collections;

public class Powerup : MonoBehaviour 
{
    public float verticalSpeed;							//Vertical speed
    public float verticalDistance;						//Vertical distance

    private float offset = 0.0f;                        //Offset

    private float originalPos = 0;                      //The original position of the indicator
    private Vector3 nextPos = new Vector3();            //The next position of the indicator

    private bool paused = false;                        //Is the game paused

    //Called when the object is enabled
    void OnEnable()
    {
        //Set original position, and set pause to false
        originalPos = this.transform.position.y;
        paused = false;
    }
    //Called at every frame
    void Update()
    {
        //If the game is not paused
        if (!paused)
        {
            //Calculate offset
            offset = (1 + Mathf.Sin(Time.time * verticalSpeed)) * verticalDistance / 2.0f;

            //Modify next position
            nextPos = this.transform.position;
            nextPos.y = originalPos + offset;

            //Apply next position
            this.transform.position = nextPos;
        }
    }
    //Pause the indicator
    public void SetPauseState(bool newState)
    {
        paused = newState;
    }
}
