
function NVNetwork(layerSizes)
{
    this.layers = new Array();
    for(var i=0;i<layerSizes.length;i++)
    {
        if (i == 0)
        {
            this.layers[i] = new NVLayer(layerSizes[i], 0);
        }
        else
        {
            this.layers[i] = new NVLayer(layerSizes[i], layerSizes[i - 1]);
        }
    }

    this.Reset = function()
    {
        for(var i=0; i<this.layers.length; i++)
        {
                this.layers[i].Reset();
        }
    };
	
    this.ActivateSigmoid = function(value)
    {
        return (1.0 / (1 + Math.exp(-1.0 * value)));
    };
	
    this.DerivateSigmoid = function(value)
    {
        return value * (1 - value);
    };
	
    this.FeedForward = function()
    {
        for (var i = 1; i < this.layers.length; i++)
        {
            var prevlength = this.layers[i - 1].outputValue.length;
            for (var j = this.layers[i].neuronCount-1; j >= 0;  j--)
            {
                var output = 0;
                for (var neur = prevlength - 1; neur >= 0; neur--)
                {
                        output += this.layers[i - 1].outputValue[neur] * this.layers[i].weights[neur][j];
                }

                this.layers[i].outputValue[j] = this.ActivateSigmoid(output);
            }  
        }
    };
	
    this.Backpropagation = function(desiredResult, learningRate, momentum)
    {
        var outputValue = 0;
        for (var i =  this.layers[this.layers.length - 1].neuronCount-1 ; i >= 0; i--)
        {
            outputValue =  this.layers[this.layers.length - 1].outputValue[i];
            this.layers[this.layers.length - 1].errorValue[i] = (desiredResult[i] - outputValue) * this.DerivateSigmoid(outputValue);
        }

        for (var i = this.layers.length - 2; i > 0; i--)
        {
            hiddenLayer = this.layers[i];
            outputLayer = this.layers[i + 1];
            var prevLayerCount = this.layers[i].neuronCount;
            var currentLayerCount = this.layers[i + 1].neuronCount;

            for (var j = prevLayerCount - 1; j >= 0; j--)
            {
                outputValue = 0;

                for (k = currentLayerCount - 1; k >= 0; k--)
                {
                        outputValue += this.layers[i + 1].weights[j][k] * this.layers[i + 1].errorValue[k];
                }
                this.layers[i].errorValue[j] = this.DerivateSigmoid(this.layers[i].outputValue[j]) * outputValue;
            }
        }

        for (var i = this.layers.length - 1; i > 0; i--)
        {
            var biasIndex = this.layers[i].weights.length - 1;

            var currentLayerCount = this.layers[i].neuronCount;
            var prevLayerCount = this.layers[i - 1].neuronCount;

            for (var j = currentLayerCount - 1; j >= 0; j--)
            {
                this.layers[i].errorValueTemp[j] = learningRate * this.layers[i].errorValue[j];
                var weightDiff = this.layers[i].errorValueTemp[j];
                this.layers[i].weights[biasIndex][j] += weightDiff;
                this.layers[i].weights[biasIndex][j] += momentum * this.layers[i].prevWeightDiffs[biasIndex][j];
                this.layers[i].prevWeightDiffs[biasIndex][j] = weightDiff;
            }

            for (var j = 0; j < prevLayerCount; j++)
            {

                for (var k = 0; k < currentLayerCount; k++)
                {
                    var weightDiff = this.layers[i].errorValueTemp[k] * this.layers[i - 1].outputValue[j];
                    this.layers[i].weights[j][k] += weightDiff;
                    this.layers[i].weights[j][k] += momentum * this.layers[i].prevWeightDiffs[j][k];
                    this.layers[i].prevWeightDiffs[j][k] = weightDiff;
                }
            }
        }
    };
}