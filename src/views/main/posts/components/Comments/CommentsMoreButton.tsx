import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { CommentData } from '../../types'
import DeleteCommentDialog from './DeleteCommentDialog'

interface CommentsMoreButtonProps {
  comment: CommentData
  className?: string
}

export default function CommentsMoreButton({ comment, className }: CommentsMoreButtonProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost' className={className}>
            <MoreHorizontal className='size-5 text-muted-foreground' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className='flex items-center gap-3 text-destructive'>
              <Trash2 className='size-4' />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        comment={comment}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  )
}
