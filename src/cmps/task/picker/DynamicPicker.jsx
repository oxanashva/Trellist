import Popover from '@mui/material/Popover'
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import CloseIcon from '../../../assets/images/icons/close.svg?react'

export function DynamicPicker({ picker, updateCmpInfo, activePicker, open, anchorEl, onClose }) {
    const renderPickerContent = () => {
        switch (picker.type) {
            // case 'StatusPicker':
            //     return <StatusPicker info={picker.info} onUpdate={(data) => {
            //         updateCmpInfo(picker, 'selectedStatus', data, `Changed Status to ${data}`)
            //     }} />
            case 'LabelPicker':
                return <LabelPicker
                    type={picker.type}
                    info={picker.info}
                    onUpdate={(data) => {
                        updateCmpInfo(picker, 'selectedColor', data, `Changed color to ${data}`)
                    }}
                    activePicker={activePicker}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={onClose}
                />
            case 'DatePicker':
                return <DatePicker
                    type={picker.type}
                    info={picker.info}
                    onUpdate={(data) => {
                        updateCmpInfo(picker, 'selectedDate', data, `Changed due date to ${data}`)
                    }}
                    activePicker={activePicker}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={onClose}
                />
            // case 'MemberPicker':
            //     return <MemberPicker info={picker.info} onUpdate={(data) => {
            //         updateCmpInfo(picker, 'selectedMemberIds', data, `Changed members`)
            //     }} />
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
                        top: '68px !important',
                        bottom: "10px !important",
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
