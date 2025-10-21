import { DatePicker } from "./picker/DatePicker"

export function DynamicCmp({ cmp, updateCmpInfo }) {
    switch (cmp.type) {
        // case 'StatusPicker':
        //     return <StatusPicker info={cmp.info} onUpdate={(data) => {
        //         updateCmpInfo(cmp, 'selectedStatus', data, `Changed Status to ${data}`)
        //     }} />
        case 'DatePicker':
            return <DatePicker info={cmp.info} onUpdate={(data) => {
                updateCmpInfo(cmp, 'selectedDate', data, `Changed due date to ${data}`)
            }} />
        // case 'MemberPicker':
        //     return <MemberPicker info={cmp.info} onUpdate={(data) => {
        //         updateCmpInfo(cmp, 'selectedMemberIds', data, `Changed members`)
        //     }} />
        default:
            return <p>UNKNOWN {cmp.type}</p>
    }
}
