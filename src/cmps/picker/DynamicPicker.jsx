import { useEffect, useRef, useState } from 'react'
import Popover from '@mui/material/Popover'
import { BoardPicker } from './BoardPicker'
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { GroupPicker } from './GroupPicker'
import { CoverPicker } from './CoverPicker'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function DynamicPicker({ task, picker, anchorEl, open, onClose, setStarred, isStarred, prefs, onUpdateBoard, onRemoveBoard, setIsAddingTask, boardId, groupId, onRemoveGroup, onUpdateTask, onAddLabel, onUpdateLabel, onRemoveLabel }) {
    const popoverActions = useRef(null)
    const [isEditTaskPicker, setIsEditTaskPicker] = useState(false)


    useEffect(() => {
        if (picker.type === 'GroupPicker' || picker.type === 'BoardPicker') {
            setIsEditTaskPicker(true)
        }
    }, [picker.type])

    function handleSmallPicker(isSmall) {
        setIsEditTaskPicker(isSmall)
    }

    function updatePopoverHeight() {
        popoverActions.current?.updatePosition()
    }

    const renderPickerContent = () => {
        switch (picker.type) {
            case 'BoardPicker':
                return <BoardPicker
                    setStarred={setStarred}
                    isStarred={isStarred}
                    prefs={prefs}
                    onUpdateBoard={onUpdateBoard}
                    onRemoveBoard={onRemoveBoard}
                    handleSmallPicker={handleSmallPicker}
                    updatePopoverHeight={updatePopoverHeight}
                />
            case 'GroupPicker':
                return <GroupPicker
                    setIsAddingTask={setIsAddingTask}
                    boardId={boardId}
                    groupId={groupId}
                    onRemoveGroup={onRemoveGroup}
                    onClose={onClose}
                    updatePopoverHeight={updatePopoverHeight}
                />
            case 'LabelPicker':
                return <LabelPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onAddLabel={onAddLabel}
                    onUpdateLabel={onUpdateLabel}
                    onRemoveLabel={onRemoveLabel}
                    updatePopoverHeight={updatePopoverHeight}
                />
            case 'DatePicker':
                return <DatePicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                    updatePopoverHeight={updatePopoverHeight}
                />
            case 'MemberPicker':
                return <MemberPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                    updatePopoverHeight={updatePopoverHeight}
                />
            case 'CoverPicker':
                return <CoverPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                    updatePopoverHeight={updatePopoverHeight}
                />
            default:
                return <p>UNKNOWN {picker.type}</p>
        }
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => onClose(false)}
            actions={popoverActions}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: isEditTaskPicker ? "right" : "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: isEditTaskPicker ? "right" : "left",
            }}
            disablePortal
            slotProps={{
                paper: {
                    sx: {
                        top: isEditTaskPicker ? 'unset' : '68px !important',
                        maxHeight: '80vh',
                        minHeight: isEditTaskPicker ? 'unset' : '50vh',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 2px 6px #1E1F2126, 0px 0px 1px #1E1F214F',
                    }
                },
            }}
        >
            <div className="dynamic-picker">
                {/* universal close button */}
                <button
                    className="icon-btn dynamic-btn close-btn"
                    onClick={() => onClose(false)}
                >
                    <CloseIcon width={16} height={16} fill="currentColor" />
                </button>

                {renderPickerContent()}
            </div>
        </Popover>
    )
}
