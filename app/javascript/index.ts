// Aliased TS module (control) - expected: resolved
import { greet } from "@lib/greet";
// Aliased CSS file (control) - expected: resolved
import "@circle-assets/styles.css";
// Aliased PNG - BUG: reported as unlisted dependency "@circle-assets/images"
import logo from "@circle-assets/images/logo.png";

console.log(greet("fallow"), logo);
