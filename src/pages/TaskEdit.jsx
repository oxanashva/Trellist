import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat" // Needed for parsing time like "h:mm A"
dayjs.extend(customParseFormat)

import { updateBoard } from "../store/actions/board.actions"
import { makeId } from "../services/util.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

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
import ShevronDown from '../assets/images/icons/shevron-down.svg?react'

import { DynamicPicker } from "../cmps/task/picker/DynamicPicker"

export function TaskEdit() {
    const elDialog = useRef(null)
    const { taskId } = useParams()
    const nameInputRef = useRef(null)
    const descTextareaRef = useRef(null)
    const commentTextareaRef = useRef(null)

    const board = useSelector(storeState => storeState.boardModule.board)
    const task = board?.tasks.find(task => task?._id === taskId)
    const group = board?.groups.find(group => group?._id === task?.idGroup)
    const comments = board?.actions.filter(action => {
        return action.data.idTask === task._id
    })

    const [isChecked, setIsChecked] = useState(task?.closed || false)
    const [isNameEditing, setIsNameEditing] = useState(false)
    const [isDescEditing, setIsDescEditing] = useState(false)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [picker, setPicker] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl);

    // Open popover when button clicked
    const handlePopoverOpen = (event, pickerType) => {
        setAnchorEl(event.currentTarget)
        setPicker(pickerType)
    };

    // Close popover
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const [taskName, setTaskName] = useState(task?.name || "")
    const [taskDescription, setTaskDescription] = useState(task?.desc || "")
    const [commentText, setCommentText] = useState("")

    const PICKER_MAP = {
        // STATUS: {
        //     type: "StatusPicker",
        //     info: {
        //         label: "Status:",
        //         propName: "status",
        //         selectedStatus: task?.status,
        //     }
        // },
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
        // }
    }

    useEffect(() => {
        elDialog.current.showModal()
    }, [])

    useEffect(() => {
        if (isNameEditing) {
            nameInputRef.current?.focus()
        } else if (isDescEditing) {
            descTextareaRef.current?.focus()
        } else if (editingCommentId) {
            commentTextareaRef.current?.focus()
        }
    }, [isNameEditing, isDescEditing, editingCommentId])

    function handleCheck() {
        const newStatus = !isChecked
        setIsChecked(newStatus)

        updateTask(task._id, { closed: newStatus })
    }

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

    function updateTask(taskId, updatedFields) {
        const updatedBoard = {
            ...board,
            tasks: board.tasks.map(task =>
                task._id === taskId
                    ? { ...task, ...updatedFields }
                    : task
            )
        }
        updateBoard(updatedBoard)
    }

    function updateBoardAction(updatedActions) {
        const updatedBoard = {
            ...board,
            actions: updatedActions
        }

        updateBoard(updatedBoard)
    }

    function onUpdateTask(taskId, field, value) {
        updateTask(taskId, { [field]: value })
    }

    function onDescriptionSubmit(ev) {
        ev.preventDefault()
        setIsDescEditing(false)
        onUpdateTask(task._id, "desc", taskDescription)
    }

    function onNameBlur() {
        setIsNameEditing(false)
        onUpdateTask(task._id, "name", taskName)
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

    function onCommentSubmit(ev) {
        ev.preventDefault()
        const trimmedCommentText = commentText.trim()

        if (!trimmedCommentText) {
            setEditingCommentId(null)
            setCommentText("")
            return
        }

        let updatedComments

        if (editingCommentId) {
            const existingComments = board.actions || []
            updatedComments = existingComments.map(action => {
                if (action._id === editingCommentId) {
                    return {
                        ...action,
                        data: { ...action.data, text: trimmedCommentText }
                    }
                }
                return action
            })

        } else {
            const newComment = {
                _id: makeId(),
                data: {
                    idTask: task._id,
                    text: trimmedCommentText
                },
                date: Date.now(),
                type: "commentTask",
                memberCreator: {
                    fullName: "Oxana Shvartzman",
                    avatarUrl: "images/avatars/OS-avatar.png",
                    username: "oxanashvartzman"
                }
            }

            updatedComments = [...(board.actions || []), newComment]
        }

        updateBoardAction(updatedComments)

        setEditingCommentId(null)
        setCommentText("")
    }

    function getDueStatusBadge(dueDateString, dueTimeString = null) {
        let deadline = dayjs(dueDateString)

        if (dueTimeString) {
            const time = dayjs(dueTimeString, "h:mm A")

            deadline = deadline.hour(time.hour()).minute(time.minute()).second(0).millisecond(0)
        }

        const now = dayjs()

        if (deadline.isBefore(now)) {
            return {
                text: "Overdue",
                className: "badge-overdue"
            }
        }

        const hoursDiff = deadline.diff(now, "hour", true)

        if (hoursDiff <= 24) {
            return {
                text: "Due soon",
                className: "badge-due-soon"
            }
        }

        return null
    }

    const badgeInfo = getDueStatusBadge(task.due, task.dueTime)

    return (
        <dialog ref={elDialog} className="task-edit">
            <header className="task-edit-header">
                <span className="group-name">{group?.name}</span>
                <div className="task-header-actions">
                    <button className="icon-btn dynamic-btn">
                        <ImageIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <button className="icon-btn dynamic-btn">
                        <MoreIcon width={16} height={16} fill="currentColor" />
                    </button>
                    <Link to={`/board/${board?._id}`} className="icon-btn dynamic-btn link-btn">
                        <CloseIcon width={24} height={24} fill="currentColor" />
                    </Link>
                </div>
            </header>
            <div className="content-wrapper">
                <main>
                    <section className="task-title task-grid-container">
                        <div className="task-icon" onClick={handleCheck}>
                            {isChecked
                                ? <span style={{ color: "#6A9A23" }} title="Mark incomplete"><CircleCheckIcon width={16} height={16} fill="currentColor" /></span>
                                : <span title="Mark complete"><CircleIcon width={16} height={16} fill="currentColor" /></span>}
                        </div>
                        {/* TODO: implement reusable component for editable field */}
                        {!isNameEditing &&
                            <h2
                                onClick={() => setIsNameEditing(true)}
                            >
                                {taskName}
                            </h2>}
                        {isNameEditing &&
                            <input
                                ref={nameInputRef}
                                type="text"
                                name="name"
                                value={taskName}
                                onChange={handleChange}
                                onBlur={onNameBlur}
                                onKeyDown={onNameKeyDown}
                            />}
                    </section>
                    <div className="task-content">
                        {picker && (
                            <DynamicPicker
                                task={task}
                                picker={picker}
                                open={openPopover}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                updateTask={updateTask}
                            />
                        )}
                        <section className="task-actions task-grid-container">
                            <div></div>
                            <div className="task-actions-btns">
                                <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.ADD)
                                    }}>
                                    <PlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Add</span>
                                </button>
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
                                <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.CHECKLIST)
                                    }}>
                                    <CheckListIcon width={16} height={16} fill="currentColor" />
                                    <span>Checklists</span>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={() => {
                                        handlePopoverOpen(event, PICKER_MAP.MEMBER)
                                    }}>
                                    <MemberPlusIcon width={16} height={16} fill="currentColor" />
                                    <span>Members</span>
                                </button>
                                <button
                                    className="action-btn"
                                    onClick={(event) => {
                                        handlePopoverOpen(event, PICKER_MAP.ATTACHMENT)
                                    }}>
                                    <AttachmentIcon width={16} height={16} fill="currentColor" />
                                    <span>Attachments</span>
                                </button>
                            </div>
                        </section>
                        <div className="task-params">
                            <section className="task-actions task-flex-container">
                                <h3 className="params-heading">Members</h3>
                                <button className="params-btn">
                                    Member
                                </button>
                            </section>
                            <section className="task-actions task-flex-container">
                                <h3 className="params-heading">Labels</h3>
                                <button className="params-btn">
                                    Label
                                </button>
                            </section>

                            {(task?.due || task?.start) &&
                                <section className="task-actions task-flex-container">
                                    <h3 className="params-heading">Dates</h3>
                                    <button
                                        className="params-btn"
                                        onClick={(event) => {
                                            handlePopoverOpen(event, PICKER_MAP.DATE)
                                        }}
                                    >
                                        {dayjs(task.due).format("MMM DD")} {task.dueTime ? `, ${task.dueTime}` : ""}
                                        {badgeInfo && (
                                            <span className={`due-badge ${badgeInfo.className}`}>
                                                {badgeInfo.text}
                                            </span>
                                        )}
                                        <ShevronDown width={16} height={16} fill="currentColor" />
                                    </button>
                                </section>
                            }

                            <section className="task-actions task-flex-container">
                                <h3 className="params-heading">Votes</h3>
                                <button className="params-btn">
                                    <ThumbsUpIcon width={16} height={16} fill="currentColor" />
                                    <span>Vote</span>
                                </button>
                            </section>
                        </div>
                        <section className="task-actions task-grid-container">
                            <div className="task-icon">
                                <DescriptionIcon width={16} height={16} fill="currentColor" />
                            </div>
                            <h3 className="heading">Description</h3>
                            <div></div>
                            {(task?.desc && !isDescEditing) && <p onClick={() => setIsDescEditing(true)}>{task.desc}</p>}
                            {(!task?.desc && !isDescEditing) &&
                                <button
                                    className="add-description-btn"
                                    onClick={() => setIsDescEditing(true)}
                                >
                                    Add a more detailed description
                                </button>}
                            {/* TODO: implement reusable component for editable field */}
                            {isDescEditing && <form onSubmit={onDescriptionSubmit}>
                                <textarea
                                    ref={descTextareaRef}
                                    className="edit-description"
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
                            </form>}
                        </section>
                    </div>
                </main>
                <aside>
                    <section className="task-grid-container">
                        <div className="task-icon">
                            <CommentText width={16} height={16} fill="currentColor" />
                        </div>
                        <h3 className="heading">Comments and activities</h3>
                        {/* TODO: implement reusable component for editable field */}
                        {comments?.map((comment) => {
                            const isThisCommentEditing = comment._id === editingCommentId
                            return (
                                <React.Fragment key={comment._id}>
                                    <div></div>
                                    <div key={comment}>
                                        {
                                            (!isThisCommentEditing) &&
                                            <div
                                                className="add-comment-textarea add-description-btn"
                                                onClick={() => {
                                                    setEditingCommentId(comment._id)
                                                    setCommentText(comment.data.text)
                                                }}
                                            >
                                                <span>{comment.data.text}</span>
                                            </div>
                                        }
                                        {
                                            isThisCommentEditing && <form onSubmit={onCommentSubmit}>
                                                <textarea
                                                    ref={commentTextareaRef}
                                                    className="edit-comment edit-description"
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