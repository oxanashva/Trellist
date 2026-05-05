import Popover from '@mui/material/Popover'

import { CreateBoardPicker } from './CreateBoardPicker'
import { BoardPicker } from './BoardPicker'
import { DatePicker } from './DatePicker'
import { LabelPicker } from './LabelPicker'
import { GroupPicker } from './GroupPicker'
import { CoverPicker } from './CoverPicker'
import { MemberPicker } from './MemberPicker'

import CloseIcon from '../../assets/images/icons/close.svg?react'

const TASK_PICKER_OFFSET = '68px'

const BOARD_PICKERS = ['CreateBoardPicker', 'BoardPicker', 'GroupPicker']
const EDIT_TASK_PICKERS = ['LabelPicker', 'DatePicker', 'MemberPicker', 'CoverPicker']

export function DynamicPicker({
  picker,
  open,
  anchorEl,
  onClose,
  // board porps
  isStarred,
  setStarred,
  prefs,
  uploadedImages,
  onAddBoard,
  onUpdateBoard,
  onRemoveBoard,
  // group props
  boardId,
  groupId,
  setIsAddingTask,
  onRemoveGroup,
  // task props
  task,
  onUpdateTask,
  onAddLabel,
  onUpdateLabel,
  onRemoveLabel,
  members,
}) {
  const isBoardPicker = BOARD_PICKERS.includes(picker.type)
  const isEditTaskPicker = EDIT_TASK_PICKERS.includes(picker.type)

  const pickerMap = {
    CreateBoardPicker: <CreateBoardPicker onAddBoard={onAddBoard} onClose={onClose} />,

    BoardPicker: (
      <BoardPicker
        isStarred={isStarred}
        setStarred={setStarred}
        prefs={prefs}
        uploadedImages={uploadedImages}
        onUpdateBoard={onUpdateBoard}
        onRemoveBoard={onRemoveBoard}
      />
    ),

    GroupPicker: (
      <GroupPicker
        boardId={boardId}
        groupId={groupId}
        setIsAddingTask={setIsAddingTask}
        onRemoveGroup={onRemoveGroup}
        onClose={onClose}
      />
    ),

    LabelPicker: (
      <LabelPicker
        task={task}
        onUpdateTask={onUpdateTask}
        onAddLabel={onAddLabel}
        onUpdateLabel={onUpdateLabel}
        onRemoveLabel={onRemoveLabel}
      />
    ),

    DatePicker: <DatePicker task={task} onUpdateTask={onUpdateTask} onClose={onClose} />,

    MemberPicker: <MemberPicker task={task} members={members} onUpdateTask={onUpdateTask} />,

    CoverPicker: <CoverPicker task={task} onUpdateTask={onUpdateTask} />,
  }

  const content = pickerMap[picker.type] || <p>UNKNOWN {picker.type}</p>

  const handleClose = () => onClose(false)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: isEditTaskPicker ? 'center' : 'top',
        horizontal: isBoardPicker ? 'right' : 'left',
      }}
      transformOrigin={{
        vertical: isEditTaskPicker ? 'center' : 'top',
        horizontal: isBoardPicker ? 'right' : 'left',
      }}
      disablePortal
      slotProps={{
        paper: {
          sx: {
            top: isBoardPicker ? 'unset' : `${TASK_PICKER_OFFSET} !important`,
            maxHeight: '82vh',
            borderRadius: '0.5rem',
            boxShadow: '0px 2px 6px #1E1F2126, 0px 0px 1px #1E1F214F',
          },
        },
      }}
    >
      <div className="dynamic-picker">
        <button className="icon-btn dynamic-btn close-btn" onClick={handleClose}>
          <CloseIcon width={16} height={16} />
        </button>

        {content}
      </div>
    </Popover>
  )
}
