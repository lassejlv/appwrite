import * as React from 'react'
import Container from '@/components/Container'
import Spinner from '@/components/Spinner'
import { account, ID, storage } from '@/lib/appwrite'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MessageCircleWarning } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/app/')({
  loader: async () => {
    const user = await account.get()
    const { sessions } = await account.listSessions()

    const currentSessionId = (await account.getSession('current')).$id

    return { user, sessions, currentSessionId }
  },
  onError: () => {
    throw redirect({
      to: '/login',
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user, sessions, currentSessionId } = Route.useLoaderData()
  const router = useRouter()

  console.log(ID.unique())

  const sendVerificationEmail = useMutation({
    mutationKey: ['sendVerificationEmail'],
    mutationFn: async () => {
      return await account.createVerification(`${import.meta.env.VITE_APP_URL}/app/verify`)
    },
    onSuccess: () => {
      toast.success('Verification email sent!')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const deleteSession = useMutation({
    mutationKey: ['deleteSession'],
    mutationFn: async (data: { sessionId: string }) => {
      const { sessionId } = data
      return await account.deleteSession(sessionId)
    },
    onSuccess: () => {
      router.invalidate() // will refresh the route loader
      toast.success('Session deleted!')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const uploadFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('file') as File

    const response = await storage.createFile('67b48a2b000b61ceecdb', ID.unique(), file)
    console.log(response)
  }

  return (
    <Container padding>
      {!user.emailVerification && (
        <Alert variant='destructive'>
          <MessageCircleWarning className='h-4 w-4' />
          <AlertTitle>Your account is not verified!</AlertTitle>
          <AlertDescription>
            <Button disabled={sendVerificationEmail.isPending} onClick={() => sendVerificationEmail.mutate()}>
              {sendVerificationEmail.isPending ? <Spinner /> : 'Send verification email'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <h1 className='text-3xl'>Hello, {user.name}!</h1>

      <div className='flex flex-col my-5'>
        <h1 className='text-xl'>Sessions</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Browser and device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>IP</TableHead>
              <TableHead className='text-right'>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.$id}>
                <TableCell className='font-medium'>
                  {session.clientName} on {session.osName}
                </TableCell>
                <TableCell>{session.countryName}</TableCell>
                <TableCell>{session.ip}</TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      if (currentSessionId === session.$id) return toast.warning('You cannot delete your current session')
                      const confirmed = confirm('Are you sure you want to delete this session?')

                      if (confirmed) {
                        deleteSession.mutate({ sessionId: session.$id })
                        return toast.success('Session deleted!')
                      } else {
                        return toast.info('Session not deleted (you cancelled)')
                      }
                    }}
                    disabled={deleteSession.isPending || currentSessionId === session.$id}
                  >
                    {deleteSession.isPending ? <Spinner /> : 'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h1>Upload file</h1>

        <form onSubmit={uploadFileSubmit}>
          <Input type='file' name='file' placeholder='Upload a file' required />
          <Button type='submit'>Upload</Button>
        </form>
      </div>
    </Container>
  )
}
