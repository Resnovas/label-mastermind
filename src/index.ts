/**
 * Runs the Action
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */

import * as core from '@actions/core'
import * as github from '@actions/github'
import { Options } from './types'
import path from 'path'
import superLabeler from './superLabeler'
import { Log } from '@videndum/utilities'
let local: any
try {
  local = require('./LocalRunConfig')
} catch {}

const { GITHUB_WORKSPACE = '' } = process.env
const dryRun = !!local.GH_ACTION_LOCAL_TEST
const showLogs = local.SHOW_LOGS === true
const L = new Log({ console: { enabled: showLogs } })
export function log(loggingData: string, type: number) {
  L.log({ raw: loggingData }, type)
  if (type == 1) core.debug(loggingData)
  else if (type < 4) core.info(loggingData)
  else if (type < 7) core.error(loggingData)
  else core.setFailed(loggingData)
}
function start() {
  const configFile = core.getInput('config')
  log(`Config file ${configFile}`, 1)
  const configPath = path.join(GITHUB_WORKSPACE, configFile)
  log(`Config Path ${configPath}`, 1)
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN') || local.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    return core.setFailed('No Token provided')
  }
  log('Github Token Collected ' + GITHUB_TOKEN, 1)
  const options: Options = {
    configPath,
    showLogs,
    dryRun
  }
  const action = new superLabeler(new github.GitHub(GITHUB_TOKEN), options)
  action.run()
}
start()
