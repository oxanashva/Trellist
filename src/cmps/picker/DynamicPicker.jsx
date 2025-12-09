import { useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { BoardPicker } from './BoardPicker'
import { DatePicker } from "../picker/DatePicker"
import { LabelPicker } from "../picker/LabelPicker"
import { ActionPicker } from '../picker/ActionPicker'
import { CoverPicker } from './CoverPicker'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function DynamicPicker({ task, picker, anchorEl, open, onClose, setStarred, isStarred, prefs, onUpdateBoard, setIsAddingTask, boardId, groupId, onRemoveGroup, onUpdateTask, onAddLabel, onUpdateLabel, onRemoveLabel }) {
    const [isSmallPicker, setIsSmallPicker] = useState(false)

    useEffect(() => {
        if (picker.type === 'ActionPicker' || picker.type === 'BoardPicker') {
            setIsSmallPicker(true)
        }
    }, [picker.type])

    function handleSmallPicker(isSmall) {
        setIsSmallPicker(isSmall)
    }

    const renderPickerContent = () => {
        switch (picker.type) {
            case 'BoardPicker':
                return <BoardPicker
                    setStarred={setStarred}
                    isStarred={isStarred}
                    prefs={prefs}
                    onUpdateBoard={onUpdateBoard}
                    handleSmallPicker={handleSmallPicker}
                />
            case 'LabelPicker':
                return <LabelPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onAddLabel={onAddLabel}
                    onUpdateLabel={onUpdateLabel}
                    onRemoveLabel={onRemoveLabel}
                />
            case 'DatePicker':
                return <DatePicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                />
            // case 'MemberPicker':
            //     return <MemberPicker info={picker.info} onUpdate={(data) => {
            //         updateCmpInfo(picker, 'selectedMemberIds', data, `Changed members`)
            //     }} />
            case 'ActionPicker':
                return <ActionPicker
                    setIsAddingTask={setIsAddingTask}
                    boardId={boardId}
                    groupId={groupId}
                    onRemoveGroup={onRemoveGroup}
                    onClose={onClose}
                />
            case 'CoverPicker':
                return <CoverPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
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
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            disablePortal
            slotProps={{
                paper: {
                    sx: {
                        top: isSmallPicker ? '50%' : '68px !important',
                        bottom: isSmallPicker ? 'unset' : '10px !important',
                        maxHeight: 'calc(100vh - 68px - 10px) !important',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 2px 6px #1E1F2126, 0px 0px 1px #1E1F214F',
                    },
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
