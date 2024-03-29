React Excercise
-UPDATE (26.07.2023)
a) Modified LightBoxHandlerComponent - removed "document" reference and used React's useRef to make component usable multiple times/in different scenarios - different approach in script.
b) Improved gallery - buttons behavior fix, scroll method change
c) Improved Loader behavior - now it waits until images from gallery are fully loaded as well
d) Description text aligning :)
e) Commented-out net price
- UPDATE (18.07.2023)
a) Added i18n translations for basic and static HTML texts; supported English and Polish; modified Heading/Navbar labels
b) Gallery fix - implemented calculation for active image placement in thumbnail slider - now it's always in the center
- UPDATE (17.07.2023)
a) Implemented Loader spinner for Product page - purpose is to wait until page data is loaded
b) Improved on page gallery in Product page - scrolling is improved, enabled scrolling by thumbnails, added buttons disabled-enabled functionality,
current image is highlighted and scrolled
- UPDATE (20.06.2023)
a) Move gallery array from LightBoxHandlerComponent.jsx to Product.jsx - pass gallery array as a prop to LightBoxHandlerComponent - more universal
b) Added checking for image loading in LightBoxHandlerComponent - content appears when the main image is loaded
c) Remove empty div from Product.jsx
- UPDATE (13.06.2023)
a) Created Home component (migration from App, including .scss)
b) Created Product page with products details (new JSON included in .env)
c) Implemented LightBox component for usage with galleries; no external libraries used
d) Implemented BrowserRouter/Router for navigation, i.e. to product site
e) General appereance changes in the app, new font used globally - Poppins (Google Font)
- UPDATE (11.05.2023): 
a) Move Bootstrap's 'Card' from App.jsx to a separate component
b) Implement App.scss instead of .css, use Mobile First method
c) Create Environment Variables (.env) files (also for development environment - .env.dev); added "start:dev" for env dev mode in package.json (to use development/test mode => "npm run start:dev")
d) Change Bootstrap's "Container" to "Container Fluid" in heading/navbar section
e) General code cleaning and removing unused files and code lines
- Initial release - navbar and container with cards - contents from JSON