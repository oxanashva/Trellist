import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat" // Needed for parsing time like "h:mm A"
dayjs.extend(customParseFormat)
import { getDueStatusBadge } from "../services/task/task.utils"

import { addAction, removeAction, updateAction, updateTask, addLabel, updateLabel, removeLabel } from "../store/actions/board.actions"
import { coverColorsMap, formatDate, getLabelColor, makeId } from "../services/util.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { useTextareaAutofocusAndResize } from "../customHooks/useTextareaAutofocusAndResize"

import MoreIcon from "../assets/images/icons/more.svg?react"
import ImageIcon from "../assets/images/icons/image.svg?react"
import CloseIcon from "../assets/images/icons/close.svg?react"
import CircleIcon from "../assets/images/icons/circle.svg?react"
import CircleCheckIcon from "../assets/images/icons/circle-check.svg?react"
import PlusIcon from "../assets/images/icons/plus.svg?react"
import LabelIcon from "../assets/images/icons/label.svg?react"
import ClockIcon from "../assets/images/icons/clock.svg?react"
import CheckListIcon from "../assets/images/icons/checklist.svg?react"
import MemberPlusIcon from "../assets/images/icons/member-plus.svg?react"
import AttachmentIcon from "../assets/images/icons/attachment.svg?react"
import ThumbsUpIcon from "../assets/images/icons/thumbs-up.svg?react"
import DescriptionIcon from "../assets/images/icons/description.svg?react"
import CommentText from "../assets/images/icons/comment-text.svg?react"
import ShevronDown from "../assets/images/icons/shevron-down.svg?react"


import { DynamicPicker } from "../cmps/picker/DynamicPicker"

export function TaskEdit() {
    const elDialog = useRef(null)
    const { taskId } = useParams()

    const board = useSelector(storeState => storeState.boardModule.board)
    const task = board?.tasks.find(task => task?._id === taskId)
    const group = board?.groups.find(group => group?._id === task?.idGroup)
    const actions = board?.actions
        .filter(action => action.data.idTask === task?._id)
        .sort((a, b) => {
            // Convert the date strings to numerical timestamps (milliseconds)
            const dateA = new Date(a.date).getTime()
            const dateB = new Date(b.date).getTime()

            // Sort in descending order
            return dateB - dateA;
        })
    const labels = board?.labels

    const [isChecked, setIsChecked] = useState(task?.closed || false)
    const [isNameEditing, setIsNameEditing] = useState(false)
    const [isDescEditing, setIsDescEditing] = useState(false)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [isAddingNewComment, setIsAddingNewComment] = useState(false)
    const [picker, setPicker] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl);
    const [taskName, setTaskName] = useState(task?.name || "")
    const [taskDescription, setTaskDescription] = useState(task?.desc || "")
    const [commentText, setCommentText] = useState("")

    const nameInputRef = useTextareaAutofocusAndResize(taskName, isNameEditing)
    const descTextareaRef = useTextareaAutofocusAndResize(taskDescription, isDescEditing)
    const isCommentTextareaActive = isAddingNewComment || (editingCommentId !== null)
    const commentTextareaRef = useTextareaAutofocusAndResize(commentText, isCommentTextareaActive)

    const handlePopoverOpen = (event, pickerType) => {
        setAnchorEl(event.currentTarget)
        setPicker(pickerType)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const PICKER_MAP = {
        LABEL: {
            type: "LabelPicker",
            info: {
                label: "Labels:",
                propName: "labels",
                selectedDate: task?.labels,
            }
        },
        DATE: {
            type: "DatePicker",
            info: {
                label: "Due date:",
                propName: "dueDate",
                selectedDate: task?.dueDate,
            }
        },
        // MEMBER: {
        //     type: "MemberPicker",
        //     info: {
        //         label: "Members: ",
        //         propName: "memberIds",
        //         selectedMemberIds: task?.memberIds || [],
        //         members: board?.members
        //     }
        // },
        COVER: {
            type: "CoverPicker",
            info: {
                label: "Cover:",
                propName: "cover",
                selectedCover: task?.cover
            }
        }
    }

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value

        if (field === "name") {
            setTaskName(value)
        }

        if (field === "desc") {
            setTaskDescription(value)
        }

        if (field === "comment") {
            setCommentText(value)
        }
    }

    async function onUpdateTask(boardId, fieldsToUpdate) {
        try {
            await updateTask(boardId, task, fieldsToUpdate)
            showSuccessMsg('Task updated')
        } catch (err) {
            showErrorMsg('Cannot update task')
        }
    }

    function completeTask() {
        const newStatus = !task.closed
        setIsChecked(prev => !prev)

        onUpdateTask(task.idBoard, { closed: newStatus })
    }

    function onNameBlur() {
        setIsNameEditing(false)
        onUpdateTask(task.idBoard, { name: taskName })
    }

    function onNameKeyDown(ev) {
        if (ev.key === "Enter") {
            ev.preventDefault()
            ev.target.blur()
        }
        if (ev.key === "Escape") {
            setTaskName(task.name)
            setIsNameEditing(false)
        }
    }

    function onDescriptionSubmit(ev) {
        ev.preventDefault()
        setIsDescEditing(false)
        onUpdateTask(task.idBoard, { desc: taskDescription })
    }

    async function onAddAction(action) {
        try {
            await addAction(board._id, action)
            showSuccessMsg('Action added')
        } catch (err) {
            showErrorMsg('Cannot add action')
        }
    }

    async function onUpdateAction(action) {
        try {
            await updateAction(board._id, action)
            showSuccessMsg('Action updated')
        } catch (err) {
            showErrorMsg('Cannot update action')
        }
    }

    function onActionSubmit(ev, actionId) {
        ev.preventDefault()
        const trimmedCommentText = commentText.trim()

        if (!trimmedCommentText) {
            setEditingCommentId(null)
            setCommentText("")
            return
        }

        let actionToSave

        if (editingCommentId) {
            const existingAction = actions.find(a => a._id === actionId)
            actionToSave = {
                ...existingAction,
                data: {
                    ...existingAction.data,
                    text: trimmedCommentText
                }
            }
            onUpdateAction(actionToSave)
        } else {
            actionToSave = {
                _id: makeId(),
                data: {
                    idTask: task._id,
                    text: trimmedCommentText
                },
                date: Date.now(),
                type: "commentTask",
                memberCreator: {
                    fullName: "Anna Coss",
                    avatarUrl: "",
                    username: "annacoss",
                    initials: "AC"
                } // TODO: do not hardcode
            }
            onAddAction(actionToSave)
        }


        setEditingCommentId(null)
        setCommentText("")
    }

    async function onRemoveAction(actionId) {
        try {
            await removeAction(board._id, actionId)
            showSuccessMsg('Action removed')
        } catch (err) {
            showErrorMsg('Cannot remove action')
        }
    }

    async function onAddLabel(label) {
        try {
            await addLabel(board._id, label)
            showSuccessMsg('Label added')
        } catch (err) {
            showErrorMsg('Cannot add label')
        }
    }

    async function onUpdateLabel(label) {
        try {
            await updateLabel(board._id, label)
            showSuccessMsg('Label updated')
        } catch (err) {
            showErrorMsg('Cannot update label')
        }
    }

    async function onRemoveLabel(labelId) {
        try {
            await removeLabel(board._id, labelId)
            showSuccessMsg('Label removed')
        } catch (err) {
            showErrorMsg('Cannot remove label')
        }
    }

    const badgeInfo = getDueStatusBadge(task?.due, task?.dueTime, task?.closed)

    const headerStyle = task?.cover?.coverColor
        ? {
            backgroundColor: coverColorsMap[task?.cover?.coverColor],
            minHeight: '116px',
            height: '116px',
            maxHeight: '160px'
        }

        : task?.idAttachmentCover
            ? {
                backgroundImage: `url(${task?.cover?.url})`, backgroundColor: task?.cover?.edgeColor,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '116px',
                height: '116px',
                maxHeight: '160px'
            }
            : {}

    return (
        <dialog ref={elDialog} className="task-edit">
            <header style={headerStyle} className="task-edit-header">
                <span className="group-name">{group?.name}</span>
                <div className="task-header-actions">
                    <button
                        className="icon-btn dynamic-btn task-header-btn"
                        onClick={(event) => {
                            handlePopoverOpen(event, PICKER_MAP.COVER)
                        }}
                    >
                        <ImageIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="icon-btn dynamic-btn task-header-btn">
                        <MoreIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <Link to={`/board/${board?._id}`} className="icon-btn dynamic-btn link-btn task-header-btn">
                        <CloseIcon width={20} height={20} fill="currentColor" />
                    </Link>
                </div>
            </header>
            <div className="content-wrapper">
                <main>
                    <section className="task-title task-grid-container">
                        <div className="task-icon-check" onClick={completeTask}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        {/* TODO: implement reusable component for editable field */}
                        <div className="editable-title-container">
                            <h2
                                style={{ visibility: isNameEditing ? 'hidden' : 'visible' }}
                                className="editable-title title-display"
                                onClick={() => setIsNameEditing(true)}
                            >
                                {taskName}
                            </h2>

                            {isNameEditing && (
                                <textarea
                                    ref={nameInputRef}
                                    className="editable-title title-edit"
                                    type="text"
                                    name="name"
                                    value={taskName}
                                    onChange={handleChange}
                                    onBlur={onNameBlur}
                                    onKeyDown={onNameKeyDown}
                                />
                            )}
                        </div>
                    </section>
                    <div className="task-content">
                        {picker && (
                            <DynamicPicker
                                task={task}
                                picker={picker}
                                open={openPopover}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                onUpdateTask={onUpdateTask}
                                onAddLabel={onAddLabel}
                                onUpdateLabel={onUpdateLabel}
                                onRemoveLabel={onRemoveLabel}
                            />
                        )}
                        <section className="task-grid-container">
                            <div></div>
                            <div className="task-actions-btns">
                                {/* TODO: implement adding new action */}
                                {/* <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.ADD)
                                    }}>
                                    <PlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Add</span>
                                </button> */}
                                <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.LABEL)
                                    }}>
                                    <LabelIcon width={16} height={16} fill="currentColor" />
                                    <span>Labels</span>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.DATE)
                                    }}>
                                    <ClockIcon width={16} height={16} fill="currentColor" />
                                    <span>Dates</span>
                                </button>
                                {/* TODO: implement adding checklists */}
                                {/* <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.CHECKLIST)
                                    }}>
                                    <CheckListIcon width={16} height={16} fill="currentColor" />
                                    <span>Checklists</span>
                                </button> */}
                                <button
                                    className="action-btn"
                                    onClick={() => {
                                        handlePopoverOpen(event, PICKER_MAP.MEMBER)
                                    }}>
                                    <MemberPlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Members</span>
                                </button>
                                {/* TODO: implement adding attachments */}
                                {/* <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.ATTACHMENT)
                                    }}>
                                    <AttachmentIcon width={16} height={16} fill="currentColor" />
                                    <span>Attachments</span>
                                </button> */}
                            </div>
                        </section>

                        {(task?.idLabels?.length > 0 || task?.due || task?.start) &&
                            <div className="task-params">
                                {/* TODO: implement displaying members */}
                                {/* <section className="task-flex-container">
                                <h3 className="params-heading">Members</h3>
                                <button className="btn-neutral">
                                    Member
                                </button>
                            </section> */}
                                {task?.idLabels?.length > 0 &&
                                    <section className="task-flex-container">
                                        <h3 className="params-heading">Labels</h3>
                                        <div className="labels-container">
                                            {task?.idLabels?.map((labelId) => {
                                                const label = labels.find((l) => l._id === labelId)
                                                return (
                                                    <button
                                                        key={labelId}
                                                        style={{ backgroundColor: getLabelColor(label?.color) }}
                                                        onClick={(event) => {
                                                            handlePopoverOpen(event, PICKER_MAP.LABEL, labelId)
                                                        }}
                                                        className="btn-neutral"
                                                    >
                                                        {labels.find((label) => label._id === labelId)?.name}
                                                    </button>
                                                )
                                            })}
                                            <button
                                                className="btn-neutral label-add-btn"
                                                onClick={(event) => {
                                                    handlePopoverOpen(event, PICKER_MAP.LABEL)
                                                }}>
                                                <PlusIcon width={16} height={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </section>
                                }

                                {(task?.due || task?.start) &&
                                    <section className="task-flex-container">
                                        <h3 className="params-heading">
                                            {(task?.start && task?.due)
                                                ? "Dates"
                                                : task?.due
                                                    ? "Due date"
                                                    : "Start date"
                                            }
                                        </h3>
                                        <button
                                            className="btn-neutral"
                                            onClick={(event) => {
                                                handlePopoverOpen(event, PICKER_MAP.DATE)
                                            }}
                                        >
                                            {task.start ? dayjs(task.start).format("MMM DD") : ""}
                                            {task.start && task.due && " - "}
                                            {task.due ? dayjs(task.due).format("MMM DD") : ""} {task.dueTime ? `, ${task.dueTime}` : ""}
                                            {badgeInfo && (
                                                <span className={`due-badge ${badgeInfo.className}`}>
                                                    {badgeInfo.text}
                                                </span>
                                            )}
                                            <ShevronDown width={16} height={16} fill="currentColor" />
                                        </button>
                                    </section>
                                }

                                {/* TODO: implement adding votes */}
                                {/* <section className="task-flex-container">
                                <h3 className="params-heading">Votes</h3>
                                <button className="btn-neutral">
                                    <ThumbsUpIcon width={16} height={16} fill="currentColor" />
                                    <span>Vote</span>
                                </button>
                            </section> */}
                            </div>}

                        <section className="task-grid-container task-description-container">
                            <div className="task-icon">
                                <DescriptionIcon width={16} height={16} fill="currentColor" />
                            </div>
                            <h3 className="heading">Description</h3>
                            <div></div>

                            {(task?.desc && !isDescEditing) &&
                                <p className="description" onClick={() => setIsDescEditing(true)}>
                                    {task.desc}
                                </p>
                            }

                            {(!task?.desc && !isDescEditing) &&
                                <button
                                    className="editable"
                                    onClick={() => setIsDescEditing(true)}
                                >
                                    Add a more detailed description
                                </button>
                            }

                            {/* TODO: implement reusable component for editable field */}
                            {isDescEditing &&
                                <form onSubmit={onDescriptionSubmit}>
                                    <textarea
                                        ref={descTextareaRef}
                                        className="edit-textarea"
                                        name="desc"
                                        value={taskDescription}
                                        onChange={handleChange}
                                        placeholder="Add a more detailed description">
                                    </textarea>
                                    <div className="edit-description-actions">
                                        <button
                                            className="btn-primary"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="dynamic-btn"
                                            type="button"
                                            onClick={() => {
                                                setTaskDescription(task.desc || "")
                                                setIsDescEditing(false)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            }
                        </section>
                    </div>
                </main>

                {/* TODO: move actions to separate component */}
                <aside>
                    <section className="task-grid-container">
                        <div className="task-icon">
                            <CommentText width={16} height={16} fill="currentColor" />
                        </div>
                        <h3 className="heading">Comments and activities</h3>

                        {(!isAddingNewComment && !editingCommentId) && (
                            <button
                                className="comment editable add-comment"
                                onClick={() => {
                                    setEditingCommentId(null)
                                    setCommentText("")
                                    setIsAddingNewComment(true)
                                }}
                            >
                                Write a comment...
                            </button>
                        )}

                        {(isAddingNewComment && !editingCommentId) && (
                            <form
                                className="edit-comment-form" onSubmit={(ev) => {
                                    onActionSubmit(ev, null)
                                    setIsAddingNewComment(false)
                                }}>
                                <textarea
                                    ref={commentTextareaRef}
                                    className="edit-textarea"
                                    name="comment"
                                    value={commentText}
                                    onChange={handleChange}
                                    placeholder="Write a comment..."
                                ></textarea>
                                <div className="edit-comment-actions edit-description-actions">
                                    <button className="btn-primary" type="submit">Save</button>
                                    <button
                                        className="dynamic-btn"
                                        type="button"
                                        onClick={() => {
                                            setCommentText("")
                                            setIsAddingNewComment(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* TODO: implement reusable component for editable field */}
                        {actions?.map((comment) => {
                            const isThisCommentEditing = comment._id === editingCommentId
                            return (
                                <React.Fragment key={comment._id}>
                                    {/* TODO: Implement conditional rendering of avatar-image or avatar-fallback */}
                                    {/* <div>
                                        <img src={comment.memberCreator.avatarUrl} alt={`${comment.memberCreator.fullname} avatar`} />
                                    </div> */}
                                    <div className="fallback-avatar">
                                        <span>{comment.memberCreator.initials}</span>
                                    </div>

                                    <div className="comment-info">
                                        <span className="comment-author">{comment.memberCreator.fullName}</span>
                                        <span className="comment-date">{formatDate(comment.date)}</span>
                                    </div>

                                    <div></div>

                                    <div key={comment}>
                                        {
                                            (!isThisCommentEditing) &&
                                            <div>
                                                <div
                                                    className="comment editable"
                                                    onClick={() => {
                                                        setEditingCommentId(comment._id)
                                                        setCommentText(comment.data.text)
                                                        setIsAddingNewComment(false)
                                                    }}
                                                >
                                                    <span>{comment.data.text}</span>
                                                </div>

                                                <button
                                                    className="comment-btn"
                                                    onClick={() => {
                                                        setEditingCommentId(comment._id)
                                                        setCommentText(comment.data.text)
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <span>•</span>
                                                <button className="comment-btn" onClick={() => onRemoveAction(comment._id)}>Delete</button>
                                            </div>
                                        }
                                        {
                                            isThisCommentEditing && <form onSubmit={(ev) => onActionSubmit(ev, comment._id)}>
                                                <textarea
                                                    ref={commentTextareaRef}
                                                    className="edit-textarea"
                                                    name="comment"
                                                    value={commentText}
                                                    onChange={handleChange}
                                                    placeholder="Write a comment...">
                                                </textarea>
                                                <div className="edit-comment-actions edit-description-actions">
                                                    <button
                                                        className="btn-primary"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="dynamic-btn"
                                                        type="button"
                                                        onClick={() => {
                                                            setCommentText("")
                                                            setEditingCommentId(null)
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        }
                                    </div>
                                </React.Fragment>
                            )
                        })

                        }
                    </section>
                </aside>
            </div>
        </dialog>
    )
}