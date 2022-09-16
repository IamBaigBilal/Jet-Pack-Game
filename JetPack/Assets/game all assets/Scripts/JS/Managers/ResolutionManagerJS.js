#pragma strict

public class ResolutionManagerJS extends MonoBehaviour 
{
    public var toScale			: Transform[];		//Elements to scale
    public var toReposition		: Transform[];		//Elements to reposition

    public var sand				: Renderer;			//The renderer of the sand
    
    public var checkEveryFrame	: boolean;
    
    private var lastWidth		: int;
    private var lastHeight		: int;
    
    private var scaleFactor		: float;			//The current scale factor
    private var lastScaleFactor	: float;
    
    private var scaleScreen		: boolean;

    function Start()
    {
    	lastWidth = Screen.width;
        lastHeight = Screen.height;

        lastScaleFactor = 1;
        ScaleScreen();
    }
    
    function Update()
    {
        if (checkEveryFrame)
        {
            if (lastWidth != Screen.width || lastHeight != Screen.height)
            {
                lastWidth = Screen.width;
                lastHeight = Screen.height;

                lastScaleFactor = scaleFactor;
                scaleScreen = true;
            }
            else if (scaleScreen)
            {
                ScaleScreen();
            }
        }
    }
    
    function ScaleScreen()
    {
        scaleFactor = Camera.main.aspect / 1.28f;

        //Rescale elements
        for (var item : Transform in toScale)
            item.localScale = new Vector3((item.localScale.x / lastScaleFactor) * scaleFactor, item.localScale.y, item.localScale.z);

        //Reposition Elements
        for (var item : Transform in toReposition)
            item.position = new Vector3((item.position.x / lastScaleFactor) * scaleFactor, item.position.y, item.position.z);

        //Rescale sand 
        sand.material.mainTextureScale = new Vector2((sand.material.mainTextureScale.x / lastScaleFactor) * scaleFactor, 1);

        scaleScreen = false;
    }
}
