
/**
 * replace app default script
 */

import { waitUntilLoad, loadScript } from './app/common'
import { checkPermission } from './app/check-permission'
import { handleEvent } from './app/event-handler'

async function run () {
  await waitUntilLoad()
  checkPermission()
  loadScript('app.js')
  handleEvent()
}

run()
