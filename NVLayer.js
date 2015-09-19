
function NVLayer(nc, prevLayerNeuronCount)
{
    this.neuronCount = nc;
    this.outputValue = new Array(nc+1);
    this.errorValue = new Array(nc+1);
    this.errorValueTemp = new Array(nc+1);
    this.weigth = []; // [][]
    this.prevWeightDiffs = [];

    this.outputValue[nc] = 1;
	
    if (prevLayerNeuronCount > 0)
    {
        this.weights = new Array(prevLayerNeuronCount + 1);
        for (var i = 0; i < prevLayerNeuronCount + 1; i++)
        {
            this.weights[i] = new Array(nc);
            this.prevWeightDiffs[i] = new Array(nc);
        }
    }
	
    this.Reset = function()
    {
        if (this.weights != null)
        {
            for (var i = 0; i < this.weights.length; i++)
            {
                for (var j = 0; j < this.weights[0].length; j++)
                {
                    this.weights[i][j] = (Math.random() * 2 - 1);
                    this.prevWeightDiffs[i][j] = 0;
                }
            }
        }
    };
}
