# pattrsave
pattrsave is a Max/MSP abstraction that allows you to record and play back the automation of a large number of integer- or float-valued parameters over time. The data is stored into a Jitter matrix which can be written to or read from file as desired.

![UI](https://user-images.githubusercontent.com/11036537/157722647-6be42a1f-7f77-4b6e-8f2b-803cd79135cd.png)

To use it, save the repository to somewhere that Max/MSP can see them, and open up pattrsave-hub. 

Next, give a scripting name to the compatible objects whose parameters you wish to save, and input them in the table in the "pattrs" tab of pattrsave-hub shown below. Click the white button and a Javascript file will generate a number of pattr objects corresponding to your parameters, all of which will be connected automatically to pattrsave itself.

![param-table](https://user-images.githubusercontent.com/11036537/157725184-23c4d0b4-aa2e-4bf6-974b-d16c334f9f83.png)

Finally, go back to the first tab of pattrsave-hub, turn on the "arm record" toggle and press play. Any changes you make to your parameters will be stored in a Jitter matrix. To play your changes back, stop recording and turn on the "play" toggle.

## How it works

To save `N` parameters, pattrsave first instantiates a Jitter matrix with `N` columns and a large number of rows. While recording, once every "tick" (a configurably small unit of time), it writes the state of the associated pattrs to a row of the matrix. At tick 1, the state of each pattr is stored in row 1, and so on. To play back the recording, pattrsave simply retrieves the state of each row of the matrix sequentially.
