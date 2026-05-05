import CloseIcon from '../../assets/images/icons/close.svg?react'

export function MemberPicker({ members, task, onUpdateTask }) {
  const taskMembers = members?.filter((member) => task.idMembers?.includes(member._id))
  const boardMembers = members?.filter((member) => !task.idMembers?.includes(member._id))

  function onAddMember(member) {
    onUpdateTask(task.idBoard, task._id, {
      idMembers: [...(task.idMembers || []), member._id],
    })
  }

  function onRemoveMember(member) {
    onUpdateTask(task.idBoard, task._id, {
      idMembers: task.idMembers.filter((id) => id !== member._id),
    })
  }

  function handleMemberClick(member) {
    if (task.idMembers?.includes(member._id)) {
      // Member is currently assigned to the task -> Remove them
      onRemoveMember(member)
    } else {
      // Member is NOT currently assigned to the task -> Add them
      onAddMember(member)
    }
  }

  const MemberPreview = ({ member, isAssigned }) => {
    const memberClassName = isAssigned ? 'member-preview selected' : 'member-preview'

    return (
      <div key={member._id} className={memberClassName} onClick={() => handleMemberClick(member)}>
        <span
          className="member-avatar"
          style={{ backgroundImage: `url(${member.avatarUrl})` }}
          title={member.fullName}
        />
        <span className="member-name">{member.fullName}</span>
        {isAssigned && (
          <span className="remove-btn">
            <CloseIcon width={16} height={16} fill="currentColor" />
          </span>
        )}
      </div>
    )
  }

  return (
    <section className="member-picker">
      <header className="picker-header">
        <h2 className="picker-title">Members</h2>
      </header>

      <div className="member-editor">
        {/* --- Task Members (Assigned) --- */}
        {taskMembers.length > 0 ? (
          <>
            <h3 className="picker-subtitle">Task members</h3>
            {taskMembers.map((member) => (
              <MemberPreview key={member._id} member={member} isAssigned={true} />
            ))}
          </>
        ) : null}

        {/* --- Board Members (Unassigned) --- */}
        {boardMembers.length > 0 ? (
          <>
            <h3 className="picker-subtitle">Board members</h3>
            {boardMembers.map((member) => (
              <MemberPreview key={member._id} member={member} isAssigned={false} />
            ))}
          </>
        ) : null}
      </div>
    </section>
  )
}
