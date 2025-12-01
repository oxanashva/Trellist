import { useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { ActionPicker } from './ActionPicker'
import CloseIcon from '../../../assets/images/icons/close.svg?react'

export function DynamicPicker({ task, picker, anchorEl, open, onClose, updateTask, setIsAddingTask, groupId, onRemoveGroup }) {
    const [isSmallPicker, setIsSmallPicker] = useState(false)

    useEffect(() => {
        if (picker.type === 'ActionPicker') {
            setIsSmallPicker(true)
        }
    }, [picker.type])

    const renderPickerContent = () => {
        switch (picker.type) {
            // case 'StatusPicker':
            //     return <StatusPicker info={picker.info} onUpdate={(data) => {
            //         updateCmpInfo(picker, 'selectedStatus', data, `Changed Status to ${data}`)
            //     }} />
            case 'LabelPicker':
                return <LabelPicker
                    task={task}
                    onUpdate={updateTask}
                    onClose={onClose}
                />
            case 'DatePicker':
                return <DatePicker
                    task={task}
                    onUpdate={updateTask}
                />
            // case 'MemberPicker':
            //     return <MemberPicker info={picker.info} onUpdate={(data) => {
            //         updateCmpInfo(picker, 'selectedMemberIds', data, `Changed members`)
            //     }} />
            case 'ActionPicker':
                return <ActionPicker
                    setIsAddingTask={setIsAddingTask}
                    groupId={groupId}
                    onRemoveGroup={onRemoveGroup}
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
                        width: '304px !important',
                        top: isSmallPicker ? '50%' : '68px !important',
                        bottom: isSmallPicker ? '50%' : '10px !important',
                        transform: isSmallPicker ? 'translate(-50%, -50%)' : '',
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
