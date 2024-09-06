# Microsoft Word CMD + K
Cursor-style cmd+k for Word, as an Add-in. Install this Add-in, highlight text, press cmd+k, and ***edit away!***

# Notes
* This was built using **Microsoft Office Add-ins Development Kit** on VSCode
* You must `sudo npm install` before running anything here
* To validate your Manifest file, you can run `npx --yes office-addin-manifest validate manifest.xml`
* With this VSCode extension, you can click `Preview your office add-in`, and run it on `desktop chromium` to preview
    * This will start a development server with your files on it!
    * Alternatively, *(and I prefer this)*, you can run `npm run start:desktop -- --app word`, which I made a command for at `npm run start`
* Sideloaded Word extensions are found in `/Users/<username>/Library/Containers/com.microsoft.Word/Data/Documents/wef`
    * If you ever need to locate them or delete them, try going here
    * Can find this with `cmd+shift+g` in finder on Mac
* Microsoft word caching extensions heavily. You can find the cache in `/Users/<username>/Library/Containers/com.microsoft.Word/Data/Library/Caches`.
    * If you need to reset the state of word, just delete the caches folder!
* The development server must be running on https for this to work! Word does not support running on HTTP
    * You can start it with `npm run devserver`
    * This devserver will be started in ~1 minute, and auto-reloads upon save!

# Error Log
* `Add-in Error: Sorry, we can't load the add-in. Please make sure you have internet connectivity.`
    * Honestly no clue what's going on here lmfao
    * I guess the development server isn't up or something? 
    * Fixed this by adding `npm run devserver` command, which builds the webpack in dev mode for the web server!
        * This command must be run before we `npm run start` to test this out
        * This takes a while to start up however, the plugin may appear as loading for a bit

# [FROM MICROSOFT]: Build Word add-ins using Office Add-ins Development Kit
Word add-ins are integrations built by third parties into Word by using [Word JavaScript API](https://learn.microsoft.com/en-us/office/dev/add-ins/reference/overview/word-add-ins-reference-overview) and [Office Platform capabilities](https://learn.microsoft.com/en-us/office/dev/add-ins/overview/office-add-ins).
