/**
 * Site-wide feature switches. Plain hard-coded booleans — flip and redeploy.
 */

/**
 * Whether the hosted satellite-visualizer demo is up.
 *
 * The Fly.io deployment was taken down to stop paying for it, so every
 * link to it is hidden and visitors reach the work through the GitHub
 * repository and the scenario walkthrough videos instead.
 *
 * Set this back to `true` if the demo is ever redeployed: all three
 * demo buttons reappear and the surrounding buttons return to their
 * previous emphasis. Nothing else needs changing.
 */
export const LIVE_DEMO_AVAILABLE = false;

export const LIVE_DEMO_URL = 'https://satellite-visualizer-demo.fly.dev';

/**
 * With the demo gone, whichever button is now first in a group takes over
 * the primary styling so each group keeps one clear call to action.
 */
export const demoFallbackBtn = LIVE_DEMO_AVAILABLE
  ? 'btn btn-outline'
  : 'btn btn-primary';
