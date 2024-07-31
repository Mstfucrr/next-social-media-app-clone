import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useDeleteMutation } from '../actions/mutation'
import { PostData } from '../types'
import LoadingButton from '@/components/ui/loadingButton'
import { Button } from '@/components/ui/button'

interface DeletePostDialogProps {
  post: PostData
  open: boolean
  onClose: () => void
}

export default function DeletePostDialog({ post, open, onClose }: DeletePostDialogProps) {
  const { isPending, mutate: deletePost } = useDeleteMutation(post)

  const handleOpenChange = (open: boolean) => {
    if (!open || !isPending) onClose()
  }

  const handleDelete = () => {
    deletePost(post.id, {
      onSuccess: onClose
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post ?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this post? This action is cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <LoadingButton variant='destructive' onClick={handleDelete} isLoading={isPending}>
            Delete
          </LoadingButton>
          <Button variant='outline' onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
