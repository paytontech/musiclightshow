# MusicLightShow for Apple Music
MusicLightShow fills an empty void in my heart. It is able to get the most vibrant colors in the album art of a currently playing song, and can, using IFTTT Webhooks, change the color of any smart light to that color.
To run this you'll need [this shortcut](https://www.icloud.com/shortcuts/0a935e3435f94c6394c746af0cee208a). It is preferred that you run both the shortcut and the script on a Mac, but with some tweaking to the shortcut (i.e. changing localhost:8080 to the IP of a computer running the script) it can be done with theoretically any computer and an iPhone. It works by getting the currently playing song, encoding the album art into Base64, sending that over to the server, and then the server uses both the Vibrant and color-namer libraries to get the most vibrant color in the album art, give it a name, and then send that over to an IFTTT webhook to change the light color. The color-namer library is used because the IFTTT extension for my smart lights (Govee) only accepts a few predetermined colors (Red, Orange, Yellow, Green, etc..). To use this with IFTTT, you'll probably need an IFTTT Pro subscription to use unlimited applets, but you'd probably be able to figure out some way to use less applets. In IFTTT, just make the following applets with the webhook names corresponding to the color the script detects:
- set_color_red
- set_color_orange
- set_color_yellow
- set_color_green
- set_color_blue
- set_color_indigo
- set_color_violet
<br>
You'll need your webhook key, which can be found in the documentation page for the webhook extension. Create a file in the root of this project called 'ifttt.json' and write the following:
```
{
    "key":"[YOUR API KEY HERE]"
}
```
of course, replacing [YOUR API KEY HERE] with your API key.

on macOS it is possible to automate this using AppleScript to automatically run whenever the song changes, however on iOS it just isn't.
Here's the AppleScript code if you want it:
```
on run
	tell application "Music"
		set currentTrack to the current track
		repeat
			if the current track is not equal to currentTrack then
				set currentTrack to the current track
				delay 1
				tell application "Shortcuts" to run shortcut "script"
			end if
			delay 1
		end repeat
	end tell
end run

```
All this does is checks if the current song has changed, and if so runs the aforementioned shortcut.