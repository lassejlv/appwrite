import { Client, Storage, Account } from 'appwrite'

export const client = new Client()

client.setEndpoint(import.meta.env.VITE_APP_WRITE_API_URL).setProject(import.meta.env.VITE_APP_WRITE_PROJECT_ID)

export const account = new Account(client)
export const storage = new Storage(client)
export { ID } from 'appwrite'
