### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [v1.18.0](https://github.com/th-ch/youtube-music/compare/v1.17.0...v1.18.0)

- Bump ytdl-core (bug fix) [`#816`](https://github.com/th-ch/youtube-music/pull/816)
- Bump electron and fix tests in CI [`#813`](https://github.com/th-ch/youtube-music/pull/813)
- Allow user to pass custom CSS file [`#800`](https://github.com/th-ch/youtube-music/pull/800)
- [Snyk] Upgrade html-to-text from 8.2.0 to 8.2.1 [`#799`](https://github.com/th-ch/youtube-music/pull/799)
- [Snyk] Upgrade electron-store from 8.0.1 to 8.0.2 [`#772`](https://github.com/th-ch/youtube-music/pull/772)
- Bump jpeg-js from 0.4.3 to 0.4.4 [`#756`](https://github.com/th-ch/youtube-music/pull/756)
- Support MPRIS loop and volume change [`#749`](https://github.com/th-ch/youtube-music/pull/749)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.23.7 to 1.23.8 [`#742`](https://github.com/th-ch/youtube-music/pull/742)
- Use ; instead of space for play/pause. [`#745`](https://github.com/th-ch/youtube-music/pull/745)
- Update readme.md [`#750`](https://github.com/th-ch/youtube-music/pull/750)
- fix lyrics font size [`#753`](https://github.com/th-ch/youtube-music/pull/753)
- fix top gap between nav-bar and browse-page [`#734`](https://github.com/th-ch/youtube-music/pull/734)
- migrate from remote to ipc + fix restart in portable app [`#605`](https://github.com/th-ch/youtube-music/pull/605)
- [Snyk] Upgrade custom-electron-prompt from 1.4.2 to 1.5.0 [`#717`](https://github.com/th-ch/youtube-music/pull/717)
- Picture in Picture v2 [`#685`](https://github.com/th-ch/youtube-music/pull/685)
- Add MPRIS volume control [`#776`](https://github.com/th-ch/youtube-music/issues/776)
- Remove jest [`bb6115f`](https://github.com/th-ch/youtube-music/commit/bb6115fec1a18a416edb365a442eb0b0ee330768)
- migrate from remote to ipc [`5bd9768`](https://github.com/th-ch/youtube-music/commit/5bd97685b9e07c656e0b57a9e02819afc70af1b1)
- v3 [`d23bfe9`](https://github.com/th-ch/youtube-music/commit/d23bfe936840b947ca101fd304464f65d36e88cc)

#### [v1.17.0](https://github.com/th-ch/youtube-music/compare/v1.16.0...v1.17.0)

> 16 May 2022

- Bump ejs from 3.1.6 to 3.1.7 [`#712`](https://github.com/th-ch/youtube-music/pull/712)
- fix injectCSS `did-finish-load` listener overload [`#693`](https://github.com/th-ch/youtube-music/pull/693)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.23.6 to 1.23.7 [`#689`](https://github.com/th-ch/youtube-music/pull/689)
- [Snyk] Upgrade custom-electron-prompt from 1.4.1 to 1.4.2 [`#686`](https://github.com/th-ch/youtube-music/pull/686)
- [Snyk] Upgrade @electron/remote from 2.0.7 to 2.0.8 [`#684`](https://github.com/th-ch/youtube-music/pull/684)
- Improve plugin submenu ux [`#699`](https://github.com/th-ch/youtube-music/pull/699)
- update build action [`#702`](https://github.com/th-ch/youtube-music/pull/702)
- add different modes to video-toggle plugin [`#700`](https://github.com/th-ch/youtube-music/pull/700)
- lint [`#701`](https://github.com/th-ch/youtube-music/pull/701)
- [ImgBot] Optimize images [`#703`](https://github.com/th-ch/youtube-music/pull/703)
- add album to lastfm if available [`#695`](https://github.com/th-ch/youtube-music/pull/695)
- [in-app-menu] add hide icon option [`#680`](https://github.com/th-ch/youtube-music/pull/680)
- Add plugin to bypass age restrictions [`#682`](https://github.com/th-ch/youtube-music/pull/682)
- Add "Picture in picture" plugin [`#674`](https://github.com/th-ch/youtube-music/pull/674)
- Set lyrics metadata from Genius [`#679`](https://github.com/th-ch/youtube-music/pull/679)
- MacOS: bring back the app in dock when using tray + app hidden [`#677`](https://github.com/th-ch/youtube-music/pull/677)
- [Snyk] Upgrade @electron/remote from 2.0.4 to 2.0.5 [`#644`](https://github.com/th-ch/youtube-music/pull/644)
- [Snyk] Upgrade ytpl from 2.2.3 to 2.3.0 [`#660`](https://github.com/th-ch/youtube-music/pull/660)
- [Snyk] Upgrade ytdl-core from 4.10.1 to 4.11.0 [`#659`](https://github.com/th-ch/youtube-music/pull/659)
- Bump plist from 3.0.2 to 3.0.5 [`#678`](https://github.com/th-ch/youtube-music/pull/678)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.23.4 to 1.23.5 [`#624`](https://github.com/th-ch/youtube-music/pull/624)
- [Precise-Volume] fix volumeHud position in miniplayer [`#645`](https://github.com/th-ch/youtube-music/pull/645)
- add always-on-top option [`#655`](https://github.com/th-ch/youtube-music/pull/655)
- [precise-volume] fix expand-volume-slider not updating its value [`#670`](https://github.com/th-ch/youtube-music/pull/670)
- Fix lyrics genius missing parts [`#671`](https://github.com/th-ch/youtube-music/pull/671)
- feat: option to force show like buttons [`#673`](https://github.com/th-ch/youtube-music/pull/673)
- fix custom titlebar in prompt options [`#619`](https://github.com/th-ch/youtube-music/pull/619)
- Process lyrics HTML in Genius util [`d0532d6`](https://github.com/th-ch/youtube-music/commit/d0532d691e56f955ef0b41f5fe2efe6295dddf9e)
- Create first version of picture in picture plugin [`d2265b5`](https://github.com/th-ch/youtube-music/commit/d2265b59d78143cf51fe4dc3d5dee9da66873cc1)
- Bump electron-builder to fix Mac build script [`ae8365f`](https://github.com/th-ch/youtube-music/commit/ae8365f721eafda6c502d02eee86d098f2b9e2a1)

#### [v1.16.0](https://github.com/th-ch/youtube-music/compare/v1.15.0...v1.16.0)

> 20 February 2022

- update in-app-menu [`#596`](https://github.com/th-ch/youtube-music/pull/596)
- Fix clientID [`#602`](https://github.com/th-ch/youtube-music/pull/602)
- Add snoretoast custom compile script [`#600`](https://github.com/th-ch/youtube-music/pull/600)
- fix interactive notifications icon + exclude platform specific plugins from build [`#591`](https://github.com/th-ch/youtube-music/pull/591)
- Add album title to largeImage and change paused icon [`#587`](https://github.com/th-ch/youtube-music/pull/587)
- make useragent override optional [`#595`](https://github.com/th-ch/youtube-music/pull/595)
- get album name from DOM [`#588`](https://github.com/th-ch/youtube-music/pull/588)
- fix various lyrics issues [`#584`](https://github.com/th-ch/youtube-music/pull/584)
- discord set inactivity timeout prompt [`#580`](https://github.com/th-ch/youtube-music/pull/580)
- add single instance lock option [`#578`](https://github.com/th-ch/youtube-music/pull/578)
- fix "restart app on config change" option [`#561`](https://github.com/th-ch/youtube-music/pull/561)
- fix window position save spam [`#562`](https://github.com/th-ch/youtube-music/pull/562)
- load adblocker sooner [`#583`](https://github.com/th-ch/youtube-music/pull/583)
- add description of new plugins to readme [`#585`](https://github.com/th-ch/youtube-music/pull/585)
- Use `center` alignment for lyrics text [`#573`](https://github.com/th-ch/youtube-music/pull/573)
- fix precise-volume hud positioning [`#567`](https://github.com/th-ch/youtube-music/pull/567)
- update electron and dependencies [`#565`](https://github.com/th-ch/youtube-music/pull/565)
- filenamify playlist folder name [`#557`](https://github.com/th-ch/youtube-music/pull/557)
- [Snyk] Security upgrade node-fetch from 2.6.6 to 2.6.7 (3.1.1 incompatible) [`#554`](https://github.com/th-ch/youtube-music/pull/554)
- fix app starting offscreen [`#548`](https://github.com/th-ch/youtube-music/pull/548)
- Release Mac arm64 [`#566`](https://github.com/th-ch/youtube-music/pull/566)
- Build command for Apple (m1) silicon macs  [`#553`](https://github.com/th-ch/youtube-music/pull/553)
- [Snyk] Upgrade custom-electron-titlebar from 3.2.9 to 3.2.10 [`#545`](https://github.com/th-ch/youtube-music/pull/545)
- Fix duplicate media session on linux [`#551`](https://github.com/th-ch/youtube-music/pull/551)
- show a badge remaining items when downloading a playlist [`#550`](https://github.com/th-ch/youtube-music/pull/550)
- allow downloading playlists from popup menu [`#549`](https://github.com/th-ch/youtube-music/pull/549)
- xesam:artist should be a list [`#539`](https://github.com/th-ch/youtube-music/pull/539)
- fix notifications showing thumbnail of last song [`#537`](https://github.com/th-ch/youtube-music/pull/537)
- Fix https://github.com/th-ch/youtube-music/pull/578#issuecomment-1035517531 [`#578`](https://github.com/th-ch/youtube-music/pull/578)
- Add automatic changelog [`1d9bfe8`](https://github.com/th-ch/youtube-music/commit/1d9bfe8ac8869cde648164979986964baa52c2f9)
- update electron to v17.0.0 [`fef7115`](https://github.com/th-ch/youtube-music/commit/fef711549fa9862f8ea23301edde747c5802e352)
- update dependencies [`8be07bc`](https://github.com/th-ch/youtube-music/commit/8be07bcb7ad8b727d97c36aa0760aed4e2fc481f)

#### [v1.15.0](https://github.com/th-ch/youtube-music/compare/v1.14.0...v1.15.0)

> 30 December 2021

- Switch from spectron to playwright to fix tests [`#531`](https://github.com/th-ch/youtube-music/pull/531)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.23.0 to 1.23.1 [`#529`](https://github.com/th-ch/youtube-music/pull/529)
- fix precise-volume options sync [`#525`](https://github.com/th-ch/youtube-music/pull/525)
- Add album art/thumbnail to discord activity [`#524`](https://github.com/th-ch/youtube-music/pull/524)
- fix skip-silences plugin [`#521`](https://github.com/th-ch/youtube-music/pull/521)
- [Snyk] Upgrade electron-updater from 4.6.2 to 4.6.3 [`#520`](https://github.com/th-ch/youtube-music/pull/520)
- update electron & remote & user agents [`#515`](https://github.com/th-ch/youtube-music/pull/515)
- fixes mpris bug in snap [`#513`](https://github.com/th-ch/youtube-music/pull/513)
- Add "Skip silences" plugin [`#519`](https://github.com/th-ch/youtube-music/pull/519)
- Aligned lyric design [`#510`](https://github.com/th-ch/youtube-music/pull/510)
- Fix mpris bugs - follows #480 [`#509`](https://github.com/th-ch/youtube-music/pull/509)
- Various small fixes (discord, video-toggle, precise-volume, playback-speed, shortcuts, lyrics) [`#476`](https://github.com/th-ch/youtube-music/pull/476)
- Mpris + obs-tuna fixes [`#480`](https://github.com/th-ch/youtube-music/pull/480)
- [Snyk] Upgrade node-fetch from 2.6.5 to 2.6.6 [`#498`](https://github.com/th-ch/youtube-music/pull/498)
- fix interaction between blur navbar & in-app-menu [`#491`](https://github.com/th-ch/youtube-music/pull/491)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.22.7 to 1.23.0 [`#475`](https://github.com/th-ch/youtube-music/pull/475)
- New Plugin: Exponential Volume [`#488`](https://github.com/th-ch/youtube-music/pull/488)
- [Snyk] Upgrade electron-updater from 4.6.0 to 4.6.1 [`#474`](https://github.com/th-ch/youtube-music/pull/474)
- Fix loadeddata/metadata video events rarely not firing (+other small fixes) [`#477`](https://github.com/th-ch/youtube-music/pull/477)
- fix #490 [`#490`](https://github.com/th-ch/youtube-music/issues/490)
- fix #472 [`#472`](https://github.com/th-ch/youtube-music/issues/472)
- fix mpris [`ccfe743`](https://github.com/th-ch/youtube-music/commit/ccfe7434bf708ee58156c2952234a049706edfc2)
- lint [`4362101`](https://github.com/th-ch/youtube-music/commit/4362101c0a2ebb7f0536f615cecba8a55ac96702)
- rework songInfo pause listener [`6726e26`](https://github.com/th-ch/youtube-music/commit/6726e2600b3ca3a8d68e3e1b95b50da211fa354d)

#### [v1.14.0](https://github.com/th-ch/youtube-music/compare/v1.13.0...v1.14.0)

> 7 November 2021

- [Snyk] Upgrade custom-electron-prompt from 1.1.0 to 1.2.0 [`#467`](https://github.com/th-ch/youtube-music/pull/467)
- Video Toggle Plugin [`#448`](https://github.com/th-ch/youtube-music/pull/448)
- fix playback speed plugin [`#462`](https://github.com/th-ch/youtube-music/pull/462)
- Fix sponsorblock skipping when not needed [`#465`](https://github.com/th-ch/youtube-music/pull/465)
- Sponsorblock fix + use new apiLoaded event [`#463`](https://github.com/th-ch/youtube-music/pull/463)
- use apiLoaded event in audio-compressor plugin [`#458`](https://github.com/th-ch/youtube-music/pull/458)
- alert on initial hide-menu enabled [`#456`](https://github.com/th-ch/youtube-music/pull/456)
- Blur plugin tweaks and integration with in-app-menu [`#451`](https://github.com/th-ch/youtube-music/pull/451)
- set resume on start url to songInfo.url [`#449`](https://github.com/th-ch/youtube-music/pull/449)
- quality-changer-plugin [`#446`](https://github.com/th-ch/youtube-music/pull/446)
- get songInfo from youtube API [`#443`](https://github.com/th-ch/youtube-music/pull/443)
- New plugin: Blur navigation bar [`#442`](https://github.com/th-ch/youtube-music/pull/442)
- Discord plugin: Clean Up Export (follow-up #380) [`#440`](https://github.com/th-ch/youtube-music/pull/440)
- remove upgrade button + makes images unselectable [`#434`](https://github.com/th-ch/youtube-music/pull/434)
- new auto confirm when paused [`#433`](https://github.com/th-ch/youtube-music/pull/433)
- fix: mpris instance not registering itself and media controls [`#431`](https://github.com/th-ch/youtube-music/pull/431)
- Audio compressor plugin [`#288`](https://github.com/th-ch/youtube-music/pull/288)
- precise-volume plugin fixes & updates [`#275`](https://github.com/th-ch/youtube-music/pull/275)
- Custom Prompt for changing options [`#243`](https://github.com/th-ch/youtube-music/pull/243)
- [Snyk] Upgrade async-mutex from 0.3.1 to 0.3.2 [`#412`](https://github.com/th-ch/youtube-music/pull/412)
- build(deps): bump tmpl from 1.0.4 to 1.0.5 [`#414`](https://github.com/th-ch/youtube-music/pull/414)
- [Snyk] Upgrade node-fetch from 2.6.1 to 2.6.2 [`#416`](https://github.com/th-ch/youtube-music/pull/416)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.22.5 to 1.22.6 [`#429`](https://github.com/th-ch/youtube-music/pull/429)
- build(deps-dev): bump electron from 12.0.8 to 12.1.0 [`#430`](https://github.com/th-ch/youtube-music/pull/430)
- Fix discord clearActivity, menu, listen along option [`#380`](https://github.com/th-ch/youtube-music/pull/380)
- Bump dev deps [`41a01ba`](https://github.com/th-ch/youtube-music/commit/41a01ba58a17056ba5143fdbd10d3bae11dd8d52)
- Discord add reconnecting functionality [`b5fd6b4`](https://github.com/th-ch/youtube-music/commit/b5fd6b4969a318b3738583e7f33eb2c0cf295237)
- add custom-electron-prompt [`e4eed2e`](https://github.com/th-ch/youtube-music/commit/e4eed2e51979378e62dab902e425218cae5108dc)

#### [v1.13.0](https://github.com/th-ch/youtube-music/compare/v1.12.2...v1.13.0)

> 19 September 2021

- [Snyk] Upgrade @cliqz/adblocker-electron from 1.22.4 to 1.22.5 [`#406`](https://github.com/th-ch/youtube-music/pull/406)
- Fix incorrect Google alert caused by changing user agent coresponding to current platform [`#384`](https://github.com/th-ch/youtube-music/pull/384)
- [Snyk] Upgrade electron-updater from 4.4.3 to 4.4.6 [`#401`](https://github.com/th-ch/youtube-music/pull/401)
- [Snyk] Upgrade electron-updater from 4.4.0 to 4.4.1 [`#370`](https://github.com/th-ch/youtube-music/pull/370)
- Bump path-parse from 1.0.6 to 1.0.7 [`#375`](https://github.com/th-ch/youtube-music/pull/375)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.22.2 to 1.22.3 [`#385`](https://github.com/th-ch/youtube-music/pull/385)
- Bump jszip from 3.5.0 to 3.7.1 [`#388`](https://github.com/th-ch/youtube-music/pull/388)
- List missing plugins [`#382`](https://github.com/th-ch/youtube-music/pull/382)
- add tuna plugin for obs [`#397`](https://github.com/th-ch/youtube-music/pull/397)
- Update menu buttons to new format [`#389`](https://github.com/th-ch/youtube-music/pull/389)
- Plugin to fetch lyrics from Genius [`#387`](https://github.com/th-ch/youtube-music/pull/387)
- Add mpris support with cherry picked commit from previous PR https://github.com/th-ch/youtube-music/pull/394 [`#395`](https://github.com/th-ch/youtube-music/pull/395)
- Add "Listen Along" button, solve #353 [`#383`](https://github.com/th-ch/youtube-music/pull/383)
- Bump node to v14 [`#386`](https://github.com/th-ch/youtube-music/pull/386)
- [Snyk] Upgrade electron-updater from 4.3.9 to 4.3.10 [`#350`](https://github.com/th-ch/youtube-music/pull/350)
- [Snyk] Upgrade chokidar from 3.5.1 to 3.5.2 [`#354`](https://github.com/th-ch/youtube-music/pull/354)
- Bump ytdl/ytpl [`c01506d`](https://github.com/th-ch/youtube-music/commit/c01506dc441bfc538471dc2c552c1a8a2800c611)
- Add mpris support [`e255777`](https://github.com/th-ch/youtube-music/commit/e255777283c7b16611404cbfe260bfcca75a1e40)
- Add Genius lyrics plugin [`acbe0ac`](https://github.com/th-ch/youtube-music/commit/acbe0ac25d568c25fedb514e0e96c66497b0f2d6)

#### [v1.12.2](https://github.com/th-ch/youtube-music/compare/v1.12.1...v1.12.2)

> 1 July 2021

- Fix downloader plugin [`#339`](https://github.com/th-ch/youtube-music/pull/339)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.22.0 to 1.22.1 [`#337`](https://github.com/th-ch/youtube-music/pull/337)
- Update and simplify in-app-menu [`#249`](https://github.com/th-ch/youtube-music/pull/249)
- Bump hosted-git-info from 2.8.8 to 2.8.9 [`#331`](https://github.com/th-ch/youtube-music/pull/331)
- Bump lodash from 4.17.20 to 4.17.21 [`#330`](https://github.com/th-ch/youtube-music/pull/330)
- [Snyk] Upgrade ytdl-core from 4.8.0 to 4.8.2 [`#328`](https://github.com/th-ch/youtube-music/pull/328)
- [Snyk] Upgrade electron-updater from 4.3.8 to 4.3.9 [`#324`](https://github.com/th-ch/youtube-music/pull/324)
- Bump normalize-url from 4.5.0 to 4.5.1 [`#323`](https://github.com/th-ch/youtube-music/pull/323)
- Bump trim-newlines from 3.0.0 to 3.0.1 [`#320`](https://github.com/th-ch/youtube-music/pull/320)
- [Snyk] Upgrade @ffmpeg/core from 0.9.0 to 0.10.0 [`#317`](https://github.com/th-ch/youtube-music/pull/317)
- [Snyk] Upgrade @ffmpeg/ffmpeg from 0.9.8 to 0.10.0 [`#316`](https://github.com/th-ch/youtube-music/pull/316)
- [Snyk] Upgrade custom-electron-titlebar from 3.2.6 to 3.2.7 [`#311`](https://github.com/th-ch/youtube-music/pull/311)
- fix hidden webp thumbnail throwing MIME type error in downloader [`#318`](https://github.com/th-ch/youtube-music/pull/318)
- Add Sponsorblock plugin [`#308`](https://github.com/th-ch/youtube-music/pull/308)
- [Snyk] Upgrade @ffmpeg/ffmpeg from 0.9.7 to 0.9.8 [`#305`](https://github.com/th-ch/youtube-music/pull/305)
- Bump dependencies to fix vulnerabilities [`496836b`](https://github.com/th-ch/youtube-music/commit/496836b33b116e06b8d1361ce1f47ab6c9138cae)
- update refreshMenu() function [`33855f1`](https://github.com/th-ch/youtube-music/commit/33855f17dd80c099117a3d84bbd9b5021776771c)
- Add SponsorBlock plugin [`ca64a77`](https://github.com/th-ch/youtube-music/commit/ca64a77ed0236fd9cfb4b40e450578a186638dc7)

#### [v1.12.1](https://github.com/th-ch/youtube-music/compare/v1.12.0...v1.12.1)

> 28 May 2021

- Bump ws from 7.4.3 to 7.4.6 [`#303`](https://github.com/th-ch/youtube-music/pull/303)
- Bump browserslist from 4.16.3 to 4.16.6 [`#301`](https://github.com/th-ch/youtube-music/pull/301)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.20.4 to 1.20.5 [`#300`](https://github.com/th-ch/youtube-music/pull/300)
- [Snyk] Upgrade ytdl-core from 4.5.0 to 4.7.0 [`#299`](https://github.com/th-ch/youtube-music/pull/299)
- [Snyk] Upgrade @ffmpeg/core from 0.8.5 to 0.9.0 [`#298`](https://github.com/th-ch/youtube-music/pull/298)
- [Snyk] Upgrade filenamify from 4.2.0 to 4.3.0 [`#293`](https://github.com/th-ch/youtube-music/pull/293)
- [Snyk] Upgrade ytpl from 2.1.1 to 2.2.0 [`#285`](https://github.com/th-ch/youtube-music/pull/285)
- fix song-info callback duplication [`#269`](https://github.com/th-ch/youtube-music/pull/269)
- fix notification showing appID instead of app name on windows [`#270`](https://github.com/th-ch/youtube-music/pull/270)
- Upgrade electron to v12 [`#273`](https://github.com/th-ch/youtube-music/pull/273)
- fix last-fm overwrite config on each start [`#267`](https://github.com/th-ch/youtube-music/pull/267)
- Downloader tweaks + taskbar progress bar [`#265`](https://github.com/th-ch/youtube-music/pull/265)
- remove `open` dependency from last-fm plugin [`#262`](https://github.com/th-ch/youtube-music/pull/262)
- Fix downloader metadata if not currently playing [`#252`](https://github.com/th-ch/youtube-music/pull/252)
- fix playPause bugs by directly playPause video element [`#259`](https://github.com/th-ch/youtube-music/pull/259)
- Bump ua-parser-js from 0.7.23 to 0.7.28 [`#260`](https://github.com/th-ch/youtube-music/pull/260)
- Fix precise volume listener override [`#253`](https://github.com/th-ch/youtube-music/pull/253)
- fix css not inserting on reload [`#255`](https://github.com/th-ch/youtube-music/pull/255)
- playlist download progressBar using `chokidar` [`53bf7c5`](https://github.com/th-ch/youtube-music/commit/53bf7c5068fdc14f5aa469d47b3174d27f40e05c)
- download progress bar on taskbar [`a8ac2c3`](https://github.com/th-ch/youtube-music/commit/a8ac2c3af988f299be85010e7fea541096b7e261)
- fix: upgrade @cliqz/adblocker-electron from 1.20.4 to 1.20.5 [`c5f84b5`](https://github.com/th-ch/youtube-music/commit/c5f84b568b0c3480af1abc8ff111771e2170a50e)

#### [v1.12.0](https://github.com/th-ch/youtube-music/compare/v1.11.0...v1.12.0)

> 4 May 2021

- Menu tweaks [`#224`](https://github.com/th-ch/youtube-music/pull/224)
- Interactive notifications for windows [`#228`](https://github.com/th-ch/youtube-music/pull/228)
- [Plugin] Precise volume control [`#236`](https://github.com/th-ch/youtube-music/pull/236)
- [Snyk] Upgrade electron-store from 7.0.2 to 7.0.3 [`#244`](https://github.com/th-ch/youtube-music/pull/244)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.20.3 to 1.20.4 [`#233`](https://github.com/th-ch/youtube-music/pull/233)
- Dependencies update [`#231`](https://github.com/th-ch/youtube-music/pull/231)
- Fix downloader metadata [`#245`](https://github.com/th-ch/youtube-music/pull/245)
- Last.fm support [`#196`](https://github.com/th-ch/youtube-music/pull/196)
- simple fix for discord plugin [`#239`](https://github.com/th-ch/youtube-music/pull/239)
- In-app-menu plugin - rename plugin & configure menu builder [`#215`](https://github.com/th-ch/youtube-music/pull/215)
- Allows downloading songs that aren't currently playing [`#221`](https://github.com/th-ch/youtube-music/pull/221)
- Updated download plugin icon color to match other icons [`#222`](https://github.com/th-ch/youtube-music/pull/222)
- [Notification Plugin] Fix duplicate notification [`#216`](https://github.com/th-ch/youtube-music/pull/216)
- Pass metadata to front + use metadata URL in downloader [`#213`](https://github.com/th-ch/youtube-music/pull/213)
- Refresh menu on plugin enable/disable (show/hide submenu) [`#217`](https://github.com/th-ch/youtube-music/pull/217)
- remove 'shortcuts' from default plugins [`#218`](https://github.com/th-ch/youtube-music/pull/218)
- [Plugin] styled-bars [`#201`](https://github.com/th-ch/youtube-music/pull/201)
- Add configurable notification urgency [`#212`](https://github.com/th-ch/youtube-music/pull/212)
- add Download Folder Chooser [`#207`](https://github.com/th-ch/youtube-music/pull/207)
- Improved songinfo provider, by using the data from the '/player' request [`#194`](https://github.com/th-ch/youtube-music/pull/194)
- Download plugin directory chooser [`#10`](https://github.com/th-ch/youtube-music/pull/10)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.20.0 to 1.20.1 [`#180`](https://github.com/th-ch/youtube-music/pull/180)
- [Plugin] taskbar-mediacontrol  (for Windows) [`#200`](https://github.com/th-ch/youtube-music/pull/200)
- merge source [`#3`](https://github.com/th-ch/youtube-music/pull/3)
- merge source [`#2`](https://github.com/th-ch/youtube-music/pull/2)
- Add playlist feature in downloader plugin + custom menus in plugin system [`#203`](https://github.com/th-ch/youtube-music/pull/203)
- Added Discord timeout [`#192`](https://github.com/th-ch/youtube-music/pull/192)
- Override hide(),show(),isVisible from inside plugin [`6427b34`](https://github.com/th-ch/youtube-music/commit/6427b3406c8d84c5b7ecbe6a28158d5dc895c3c2)
- added back original yarn.lock [`24fea5a`](https://github.com/th-ch/youtube-music/commit/24fea5a24afd4f547628549962d24756cca5e413)
- remove local prompt [`8dc486f`](https://github.com/th-ch/youtube-music/commit/8dc486f18fe02a218b149838dc7ab939ec1b698a)

#### [v1.11.0](https://github.com/th-ch/youtube-music/compare/v1.10.0...v1.11.0)

> 9 March 2021

- [Snyk] Upgrade electron-store from 7.0.1 to 7.0.2 [`#178`](https://github.com/th-ch/youtube-music/pull/178)
- Added function to toggle resuming of last song when app starts [`#177`](https://github.com/th-ch/youtube-music/pull/177)
- [Snyk] Upgrade discord-rpc from 3.1.4 to 3.2.0 [`#175`](https://github.com/th-ch/youtube-music/pull/175)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.19.0 to 1.20.0 [`#154`](https://github.com/th-ch/youtube-music/pull/154)
- Added metadata to downloader plugin, and updated packages [`dd1bdae`](https://github.com/th-ch/youtube-music/commit/dd1bdae9478ef831ee2a00b29be04c65626933f8)
- Fix download/speed menu item [`796a7aa`](https://github.com/th-ch/youtube-music/commit/796a7aaaf1ecaf80b2ef113137f2222499803e29)
- fix: upgrade @cliqz/adblocker-electron from 1.19.0 to 1.20.0 [`538ab52`](https://github.com/th-ch/youtube-music/commit/538ab52abd46c2e3c6abb529c5137b5286d29670)

#### [v1.10.0](https://github.com/th-ch/youtube-music/compare/v1.9.0...v1.10.0)

> 7 February 2021

- [Snyk] Upgrade @ffmpeg/ffmpeg from 0.9.6 to 0.9.7 [`#146`](https://github.com/th-ch/youtube-music/pull/146)
- Reuse the same notification, instead of creating a new one each time the song changes. [`#144`](https://github.com/th-ch/youtube-music/pull/144)
- [Snyk] Upgrade ytdl-core from 4.2.1 to 4.3.0 [`#136`](https://github.com/th-ch/youtube-music/pull/136)
- bring the new commits to this fork [`#1`](https://github.com/th-ch/youtube-music/pull/1)
- GH page [`3bcf409`](https://github.com/th-ch/youtube-music/commit/3bcf409f2b1629333714b187c606891cedb12512)
- Add plugin to control playback speed like in YouTube (from 0.25 to 2) [`f7f3185`](https://github.com/th-ch/youtube-music/commit/f7f31850d3d9879002dc47326e4f6ec9a52c25a1)
- Update back.js [`1fdf241`](https://github.com/th-ch/youtube-music/commit/1fdf2416ad414035104bfb51b8450d82e566cb13)

#### [v1.9.0](https://github.com/th-ch/youtube-music/compare/v1.8.2...v1.9.0)

> 15 January 2021

- [Snyk] Upgrade electron-debug from 3.1.0 to 3.2.0 [`#121`](https://github.com/th-ch/youtube-music/pull/121)
- Refactor providers [`#125`](https://github.com/th-ch/youtube-music/pull/125)
- Added Discord rich presence and added extra properties to songInfo provider [`#124`](https://github.com/th-ch/youtube-music/pull/124)
- Fix plugins with context isolation [`#127`](https://github.com/th-ch/youtube-music/pull/127)
- Windows portable exe [`#126`](https://github.com/th-ch/youtube-music/pull/126)
- Split providers in 2 [`0743034`](https://github.com/th-ch/youtube-music/commit/0743034de0443e889ec11d7ea83727ff4fb96599)
- Added Discord rich presence and added extra properties to songinfo provider [`a8ce87f`](https://github.com/th-ch/youtube-music/commit/a8ce87f2ccb4f0fdbd36676883e6a0497bebc263)
- Update discord plugin for new provider + wait for ready [`aec542e`](https://github.com/th-ch/youtube-music/commit/aec542e95e2837f54bf19de675f311444789ea4e)

#### [v1.8.2](https://github.com/th-ch/youtube-music/compare/v1.8.1...v1.8.2)

> 12 January 2021

- Downloader plugin - custom audio format [`#118`](https://github.com/th-ch/youtube-music/pull/118)
- Globalized the song info and song controls, and updated Touch Bar for it. [`#102`](https://github.com/th-ch/youtube-music/pull/102)
- Bump electron to v11 [`#120`](https://github.com/th-ch/youtube-music/pull/120)
- Globalized the songinfo and song controls, and changed the pause/play button. [`9be3e1a`](https://github.com/th-ch/youtube-music/commit/9be3e1afe91f0aa3419040bba65e7b3b83b469c6)
- Simplifies the notification plugin to use the globalized song info [`5bffdbd`](https://github.com/th-ch/youtube-music/commit/5bffdbd6285a6816749c467d6e912d14748f9959)
- Loads providers before plugins [`3a5d9bd`](https://github.com/th-ch/youtube-music/commit/3a5d9bd973bdd67e77f8a7687c1430245a9490bd)

#### [v1.8.1](https://github.com/th-ch/youtube-music/compare/v1.8.0...v1.8.1)

> 8 January 2021

- [Snyk] Upgrade electron-updater from 4.3.5 to 4.3.6 [`#116`](https://github.com/th-ch/youtube-music/pull/116)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.18.8 to 1.19.0 [`#117`](https://github.com/th-ch/youtube-music/pull/117)
- [Snyk] Upgrade ytdl-core from 4.1.1 to 4.1.2 [`#109`](https://github.com/th-ch/youtube-music/pull/109)
- Bump node-notifier from 8.0.0 to 8.0.1 [`#104`](https://github.com/th-ch/youtube-music/pull/104)
- fix: upgrade electron-updater from 4.3.5 to 4.3.6 [`0bf77e5`](https://github.com/th-ch/youtube-music/commit/0bf77e592a87eb8a5222cf2c1588488a51044422)
- fix: upgrade @cliqz/adblocker-electron from 1.18.8 to 1.19.0 [`5c0cc08`](https://github.com/th-ch/youtube-music/commit/5c0cc08d80d60c46e8b27343c6fc302f64fe89e2)
- fix: upgrade ytdl-core from 4.1.1 to 4.1.2 [`e2cc262`](https://github.com/th-ch/youtube-music/commit/e2cc2628aea653739f878ec2cd2e72e2e70018a1)

#### [v1.8.0](https://github.com/th-ch/youtube-music/compare/v1.7.5...v1.8.0)

> 20 December 2020

- Added Touch Bar plugin [`#101`](https://github.com/th-ch/youtube-music/pull/101)
- [Snyk] Upgrade @ffmpeg/core from 0.8.4 to 0.8.5 [`#99`](https://github.com/th-ch/youtube-music/pull/99)
- [Snyk] Upgrade @ffmpeg/ffmpeg from 0.9.5 to 0.9.6 [`#100`](https://github.com/th-ch/youtube-music/pull/100)
- [Readme] Web folder for readme assets + new SVG animation [`#96`](https://github.com/th-ch/youtube-music/pull/96)
- Add new Linux targets (deb, freebsd, rpm) [`#94`](https://github.com/th-ch/youtube-music/pull/94)
- Web folder for readme assets + new svg animation [`01fc965`](https://github.com/th-ch/youtube-music/commit/01fc9651705f457da63615ff774f00957f783d3d)
- touchbar plugin - fixed code style [`7473677`](https://github.com/th-ch/youtube-music/commit/7473677477071ca5e7b18bda3193e345d7fd549f)
- added initial touchbar support [`c3e2c13`](https://github.com/th-ch/youtube-music/commit/c3e2c1380810d156d9d6863fffc804242171bec0)

#### [v1.7.5](https://github.com/th-ch/youtube-music/compare/v1.7.4...v1.7.5)

> 12 December 2020

- Bump ini from 1.3.5 to 1.3.7 [`#92`](https://github.com/th-ch/youtube-music/pull/92)
- Fix adblocking [`#90`](https://github.com/th-ch/youtube-music/pull/90)
- Bump adblocker dependency [`49497d0`](https://github.com/th-ch/youtube-music/commit/49497d0efb28ee0be5b16d0f1c3660efafcd289c)
- Fix adblocker preloading to inject scripts/styles [`66c5ce4`](https://github.com/th-ch/youtube-music/commit/66c5ce46caa85a7ae4ceb3d63a9e168827015c71)
- Add uBlock Origin filters to default sources [`79c7959`](https://github.com/th-ch/youtube-music/commit/79c795927a3be96456a2f45159285c64166a29b8)

#### [v1.7.4](https://github.com/th-ch/youtube-music/compare/v1.7.3...v1.7.4)

> 8 December 2020

#### [v1.7.3](https://github.com/th-ch/youtube-music/compare/v1.7.2...v1.7.3)

> 8 December 2020

- Adblocker: add option to disable default lists [`22c7f70`](https://github.com/th-ch/youtube-music/commit/22c7f70c938566a9db9c4d46a57224cfdee43df0)

#### [v1.7.2](https://github.com/th-ch/youtube-music/compare/v1.7.1...v1.7.2)

> 6 December 2020

- Add AUR badge + beautify badges [`#82`](https://github.com/th-ch/youtube-music/pull/82)
- Bugfix: only use cache with no additional blocklists [`467171a`](https://github.com/th-ch/youtube-music/commit/467171a17e648331d63f166c2da2f3134e95b37f)
- Add AUR tag + beautify tags [`d212206`](https://github.com/th-ch/youtube-music/commit/d21220693b9ffa26e05fe1963376b636b40b9952)
- Readme: add youtube-music logo to badges [`3022fac`](https://github.com/th-ch/youtube-music/commit/3022facbead40ccd81629c37b870ab33ce7fa106)

#### [v1.7.1](https://github.com/th-ch/youtube-music/compare/v1.7.0...v1.7.1)

> 3 December 2020

- Option to restart the app on config changes [`fd97576`](https://github.com/th-ch/youtube-music/commit/fd97576611ae80b959ffe7984e88ddc8d28a1ffc)
- Bump version to 1.7.1 [`e07cac2`](https://github.com/th-ch/youtube-music/commit/e07cac240691b1c9d6909e457824616182374c3a)

#### [v1.7.0](https://github.com/th-ch/youtube-music/compare/v1.6.5...v1.7.0)

> 3 December 2020

- Refactor config, custom plugin options [`#79`](https://github.com/th-ch/youtube-music/pull/79)
- Refactor config for simpler use and advanced options in plugins [`8ab2da0`](https://github.com/th-ch/youtube-music/commit/8ab2da0482b6211b6b6d43423ec06daed48dac4f)
- Allow editing config (advanced) [`f4fe5c2`](https://github.com/th-ch/youtube-music/commit/f4fe5c2a58e1ad555c321f27c00d2d78184fc687)
- Adblocker - advanced options (caching or not, additional lists) [`b94d0d4`](https://github.com/th-ch/youtube-music/commit/b94d0d4e8bd3a92bbb5e012a63fa782baa774be7)

#### [v1.6.5](https://github.com/th-ch/youtube-music/compare/v1.6.4...v1.6.5)

> 2 December 2020

- Add option to disable hardware acceleration [`#77`](https://github.com/th-ch/youtube-music/pull/77)
- Downloader plugin - retry and upgrade dependencies [`#76`](https://github.com/th-ch/youtube-music/pull/76)
- Reflect Arch Linux package name change [`#70`](https://github.com/th-ch/youtube-music/pull/70)
- Option to hide menu [`#67`](https://github.com/th-ch/youtube-music/pull/67)
- Add Arch Linux installation instructions [`#68`](https://github.com/th-ch/youtube-music/pull/68)
- Update ytdl-core to 4.1.1 [`33a11ef`](https://github.com/th-ch/youtube-music/commit/33a11efe9acad234e41ad9044ae9e67fd573b7f4)
- Autoupdate modal: add download/disable updates buttons [`ae5b85d`](https://github.com/th-ch/youtube-music/commit/ae5b85d8d748659f2e23d417560026f24ab8ce9c)
- Option to hide menu (win/linux) [`4bac3ac`](https://github.com/th-ch/youtube-music/commit/4bac3ace186c5be2cb9409d2b703f960bd662145)

#### [v1.6.4](https://github.com/th-ch/youtube-music/compare/v1.6.3...v1.6.4)

> 24 November 2020

#### [v1.6.3](https://github.com/th-ch/youtube-music/compare/v1.6.2...v1.6.3)

> 24 November 2020

- Improve CI [`#64`](https://github.com/th-ch/youtube-music/pull/64)
- Ensure menu is visible on all platforms [`#63`](https://github.com/th-ch/youtube-music/pull/63)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.18.3 to 1.18.4 [`#62`](https://github.com/th-ch/youtube-music/pull/62)
- fix: upgrade @cliqz/adblocker-electron from 1.18.3 to 1.18.4 [`2b243f6`](https://github.com/th-ch/youtube-music/commit/2b243f6dcb00d3b6f27fd066c093e7b16bb384e2)
- CI: cache yarn directory [`0fd4933`](https://github.com/th-ch/youtube-music/commit/0fd49330d3218ec5f1bc62b72ace28e79d02bc93)
- Run CI on every push/PR [`cf4827d`](https://github.com/th-ch/youtube-music/commit/cf4827d780fee510a27eecf42453b0505c52bcf9)

#### [v1.6.2](https://github.com/th-ch/youtube-music/compare/v1.6.0...v1.6.2)

> 22 November 2020

- Add github action to build/release [`#60`](https://github.com/th-ch/youtube-music/pull/60)
- Bump to node 12 [`#59`](https://github.com/th-ch/youtube-music/pull/59)
- Bump to node 12 [`#59`](https://github.com/th-ch/youtube-music/pull/59)
- Add downloader (video -&gt; mp3) plugin (in music menu) [`e197087`](https://github.com/th-ch/youtube-music/commit/e197087a5027af1ca71ecde7bbdf6351137555b9)
- Delete AppVeyor/Travis CI integration [`941dd90`](https://github.com/th-ch/youtube-music/commit/941dd90d77a5c46ed5505918374693fcd892af1f)
- GH action to build/release [`fc4754a`](https://github.com/th-ch/youtube-music/commit/fc4754a1709e6eb70d662f89eafd360aa4a77aa2)

#### [v1.6.0](https://github.com/th-ch/youtube-music/compare/v1.5.0...v1.6.0)

> 11 November 2020

- [Snyk] Upgrade electron-store from 6.0.0 to 6.0.1 [`#54`](https://github.com/th-ch/youtube-music/pull/54)
- Add notifications plugin (notify of song on play event) [`bcff6e5`](https://github.com/th-ch/youtube-music/commit/bcff6e51348645395549c206717225fb16a29cda)
- Plugins/event handlers in each window [`9bc81da`](https://github.com/th-ch/youtube-music/commit/9bc81da6f2c7f5f35769489e179851bdd80a7da8)
- Option to toggle devtools [`3e97e93`](https://github.com/th-ch/youtube-music/commit/3e97e9307cf0991adc5584a603c292b03bc6202d)

#### [v1.5.0](https://github.com/th-ch/youtube-music/compare/v1.4.0...v1.5.0)

> 4 October 2020

- Bump node-fetch from 2.6.0 to 2.6.1 [`#45`](https://github.com/th-ch/youtube-music/pull/45)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.17.0 to 1.18.0 [`#47`](https://github.com/th-ch/youtube-music/pull/47)
- [Snyk] Upgrade electron-updater from 4.3.3 to 4.3.4 [`#40`](https://github.com/th-ch/youtube-music/pull/40)
- Bump elliptic from 6.5.2 to 6.5.3 [`#38`](https://github.com/th-ch/youtube-music/pull/38)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.16.0 to 1.16.1 [`#37`](https://github.com/th-ch/youtube-music/pull/37)
- Bump lodash from 4.17.15 to 4.17.19 [`#34`](https://github.com/th-ch/youtube-music/pull/34)
- Option to start at login [`#32`](https://github.com/th-ch/youtube-music/pull/32)
- Bump dependencies [`97dce5a`](https://github.com/th-ch/youtube-music/commit/97dce5ad41ba7ff7a12d4e57a6a0acfeccd666d8)
- Bump electron to v10 (+ remove devtron, bump spectron) [`5f0dcbb`](https://github.com/th-ch/youtube-music/commit/5f0dcbb3fc9b2912bba690db232184d32c599150)
- Navigation plugin: fix arrow style [`8d74a0a`](https://github.com/th-ch/youtube-music/commit/8d74a0a9b52c5b5a04b0986e5fbec9b47a35823e)

#### [v1.4.0](https://github.com/th-ch/youtube-music/compare/v1.3.3...v1.4.0)

> 12 July 2020

- Bump electron from 8.2.1 to 8.2.4 [`#31`](https://github.com/th-ch/youtube-music/pull/31)
- [Snyk] Upgrade electron-store from 5.1.1 to 5.2.0 [`#30`](https://github.com/th-ch/youtube-music/pull/30)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.14.4 to 1.15.0 [`#29`](https://github.com/th-ch/youtube-music/pull/29)
- [Snyk] Upgrade electron-debug from 3.0.1 to 3.1.0 [`#28`](https://github.com/th-ch/youtube-music/pull/28)
- [Snyk] Upgrade electron-updater from 4.3.1 to 4.3.2 [`#27`](https://github.com/th-ch/youtube-music/pull/27)
- [Snyk] Upgrade electron-updater from 4.3.0 to 4.3.1 [`#26`](https://github.com/th-ch/youtube-music/pull/26)
- [Snyk] Upgrade @cliqz/adblocker-electron from 1.14.1 to 1.14.2 [`#25`](https://github.com/th-ch/youtube-music/pull/25)
- [Tests] Add integration tests [`#24`](https://github.com/th-ch/youtube-music/pull/24)
- Add jest, spectron and getPort util for tests [`736a706`](https://github.com/th-ch/youtube-music/commit/736a70680108620cdecab2da9dd48e10354c713e)
- fix: upgrade electron-updater from 4.3.1 to 4.3.2 [`8c94510`](https://github.com/th-ch/youtube-music/commit/8c945100e24187885dbbe5bb7830b1da11e4eaa2)
- Add jest config and test environment to launch app [`bce5b7d`](https://github.com/th-ch/youtube-music/commit/bce5b7d8ebd96886d462a3c999d72e6c69b6f807)

#### [v1.3.3](https://github.com/th-ch/youtube-music/compare/v1.3.2...v1.3.3)

> 29 April 2020

- Move tray click callback in setUpTray [`4824dda`](https://github.com/th-ch/youtube-music/commit/4824dda5d52565deb5cd6ef4b51d2d742677a154)
- Bump version to 1.3.3 [`37cac19`](https://github.com/th-ch/youtube-music/commit/37cac19d9ccae59b89a68b995eaf7e08c7d24d11)

#### [v1.3.2](https://github.com/th-ch/youtube-music/compare/v1.3.1...v1.3.2)

> 26 April 2020

- [Snyk] Upgrade electron-updater from 4.2.5 to 4.3.0 [`#22`](https://github.com/th-ch/youtube-music/pull/22)
- fix: upgrade electron-updater from 4.2.5 to 4.3.0 [`9821300`](https://github.com/th-ch/youtube-music/commit/98213005d09d00bf013d2217809736bdc334ede6)
- Hide the app (no quit) on close if tray enabled [`430687f`](https://github.com/th-ch/youtube-music/commit/430687f4d6d301aaeaeeaa11ae34d971ac3280df)
- Show/hide window when clicking on tray [`058371a`](https://github.com/th-ch/youtube-music/commit/058371ace8fbd3d9f126454fdc7dbff86df05506)

#### [v1.3.1](https://github.com/th-ch/youtube-music/compare/v1.2.0...v1.3.1)

> 12 April 2020

- Add options and tray [`#21`](https://github.com/th-ch/youtube-music/pull/21)
- Upgrade outdated dependencies [`#20`](https://github.com/th-ch/youtube-music/pull/20)
- [Plugins] Migrate ad blocker [`#19`](https://github.com/th-ch/youtube-music/pull/19)
- Upgrade xo [`297de08`](https://github.com/th-ch/youtube-music/commit/297de08278c2704b3baf65c455bba72f72acc06f)
- Bump electron-builder (needed after electron upgrade) [`3d9e59d`](https://github.com/th-ch/youtube-music/commit/3d9e59dc90e0e994e20af55af9134477e68907a5)
- Migrate from adblock-rs to cliqz [`422c3fc`](https://github.com/th-ch/youtube-music/commit/422c3fc28d83da309a80447dcd5064a4346580e8)

#### [v1.2.0](https://github.com/th-ch/youtube-music/compare/v1.1.6...v1.2.0)

> 15 March 2020

- [Snyk] Upgrade electron-localshortcut from 3.1.0 to 3.2.1 [`#13`](https://github.com/th-ch/youtube-music/pull/13)
- [Snyk] Upgrade electron-updater from 4.0.6 to 4.2.2 [`#12`](https://github.com/th-ch/youtube-music/pull/12)
- [Snyk] Upgrade electron-debug from 2.1.0 to 2.2.0 [`#15`](https://github.com/th-ch/youtube-music/pull/15)
- Fix vulnerability [`#16`](https://github.com/th-ch/youtube-music/pull/16)
- Plugin: autoconfirm when paused [`#11`](https://github.com/th-ch/youtube-music/pull/11)
- Migrate to yarn to install packages without package.json (but keep npm rebuild) [`9371a48`](https://github.com/th-ch/youtube-music/commit/9371a4827e2312258a4f692c18f964155d57ceb8)
- Bump electron-store to fix a vulnerability [`7050dfc`](https://github.com/th-ch/youtube-music/commit/7050dfca5c6a545dabc334690572d7f88b37e027)
- Bump electron updater [`f25bb59`](https://github.com/th-ch/youtube-music/commit/f25bb59065d84cde202b5192688847c528c6ef61)

#### [v1.1.6](https://github.com/th-ch/youtube-music/compare/v1.1.5...v1.1.6)

> 11 September 2019

- Bump eslint-utils from 1.3.1 to 1.4.2 [`#7`](https://github.com/th-ch/youtube-music/pull/7)
- Bump lodash.mergewith from 4.6.1 to 4.6.2 [`#4`](https://github.com/th-ch/youtube-music/pull/4)
- Bump lodash from 4.17.11 to 4.17.14 [`#5`](https://github.com/th-ch/youtube-music/pull/5)
- npm audit fix [`1a72129`](https://github.com/th-ch/youtube-music/commit/1a72129108935cbe732621d93b877e90d11a4195)
- Fix Google login [`746b5f1`](https://github.com/th-ch/youtube-music/commit/746b5f13bb08c614df290e69946cfd116a550521)
- Bump version to 1.1.6 [`6fd10ea`](https://github.com/th-ch/youtube-music/commit/6fd10ea4a0f63e9a46e7307d811977f4e0f3213f)

#### [v1.1.5](https://github.com/th-ch/youtube-music/compare/v1.1.4...v1.1.5)

> 6 July 2019

- Fix navigation plugin [`b10a1bb`](https://github.com/th-ch/youtube-music/commit/b10a1bb32dbea187422a43487527c379a9ddbb26)
- Bump version to 1.1.5 [`07c4a42`](https://github.com/th-ch/youtube-music/commit/07c4a429c15f22b173629618518abb97d9ec0100)

#### [v1.1.4](https://github.com/th-ch/youtube-music/compare/v1.1.3...v1.1.4)

> 8 June 2019

- isDev -&gt; is package [`a85325f`](https://github.com/th-ch/youtube-music/commit/a85325f33dbd40517b6029e500569fc1640af2ef)
- Add titlebar/frame only on MacOS [`b1c4cc9`](https://github.com/th-ch/youtube-music/commit/b1c4cc9c45cc48413118aec8ce54767b1983a3e7)
- Bump version to 1.1.4 [`0420f2e`](https://github.com/th-ch/youtube-music/commit/0420f2e49e295cede0db22dbb1f35ffafd6318ed)

#### [v1.1.3](https://github.com/th-ch/youtube-music/compare/v1.1.2...v1.1.3)

> 2 June 2019

- Bump fstream from 1.0.11 to 1.0.12 [`#3`](https://github.com/th-ch/youtube-music/pull/3)
- Version 1.1.3 + npm audit fix [`147ac48`](https://github.com/th-ch/youtube-music/commit/147ac48de6540c836e835fefe47e66e55dbdc9bc)
- Fix case for {en/dis}ablePlugin [`e86d63d`](https://github.com/th-ch/youtube-music/commit/e86d63da8cb083b89c2a26e6514a5b0df8868b13)
- Remove outdated download links [`ec58b5c`](https://github.com/th-ch/youtube-music/commit/ec58b5cbedda8d6f881f0e81f185a1707dbe5fab)

#### [v1.1.2](https://github.com/th-ch/youtube-music/compare/v1.1.1...v1.1.2)

> 1 May 2019

- Display error/retry in case of failure [`5a1d7fb`](https://github.com/th-ch/youtube-music/commit/5a1d7fbf230fcd840a3ea654f31602fb5f504852)
- Bump version to 1.1.2 [`eac2c5c`](https://github.com/th-ch/youtube-music/commit/eac2c5cf14d0a348704f7fbf0ff0bdce02758670)

#### [v1.1.1](https://github.com/th-ch/youtube-music/compare/v1.1.0...v1.1.1)

> 28 April 2019

- Update package lock [`2d3f77d`](https://github.com/th-ch/youtube-music/commit/2d3f77d96211460bb81a73c8c62b9e5407a7cf30)
- Add travis config [`5279a45`](https://github.com/th-ch/youtube-music/commit/5279a45f3537170006ba04cd5d59ac8b879d78a5)
- Add Appveyor config [`abc2bb8`](https://github.com/th-ch/youtube-music/commit/abc2bb8a4f749704f2daf376c0d392030f030caf)

#### [v1.1.0](https://github.com/th-ch/youtube-music/compare/v1.0.0...v1.1.0)

> 19 April 2019

- Build script + check for updates [`b3c24a5`](https://github.com/th-ch/youtube-music/commit/b3c24a521281c352c37d649e8334b581b2a1de4f)
- Add download section in readme [`828e8d4`](https://github.com/th-ch/youtube-music/commit/828e8d472ca3d76dea71d95a85f8fa726404b8e7)
- Add release/licence badge in readme [`9d343bf`](https://github.com/th-ch/youtube-music/commit/9d343bf779f2fa830302cc84c484bf4a93a25f36)

#### v1.0.0

> 19 April 2019

- Initial commit - app + 4 plugins [`8787b5c`](https://github.com/th-ch/youtube-music/commit/8787b5c175d02b52de65f2c559b411d999fa51e4)
- Fix screenshot shadow + compress image [`c5c128f`](https://github.com/th-ch/youtube-music/commit/c5c128fa0f77c69e9bf12f6ca551315b37c51e84)
- Missing quote in readme [`4b446ac`](https://github.com/th-ch/youtube-music/commit/4b446ac7c816c660cf369f3b8b6e420f766ee35f)
