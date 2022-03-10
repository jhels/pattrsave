# pattrsave
pattrsave is a Max/MSP abstraction that allows you to record and play back the automation of a large number of integer- or float-valued parameters over time. The data is stored into a Jitter matrix which can be written to or read from file as desired.

![UI](https://user-images.githubusercontent.com/11036537/157727659-9ebd7cab-4c71-4eb7-b77a-60c15aa30b08.png)

To see it in action, download the folder, open up pattrsave.maxpat, and follow the simple "Demo" instructions. Feel free to delete these and the associated number boxes afterwards.

## Instructions

1. Save the repository files to a directory Max/MSP has access to, and open up pattrsave.maxpat. 

2. Give a scripting name to the compatible objects whose parameters you wish to save, and input them in the table in the "pattrs" tab of pattrsave shown below. Click the white button and a Javascript file will generate a number of pattr objects corresponding to your parameters, all of which will be connected automatically to pattrsave itself.

![param-table](https://user-images.githubusercontent.com/11036537/157727665-bec4e91c-60e6-489f-92c6-b03ce6f32659.png)

3. Go back to the first tab of pattrsave, turn on the "arm record" toggle and press play. Any changes you make to your parameters will be stored in a Jitter matrix. To play your changes back, stop recording and turn on the "play" toggle. To save your recording, click "save".

## How it works

To save N parameters, as per instruction 2 above, you first generate N pattrs, which bind to your parameter objects automatically. Anything input to the parameter objects is output from the pattrs and vice versa (this is how pattr works in Max).

Next, pattrsave automatically instantiates a Jitter matrix with N columns and a large number of rows. While recording, once every "tick" (a configurably small unit of time), it writes the state of the associated pattrs to a row of the matrix. At tick 1, the state of each pattr is stored in row 1, and so on. To play back the recording, pattrsave simply retrieves the state of each row of the matrix sequentially and outputs them to the pattrs.
