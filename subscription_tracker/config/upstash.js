import { Client as WorkflowClient } from '@upstash/workflow'
import { QSTASH_TOKEN, QSTASH_URL } from './env.js'

// el cliente permite interactuar de forma programatica con la ejecucion de los flujos
export const client = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
})
