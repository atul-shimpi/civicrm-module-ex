This extension is an example of implementing a screen with CiviCRM+Angular. To view it:

 1. Install the extension
 2. Navigate to "http://mysite.com/civicrm/a/#/members"

There are a few key files involved:

 - [js/members.js](js/members.js) - An AngularJS module. This defines a route and a controller.
 - [partials/members.html](partials/members.html) - A view for the controller
 - [members.php](members.php) - Registers the module using *angularex_civicrm_angularModules()*.
