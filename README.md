# Audius Playlister: Listen With Me!

## OVERVIEW

I wanted to build a tool that would let multiple users try to keep some semblance of "synchronized" listening. That is to say that each user would have their OWN end-point to end-point relationship with the origin of a musical source.  But the playlist would be somewhat synchronized by a third-party "logging/reporting" tool such as a chat room or Twitch stream or Twitter even.

A responsibly coded JavaScript web-enabled player for Audius Playlists. NO LIBRARIES. Clean reliance on the browser technologies built into the Web Browser software to support HTML5, CSS, and the DOM.

Blockchain technology is coming of age regardless of what the news sources think. It's an unstoppable unflappable next stage of technology development world-wide and takes the Internet itself to the next stage.  We started affectionately calling it "Web3" but the terminology was quickly trashed by media and stolen by "Web2" profit mongers.

This project is a purely open-source project which only leverages existing ECMAScript compatible JavaScript built-into common web-browser technology as of this writing. Use it as an example or copy/cut/paste/edit it into your own web-sites if you wish.

Audius is a Web3 block-chain based application model that can replace Web2 music sources like Spotify, Youtube, Amazon, Soundcloud and others. There is no "advertising revenue" system. The model is built upon a Blockchain and service participants are paid by staking Audio tokens to "feed the transaction staking system".

The Audius Playlister project will start with this basic embeddable minimal code streamer.  If you're interested in where this is going, read on. This is a purely open-source project which only leverages existing ECMAScript compatible JavaScript built-into common web-browser technology as of this writing. Use it as an example or copy/cut/paste/edit it into your own web-sites if you wish.

## WHAT IS THIS?

A responsibly coded JavaScript-based HTML5/CSS3 web-enabled player for streaming your Audius Playlists directly to your web users. No libraries required. It leverages clean reliance on the built-in web browser capabilities.  It's been tested on the latest (as of this writing) versions of the popular web browsers: Chrome, Chromium, Firefox, Brave. Safari has issues with the same code but can play one track at a time. The back-bone of this code works upon WebAudio technology supported by standard browsers. Audius is a decentralized music streaming platform.

Browser adoption chart here: [Can I Use Web Audio API] (https://caniuse.com/audio-api)

## WHAT PROBLEMS DOES IT SOLVE?

This project was conceived to start solving the biggest problem for content creators... how to have music delivered to your viewers along with your online social activities WITHOUT getting burned by copyright infringement issues and streaming platform restrictions. The music on Audius is FREE to stream, a vast collection, and some very talented composers, performers, et al.  Initially the goal is to have a ListenWithMe web-based application that allows users to listen to a playlist "in tandem" with the promoter using a technique we'll call scrivening. The initiator of the "listening party" announces by some manner that they've begun playing their ListenWithMe app by email, chat, or other notification.  Then anyone who wants to follow along can initiate the same web app, and engage a streaming session with Audius -- independently -- from the originator or host of whatever event is taking place.  This means each user of the application is only listening to their own stream and the web application would try to keep them "relatively" in sync based upon the timestamps reported between them.

In other words, the originator is not streaming anything to the users... just inviting them to listen along with them.  Of course, this being across the Internet and from multiple geographies... it will be an imperfect scrivening of the playlist.  But it should be close enough to real-time chat about it.

The hope here is that future rendition of this tool will allow someone to share their ListenWithMe session information via any electronic web-enabled platform such as Twitter, Twitch, Discord, Slack... et cetera.  And others can launch ListenWithMe themselves independently to have the software on their end try to "sync" the playback via a clickable link and loading of a web page hosting the playback.

Here's an example of it embedded on [Underglimmer] (https://www.underglimmer.com/art_stradius.html).

So... who wins by using this tool?

1. Content Creators can share their curated musical playlists with other fans and followers without concern.
2. Your followers can re-visit and replay anything they saw before (it's always streaming).
3. Audius artists can embed their music right into their own web site content.
4. Audius artists will get more exposure for their original music and hopefully generate more interest for them.
5. Audius community and ecosystem will get a boost of some free and easy exposure, perhaps even bringing in more artists and listeners!
6. The Audius decentralized music streaming service is free for listeners with no audio paywalls and no central corporate authority -- just pure music.

## HOW CAN I USE IT?

The project's goal is to end up with something easy to copy/paste right into your own web sites or projects.  Make edits to some of the values and paths to meet your particular production environment, tweak the CSS and HTML as required and let you have over your content.  The initial version here is to keep it all in one page.  This avoids Cross Origin Resource Sharing (CORS) security issues.  It also does not require any additional modules or support libraries or frameworks to function.

It's just minimalistic nested promises (fetch blocks) with try/catch error handling to deal with the variability of Internet experiences from any particular endpoint in the world.

The quick route is to copy the code and files to your environment.  

1. Paste HTML section and the JavaScript section into the same page. 
2. You will need to add the supporting image files (buttons and placeholder images) and a supporting dedicated CSS file to the same page. 
3. Modify the JavaScript as necessary to meet the unique paths from which your web page is being hosted.
4. Modify the JavaScript variables that contain the URL to the playlist on the Audius application you'd like to play.
5. Maybe tinker with the CSS color variables to make it your own. (Edit anything, just make sure you TEST TEST TEST the results).

## CODING STANDARDS

The goal of this project is to give anyone with a modicum of JavaScript, CSS, and HTML skills a chance to embed their own music playback without going through hoops with their hosting providers.  It's written in a "minimalist" fashion and every attempt has been made (and will continue to evolve) to try to make it easier to copy/paste and use by others over time.

### What does MINIMALIST mean?

Minimalist code is simple structures, straighforward logic, plenty of comments and notes. Minimalist code should be written to avoid in as many ways as possible reliance on supporting library stacks and the convenience of modular functionality frameworks. The Open Source Community and the Unix/Linux Mindset always treats every function as an atomic isolated tool.  This is what makes Linux environments so much more reliable and so much more powerful than many other operating systems.  This project should end up being an atomic isolated tool for web content creators as well.

## IMPLEMENTATION & CODING NOTES

Note from Stradius. First a disclaimer.  This is not an Audius sanctioned project.  It was a personal project I decided to make public and see if anyone else could help me make it better.  It is unsupported by Audius and also unsupported by me too.  But if I can spare the personal bandwidth to help you find solutions I will.

Here are some notes on how I laid out the initial code:

1. FORCE SMALL SCREEN DEVICES TO MAINTAIN SCALE AND STOP WRECKING MY MEDIA QUERIES: If you CAN, it works better when your web page is loaded on a small screen with the ListenWithMe app if you ade a meta tag for viewport that restricts automatic scaling.  Let the USERS decide if they want to zoom in.

> <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=5.0, minimum-scale=0.5"/>

2. USER INTERACT TO PERMIT AUDIO PLAYBACK: Thanks to some annoying web-sites in the past, a security model was built around the WebAudio API Autoplay functionality and the implementation seems to have been different depending upon which browser you use.  For example (as of this writing 01/2023) in my testing I've found that Chrome & Chromium based browser (tested on Windows, Ubuntu, MacOS) may log an error on first-time load attempts to autoplay music but follow-up attempts will be allowed.  On Firefox autoplay is allowed.  On MacOS Safari autoplay is allowed. On iOS Safari (iPhones) the browser will lock-down WebAudio is you try autoplay at all.  That's why the web-app has an initial loading phase followed by a "PRESS PLAY" notification.  User Interaction is REQUIRED before autoplay activity can work.  This app follows every trick I could find to make each track in the playlist engage automatically in the sequence dictated by the Playlist.

3. NEW CHALLENGES WHEN YOU GO MODULAR: You may of course extract the JavaScript and put it into it's own modular file, loaded by the HTML as a linked resource.  However, be aware, doing so introduces the challenge of browser Content Security Policy (CSP) challenges and Cross-Origin Resource Sharing (CORS) issues as well.  Here are links to information abou those subjects (keeping the JavaScript embedded removes the need for these concerns).

  More about CORS here: [CORS WIKI](https://www.w3.org/wiki/CORS_Enabled).

  More about CSP here: [CSP WIKI](https://en.wikipedia.org/wiki/Content_Security_Policy)

4. WELCOME TO THE SPAGHETTI-VERSE: The nature of decentralized multi-node delivery systems means that sometimes user endpoints (the web browser) will lose contact with the service endpoints (a distributed node network). The ListenWithMe code tries several nested fetches of date from the Audius API Endpoints and if there is an error anywhere along the way it will just stop and throw an error. Reloading the page should restart the application. Depending upon your browser security settings, I've seen issues with Audius Nodes being overloaded (they are getting quite popular now) to Audius Nodes attempting to drop from https to http mode during the stream initiation.  Some browsers do not allow that.

5. OPTIMIZED FOR HIGH SCORES ON LIGHTHOUSE TESTING: The player has been tested against the Google's Lighthouse Mobile and Desktop tests with high success.  But as you adjust the interfaces for your own needs please test frequently.  Everything from color contrast differences to the distance between the buttons and the content can score your implementation lower on things like Accessibility.  For example, Audius provides album artwork in 150x150 and 480x480 sizes.  Lighthouse gives higher marks for a minimum size of 300x300 on desktop so ListenWithMe will pull both 150x150 and 480x480 sizes from Audius and resize the 480x480 to 300x300 for Desktops screen-sizes.

  More about Lighthouse here: [LIGHTHOUSE OVERVIEW](https://developer.chrome.com/docs/lighthouse/overview/).

7. VARIABLE NAMING: You may note that most of the JavaScript variables are named with a "js" prefix.  This is an old habit that helps when you're embedding JavaScript inside server-generated code that may or may not be written in JavaScript.  For example: If you were developing on a PHP framework and wanted to embed the JavaScript into your generated HTML output this technique might help you avoid confusion about which variables you're seeing in your code.

8. CSS MODEL: I've tried to stick with ID references for specific directives in the CSS and to more easily communicate to the browser about style changes (such as button changes).  I've also tried to adhere to a naming convention that identifies the CSS elements more atomically so that the names won't collide or conflict with your own site naming schemes.

9. SIMPLE STRUCTURES: The code is very linear and exceedingly annotated/commented for clarity. This code is for others to use so we must always code for the next programmer not just for ourselves.

# HOW CAN I HELP DEVELOP THIS PROJECT?

First that would be a well received request!  Please help yourself, download the files, use them.  Improve them.  If you have anything you want to contribute back to the project send me a note! If you'd like to join the project, request a PULL of the repository!

# WHAT IS AUDIUS?

[Check Out AUDIUS!] (https://audius.co).

BlockChain technology is coming of age regardless of what the news sources think. It's an unstoppable unflappable next stage of technology development world-wide and takes the Internet itself to the next stage which we started affectionately calling "Web3" but was quickly trashed by media and stolen by "Web2" profit-monger corporations. 

Here is the [Audius Whitepaper] (https://whitepaper.audius.co/AudiusWhitepaper.pdf).


## SOFTWARE BILL OF MATERIALS

The Software Bill of Materials (SBOM) for this project (if we're doing this right) is... NONE.  The participants of this project are building exposed code and not depending on anything other than the Web Browser technology interpreting the ECMAScript, HTML5 Directives, and CSS Definitions.

This application only requires access to the Audio Output of the Web Browser Software and the ability to make https protocol calls to the Audius API endpoints as listed and provided by the Audius API Data Services.

## LICENSE

[CC0 1.0 Universal] (https://github.com/RandoSigma/AudiusPlaylister/blob/main/LICENSE).

## NO WARRANTY OF ANY KIND

Obviously there is no warranty.  Use at your own risk.  Enjoy!
