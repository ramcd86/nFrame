
##############################################################
##############################################################
##############################################################

			                nFrame
A modern modular front-end build toolkit for Made To Engage. 

##############################################################
##############################################################
##############################################################



### 1.0) F.A.Q



### 1.1) What is nFrame?
nFrame is a toolkit which marries together existing Front-End Development practices and packages them in an easy-to-use, easy-to-deploy system built around the Gulp.js task manager.



### 1.2) Why was nFrame developed?
nFrame was developed in response to a perceived lack of flexibility and extensibility in the existing accelerator Front-End build pipeline. While this pipeline was extremely well configured and highly functional, the Front-End team struggled to modify and extend the system to meet modern requirements, as well as implement Front-End Frameworks into the existing webPack configuration. 



### 1.3) Why not simply modify the existing Front-End Configuration in the Accelerator?
webPack is an excellent build tool and is used extensively at the heart of many Front-End Frameworks including Angular, React, and Vue. However, all these Frameworks express a need for dominant control of the webPack configuration, except for React which can eject its webPack configuration and allow users to modify it. In addition to this, webPack is significantly more challenging to configure correctly over a more function-oriented build tool like Gulp, Gulp is also a more familiar tool internally as existing projects make use of gulp extensively to compile the front-end. 



### 1.4) What benefits does nFrame offer Made To Engage over the existing Accelerator process, why is it better?
As mentioned above, there were existing challenges modifying the webPack configuration in the Accelerator and attaching additional tools or frameworks to the accelerator was challenging and time consuming for the Front-End team, additionally the ‘catch all’ nature of the file distribution in the Accelerator meant that SCSS and JS files were not group locally and were not necessarily easy to find and configure. The development process was also made vaguer by this folder layout, with blocks and pages all containing an index.scss and index.js folder, leading to scenarios where Front-End developers would have 6 to 10 instances of ‘index’ open in various tabs in a single project and while this wasn’t necessarily a massively problematic issue it did create confusion with ongoing builds from a developer’s point of view.



### 1.5) What technologies exist in nFrame?
nFrame contains and is made up of existing familiar technologies such as Gulp, Angular, Babel, jQuery, Bootstrap, and TypeScript.



### 1.6) What significant changes exist in nFrame over the existing Accelerator?
nFrame uses a ‘soft’ implementation of TypeScript over standard ES6 with strict type checking turned off, but still largely requiring the code to be written in an ES6-style format, i.e. using imports and class declarations. While this is different from the existing Accelerator’s ‘catch-all’ method of compiling ES6, it is more in-line with best practice for both ES6 and TypeScript. Standard, functional ES5/Jquery can still be used in the main.ts file found in the webTS folder.



### 2.0) Technical Implementation

### 2.1) How do we technically implement nFrame?
nFrame is designed to be configured simplistically and deployed simplistically. One of the many ongoing complaints about front-end build process across various projects is how much they vary, both with legacy and current projects. nFrame makes use of node variables to make setup and execution as simplistic as possible.

### 2.2) Configuring nFrame.
-	Navigate to the nFrame folder inside of the project root, and open package.json.
-	Navigate to the ‘configuration’ variable in the JSON object, typically found on line 6.
-	Examine the configuration variables, currently there are 3 variables ‘environment’, ‘useAngular’, and ‘watch’.
-	“environment”: This should be set to either “development ”, or “production”. 
-	 If the environment is set to “development”, the Gulp will compile nFrame with sourcemaps, as well as uncompressed JS, allowing for debugging and development.
-	 if the environment is set to “production”, the Gulp file will compile nFrame with no sourcemaps, as well as compressed, uglified, and optimized JS and CSS bundles.
-	“useAngular”: This should be set to either true or false.
-	 If useAngular is set to true, Gulp will run the Angular compiler with its configuration variables intact. It will also transpile TypeScript files which exist outside of the Angular folder (the webApp folder) and pull them into the build.
-	 if useAngular is set to false, Gulp will transpile the TypeScript in (the webTS folder) using the TypeScript compiler, and step through the process of transpiling TypeScript to ES5.
-	“watch”: The watch variable, if set to true, will allow the compiler to watch for active changes in the project and quickly recompile them. (This can be overriden by simply using the npm run watch command).
-	Open a Terminal Window in the same location as the nFrame folder and type npm install to install the relevant node dependencies.
- Navigate to the gulpfile.js file. Observe lines 51 to 72. Lines 51, 52, 53, and 54 are specifically for co-ordinating the outputs of the nFrame build process. Tailor these to your project specific liking.


### 2.3) Building nFrame locally.
With the steps above completed, nFrame can now be built. What nFrame does from this point forward will depend on the configuration options you have set above. The factory configuration for nFrame is for the environment variable is ‘development’, the useAngular variable to ‘false’, and the watch variable to ‘false’. There are 3 primary commands for building nFrame:

-	Npm run build
This command builds the project with the configuration variables intact and does not override any configurations. The build command will build the project according to your configuration.

-	Npm run watch
This command overrides the build command and runs the project with watch set to true. This is the ideal choice for active development scenarios.

-	Npm run production.
This command overrides the build command and runs the project with the environment variable set to production. This is the ideal choice for deployment scenarios.



### 2.4) Understanding the nFrame folder structure.
nFrame contains a simple folder structure with an easy to understand folder layout, utilizing several practices for handling SCSS/JS, etc. The folder structure is as follows:

- 	nFrame
The Root folder of the nFrame project, contains the Gulpfile which is used to build the project. This file and folder should be targeted by the Azure build queue. 

- 	nFrame/webApp	
This folder contains the Angular application which follows an a-typical Angular application layout, for more information on this see the Angular documentation.

-	 nFrame/webTS
This folder contains files not compiled by the Angular application. The root file is called main.ts, the Gulp compiler targets this file and all subsequent dependent files.

- 	nFrame/webTS/_source/
This folder contains and should contain the bulk of the working TypeScript files in the project.

- 	nFrame/webTS/_compiler/
This folder is a target folder for the Gulp compiler to dump output files for processing in the transpiling process. This folder can largely be ignored, but should not be deleted.

- 	nFrame/webStyle
This folder is the base of the Styles folder, containing main.scss which acts as an import-base for .scss files. All SCSS files should be imported and referenced in this file as per standard. The SCSS project structure follows the ‘7-1’ pattern, described in the layout below.

- 	nFrame/webStyle /_abstracts
This folder contains abstract logic, such as _functions.scss, and _variables.scss.

- 	nFrame/ webStyle /_base
This folder contains base definitions for things like typography such as _typography.scss.

-	 nFrame/ webStyle /_blocks
This folder contains files pertaining to specific blocks, i.e. _article-listing-block.scss.

-	 nFrame/ webStyle /_components
This folder contains files pertaining to the webApp, or system styles such as _wyswig.scss

-	 nFrame/ webStyle /_libraries
This folder contains files related to 3rd party libraries such as Bootstrap or Fontawesome.

-	 nFrame/ webStyle /_pages
This folder contains files pertaining to specific pages, i.e. _article-listing-page.scss.

-	 nFrame/ webStyle /_themes
This folder contains files pertaining to thematic elements, such as _colors.scss.



### 2.5) nFrame’s place in the .NET folder structure, and miscellaneous information.

nFrame should exist alongside the rest of the project in the project-actual root folder, alongside folders such as Views, Models, ClientResources, etc.
nFrame does NOT need to be included in CSPROJ and should likely ideally not be to prevent the .NET compiler bundling unnecessary files during the deployment process.
nFrame outputs TWO files upon completion of its compiler cycle, these files are bundle.css, and bundle.js and are outputted to Static/css/bundle.css, and Static/js/bundle.js the _Root.cshtml view should be updated or confirmed to reflect those necessities. 
	


### 3.0 Notes

### 3.1) Active development status..

nFrame is still in active development, and it should be treated as such. nFrame’s roadmap involves extending the toolkit to include additional compiler options, however the core build process is currently stable. Any further queues should be directed to ross.mcdermott@madetoengage.com



