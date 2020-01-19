# appsScriptColor
Google Chrome extension to change the color style of the (GAS) google apps script editor

https://chrome.google.com/webstore/detail/appsscript-color/ciggahcpieccaejjdpkllokejakhkome


TODO / Nice to have
- keyboard shortcut to navigate between coding tab

Note: Editing the code is not something in the scope of this extension.\
So these are out of scope:
- Custom code autocomplete
- Code folding,
- Different code editor (--> use CLASP locally) 

## Description

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

v1.1.1
- Fix some colors changes

v1.1.0
- Custom theme editor allows to create theme derivated from the 3 default themes\
Find the Theme Editor in the color menu

v1.0.2
- Folder are grouped above files
- Folder color match their nesting level

v1.0.1
- New Folder system: use the '/' character in your file names to display a structure Folder view
This will allow great compatibility with the new CLASP command line tool (https://github.com/google/clasp)

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
