import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import LoadingButton from '@/components/ui/loadingButton'
import useCommentOperations from '@/views/main/hooks/useCommentOperations'
import { CommentData } from '../../types'

interface DeleteCommentDialogProps {
  comment: CommentData
  open: boolean
  onClose: () => void
}

export default function DeleteCommentDialog({ comment, open, onClose }: DeleteCommentDialogProps) {
  const { deleteCommentMutation } = useCommentOperations(comment.postId)

  const { isPending, mutate: deleteComment } = deleteCommentMutation

  const handleOpenChange = (open: boolean) => {
    if (!open || !isPending) onClose()
  }

  const handleDelete = () => {
    deleteComment(comment.id, {
      onSuccess: onClose
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this comment? This action is cannot be undone.
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
