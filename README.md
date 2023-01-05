# Audius Playlister: Listen With Me!

## OVERVIEW

I wanted to build a tool that would let multiple users try to keep some semblance of synchronized listening. That is to say, that each user would have their OWN end-point to end-point relationship with the origin of a Audius musical source.  The playlist would be somewhat synchronized by a third-party tool such as a chat room, Twitch stream, or Twitter even.

This is a responsibly coded web-enabled player for Audius Playlists. NO LIBRARIES. Clean reliance on the built-in web browser technologies to support HTML5, CSS, JavaScript and the DOM.

As of this writing, this project is a purely open-source and only leverages existing ECMAScript compatible code built into common web-browser software. Use it as an example or copy/cut/paste/edit it into your own web-sites as you wish.

Audius is a Web3 blockchain based application model that can replace Web2 music sources like Spotify, Youtube, Amazon, Soundcloud and others. There is no advertising revenue system. The model is built upon a service in which tokens unique to the platform ($AUDIO) are used to support and promote everyone involved.

Blockchain technology is coming of age regardless of what the news sources think. It's an unstoppable unflappable next stage of technology development world-wide and takes the Internet forward.  We started affectionately calling it "Web3" but the terminology was quickly trashed by media and co-opted by "Web2" profit mongers. That's why I love Audius! Audius represents one of the first effective examples of blockchain technology and Web3's original definition: "users own their data".

The Audius Playlister project will start with this basic playlist code streamer.  If you're interested in where this is going, read on.

## WHAT IS THIS?

It's a music player for your web site.

## WHAT PROBLEMS DOES THIS SOLVE?

It allows people to share streaming music playlists with other people.

> Here's an example of it as a stand-alone web page: [STAND-ALONE](https://www.underglimmer.com/listen_with_me/listenwithme.html).

> Here's an example of it embedded on [EMBEDDED](https://www.underglimmer.com/art_stradius.html).

So... who wins by using this tool?

1. Content Creators can share their curated musical playlists with other fans and followers without concern.
2. Your followers can re-visit and replay anything they saw before (it's always streaming).
3. Audius artists can embed their music right into their own web site content.
4. Audius artists will get more exposure for their original music and hopefully generate more interest for themselves.
5. The Audius community and ecosystem will get a boost of some free and easy exposure, perhaps even bringing in more artists and listeners!

The Audius decentralized music streaming service is free for listeners with no audio paywalls and no central corporate authority -- just pure music.

## WHAT IS THE ROADMAP?

This project was conceived to start solving the biggest problem for content creators... how to have music delivered to your viewers along with your online social activities WITHOUT getting burned by copyright infringement issues and streaming platform restrictions. The music on Audius is FREE to stream, a vast collection of music, and hosts some very talented composers, performers.  

The eventual goal is to have a ListenWithMe web-based application that allows users to listen to a playlist in tandem with others using a technique we'll call "scrivening". The initiator of the "listening party" announces by some manner that they've begun playing their ListenWithMe app by email, chat, or other notification.  Then anyone who wants to follow along can initiate the same web app on their own, and engage a streaming session with Audius -- independently -- from the originator or initiator.  This means each user of the application is only listening to their own stream and the web application would try to keep them relatively synchronized based upon the timestamps reported between them.

In other words, the originator is not streaming anything to the users... just inviting them to listen along with them.  Of course, this being across the Internet and from multiple geographies... it will be an imperfect scrivening of the playlist.  But it should be close enough to real-time chat about it.

The hope here is that future rendition of this tool will allow someone to share their ListenWithMe session information via any electronic web-enabled platform such as Twitter, Twitch, Discord, Slack... et cetera.  And others can launch ListenWithMe themselves independently to have the software on their end try to "sync" the playback via a clickable link and loading of a web page hosting the playback.

## HOW CAN I USE IT?

The project's purpose is to always end up with something easy to copy/paste right into a web site or Internet-facing content.

Content editors should be able to make edits (HTML, CSS, JavaScript) to some of the values and paths to meet their particular production environment requirements.

The quick route is to copy the code and files to your environment.  

1. Paste HTML section and the JavaScript section into the same page. 
2. You will need to copy the supporting image files (buttons and placeholder images) and a supporting dedicated CSS files. 
3. Modify the JavaScript as necessary to meet the unique paths from which your web page is being hosted.
4. Modify the JavaScript variables that contain the URL to the playlist on the Audius application you'd like to play.
5. Maybe tinker with the CSS color variables to make it your own. (Edit anything, just make sure you TEST TEST TEST the results).

## THE CODE, THE MISSION

The goal of this project is to give anyone with a modicum of JavaScript, CSS, and HTML skills a chance to embed their own music playback without going through hoops with their hosting providers.  It's written in a minimalist fashion and every attempt has been made (and will continue) to try to make it easier to copy/paste and use by others over time.

The initial vision here is to keep it all in one page.  This avoids Cross Origin Resource Sharing (CORS) security issues.  It also does not require any additional modules or support libraries or frameworks to function.

It's just minimalistic nested promises (fetch blocks) with try/catch error handling to deal with the variability of Internet experiences from any particular endpoint in the world.

> Browser adoption chart here: [Can I Use Web Audio API](https://caniuse.com/audio-api)

> Here's more on the Web Audio API: [Mozilla Developer Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### What does MINIMALIST mean?

Minimalist code is simple structures, straightforward logic, plenty of comments and notes. Minimalist code should be written to avoid reliance on supporting library stacks and the convenience of modular frameworks. 

## IMPLEMENTATION & CODING NOTES

Note from Stradius. First a disclaimer: This is not an Audius sanctioned project.  It was a personal project I decided to make public and see if anyone else could help me make it better.  It is unsupported by Audius and also unsupported by me too.  But if I can spare the personal bandwidth to help you find solutions I will try.

Here are some notes on how I laid out the initial code:

1. FORCE SMALL SCREEN DEVICES TO MAINTAIN SCALE AND STOP WRECKING MY MEDIA QUERIES: If you CAN, it works better when your web page is loaded on a small screen with the ListenWithMe app if you add a meta tag for viewport that restricts automatic scaling.  Let the USERS decide if they want to zoom in.
  
   >```<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=5.0, minimum-scale=0.5">```

3. USER INTERACT TO PERMIT AUDIO PLAYBACK: Thanks to some annoying web-sites in the past, a security model was built around the Web Audio API autoplay functionality. Each company has implemented slightly different solutions in their web browser software. For example (as of this writing 01/2023) in my testing I've found that Chrome & Chromium based browsers (tested on Windows, Ubuntu, and MacOS) may log an error on first-time load attempts to autoplay music but follow-up attempts will be allowed.  On Firefox autoplay is allowed.  On MacOS Safari autoplay is allowed. On iOS Safari (iPhones) the browser will lock-down Web Audio if you try autoplay at all.  That's why the ListenWithMe app has an initial loading phase followed by a "PRESS PLAY" notification.  User Interaction is REQUIRED before autoplay activity can work.  I followed every trick I could find to make track-to-track autoplay happen but I could use some help.
3. NEW CHALLENGES WHEN YOU GO MODULAR: You may of course extract the JavaScript and put it into it's own modular file, loaded by the HTML as a linked resource.  However, be aware, doing so introduces the challenge of browser Content Security Policy (CSP) and Cross-Origin Resource Sharing (CORS) issues as well.  Here are links to information about those subjects (keeping the JavaScript on the same page as the HTML removes the need for these concerns).
   > More about CORS here: [CORS WIKI](https://www.w3.org/wiki/CORS_Enabled).

   > More about CSP here: [CSP WIKI](https://en.wikipedia.org/wiki/Content_Security_Policy)\
5. WELCOME TO THE SPAGHETTI-VERSE: The nature of decentralized multi-node delivery systems means that sometimes user endpoints (the web browser) will lose contact with the service endpoints (a distributed node network). The ListenWithMe code tries several nested fetches of data from the Audius API Endpoints and if there is a failure along the way it will just stop and throw an error. Reloading the page should restart the application. Depending upon your browser security settings, I've seen issues with Audius Nodes being overloaded (they are getting quite popular now) to Audius Nodes attempting to drop from https to http protocol during the stream initiation.  Some browsers do not allow that for obvious reasons.

5. OPTIMIZED FOR HIGH SCORES ON LIGHTHOUSE TESTING: ListenWithMe has been tested against the Google's Lighthouse Mobile and Desktop tests with high success.  But as you adjust the interfaces for your own needs please test frequently.  Everything from color contrast differences to the distance between the buttons and the content can score your test lower on things like Accessibility and Performance.  For example, Audius provides album artwork in 150x150 and 480x480 sizes.  Lighthouse gives higher marks for a minimum size of 300x300 (Accessibility) on desktop so ListenWithMe will pull both 150x150 and 480x480 sizes from Audius and resize the 480x480 to 300x300 for Desktops screen-sizes.

   > More about Lighthouse here: [LIGHTHOUSE OVERVIEW](https://developer.chrome.com/docs/lighthouse/overview/).

7. VARIABLE NAMING: You may note that most of the JavaScript variables are named with a "js" prefix.  This is an habit that helps when you're embedding JavaScript inside server-generated code that may or may not be written in JavaScript itself.  For example: If you were developing on a PHP framework and wanted to embed the JavaScript into your generated HTML output this technique might help you avoid confusion about which variables you're seeing in your code.

8. CSS MODEL: I've tried to stick with using DOM ID references for specific CSS directives and to more easily communicate to the browser about style changes (such as button changes).  I've also tried to adhere to a naming convention that identifies the CSS elements more atomically so that the names won't collide or conflict with your own site naming schemes.

9. UI/UX DESIGN CONCERNS: The footprint of the embedded interfaces is fixed (you may notice extra space).  This was by design so that there would be no janky load and display behavior on your web-site and various smaller screen displays.  You can modify the height for example by adjusting the #aListWrap CSS directives. 

10. SIMPLE STRUCTURES: The code logic is very linear and nested. Annotated and commented throughout for clarity. This code is for others to use so we must always code for the next programmer not just for ourselves.

# HOW CAN I HELP DEVELOP THIS PROJECT?

Volunteers are appreciated! Please help yourself! Download the files. Use them. Improve them. If you have anything you want to contribute back to the project send me a note or a Pull Request! If you would like to join the project please send me a note!

# WHAT IS AUDIUS?

[Check Out AUDIUS!] (https://audius.co).

Per the Audius website: Audius is a next generation Web-3 Streaming Platform. Audius is a brand-new streaming platform built for all musicians, not just those signed to labels. Build a fanbase, share your works in progress, and then publish your completed tracks for all the world to hear.  Create, grow, and monetize, all without the need to graduate off the platform or sign a record deal.

Here is the [Audius White Paper] (https://whitepaper.audius.co/AudiusWhitepaper.pdf).

## SOFTWARE BILL OF MATERIALS

The Software Bill of Materials (SBOM) for this project (if we're doing this right) is... NONE.  The participants of this project are building exposed code and not depending on anything other than the Web Browser technology interpreting the ECMAScript, HTML5 Directives, and CSS Definitions.

This application only requires access to the Audio Output of the Web Browser Software and the ability to make https protocol calls to the Audius API endpoints as listed and provided by the Audius API Data Services.

Thus, any pull requests that use any libraries will be declined.

## LICENSE

[CC0 1.0 Universal] (https://github.com/RandoSigma/AudiusPlaylister/blob/main/LICENSE).

## NO WARRANTY OF ANY KIND

Obviously there is no warranty.  Use at your own risk.  Enjoy!
