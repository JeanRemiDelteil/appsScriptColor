# appsScriptColor
Google Chrome extension that provides folders display, and a dark color theme to the Google apps script editor.

https://chrome.google.com/webstore/detail/appsscript-color/ciggahcpieccaejjdpkllokejakhkome

Note: Editing the code is not something in the scope of this extension.\
So these are out of scope:

- Custom code autocomplete
- Code folding,
- Different code editor (--> use CLASP locally)

## Description

### Info about the new GAS editor and AppsScript Color (2020-12-24) ###

Folder support is fully available. Juste use "/" in the file name.

Two dark theme are available in the IDE (themes only applies to the IDE, not to the full page)

Use the "Sun/Moon" icon to toggle the dark mode on and off, To select a different color theme, open the IDE action menu with [F1] (while focusing the IDE), then type either "theme"
, or on of the following:

- Darcula
- Monokai

###

For the old IDE version user:

AppsScript Color provides other color themes for Apps Script developers.

These dark themes are more contrasted and comfy, allowing to code for hours !
Choose from the 'Colors' integrated menu one of the following themes :

- Black fox console
- Darcula
- Default

For now the extension applies a color theme of your choice on Apps Scripts open on script.google.com
It works for standalone scripts and scripts linked to native Google documents.

[new] Customize your own theme with the Theme editor !

AppsScriptColor also add a structured Folder view for a tidier file list !
To add folders, rename your files to include the path in their name:
myFolder/some_subfolder/myfileName

Updated :

v1.4.0

- Full support of the new GAS online IDE (not all theme are available)

v1.1.1

- Fix some colors changes

v1.1.0

- Custom theme editor allows to create theme derivated from the 3 default themes\
  Find the Theme Editor in the color menu

v1.0.2

- Folder are grouped above files
- Folder color match their nesting level

v1.0.1
- New Folder system: use the '/' character in your file names to display a structure Folder view This will allow great compatibility with the new CLASP command line
  tool (https://github.com/google/clasp)

v0.3.6
- Fix adding or removing a folder work as expected again

v0.3.5
- Fix Color not applied at page loading

v0.3.3
- Fix GAS CSS update for font

v0.3.2
- New scroll-bar color for Black fox console

v0.3.1
- Smoother folder opening

v0.3.0
- Added custom Folders to sort your files locally !
- Updated color schemes to account for the folders

v0.2.3
- Minor bug fixes : the extension only run script edit page

v0.2.0
- New color theme : Darcula, with bigger font
- Colors menu: Choose from the 2 existing themes or set to the default

v0.1.1
- Added more suited color for HTML template tokens ( <?  ?> )
