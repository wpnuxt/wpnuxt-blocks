#!/bin/sh
echo "-------------------- executing wpInstall script --------------------";

if [ $(wp-env run cli wp option list --search=wpnuxt_installed --format=count) == 1 ]; then
  echo "WPNuxt is already installed.";
else
  wp-env run cli wp option add graphql_general_settings {} --format=json;
  wp-env run cli wp option patch insert graphql_general_settings public_introspection_enabled on;
  wp-env run cli wp option patch insert graphql_general_settings show_graphiql_link_in_admin_bar off;

  wp-env run cli wp option patch insert faustwp_settings frontend_uri "http://localhost:3000";
  wp-env run cli wp option patch insert faustwp_settings disable_theme 1;
  wp-env run cli wp option patch insert faustwp_settings enable_redirects 1;
  wp-env run cli wp option patch insert faustwp_settings enable_rewrites 1;
  wp-env run cli wp option patch insert faustwp_settings enable_telemetry 1;
  wp-env run cli wp option patch insert faustwp_settings enable_image_source 1;
  wp-env run cli wp option patch insert faustwp_settings secret_key 64489e3c-1166-498a-9a6e-51cbb4c14ab2;

  wp-env run cli wp post delete $(wp-env run cli wp post list --post_type=post --field="ID" --name="hello-world") --force;
  wp-env run cli wp post create ./demo-content/CoreButton.txt --post_type=post --post_title="CoreButton" --post_status=publish
  wp-env run cli wp post create ./demo-content/CoreHeading.txt --post_type=post --post_title="CoreHeading" --post_status=publish
  wp-env run cli wp post create ./demo-content/CoreParagraph.txt --post_type=post --post_title="CoreParagraph" --post_status=publish
  wp-env run cli wp post create ./demo-content/CoreSpacer.txt --post_type=post --post_title="CoreSpacer" --post_status=publish
  wp-env run cli wp rewrite flush;

  wp-env run cli wp option add wpnuxt_installed 1;

  echo "----------------- WPNuxt installed successfully: --------------------";
fi
