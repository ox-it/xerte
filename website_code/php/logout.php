<?php
/**
 * Licensed to The Apereo Foundation under one or more contributor license
 * agreements. See the NOTICE file distributed with this work for
 * additional information regarding copyright ownership.

 * The Apereo Foundation licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 
 * logout page, user has logged out, wipe sessions
 *
 * @author Patrick Lockley
 * @version 1.0
 * @package
 */

require_once(dirname(__FILE__) . '/../../config.php');

$authmech = Xerte_Authentication_Factory::create($xerte_toolkits_site->authentication_method);

if ($authmech->hasLogout())
{
    _debug("Single Logout");
    $authmech->logout();
}
session_destroy();

//redirect to webauth to logout out of webauth (this is set in /etc/apache2/apache2.conf)
echo '<script>window.location="https://webauth.ox.ac.uk/logout"</script>';
